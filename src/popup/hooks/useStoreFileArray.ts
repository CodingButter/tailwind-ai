import { useState, useEffect } from 'react';

function useStoredFileArray(key: string): [File[], (files: File[]) => Promise<void>, (file: string) => Promise<void>, string[]] {
    const [files, setFiles] = useState<File[]>([]);
    const [stored, setStored] = useState<string[]>([]);
    // Load files from chrome.storage.local
    useEffect(() => {
        chrome.storage.local.get([key], async (result) => {
            if (result[key]) {
                const storedFileNames = result[key];
                setStored(storedFileNames);
                const loadedFiles = await Promise.all(
                    storedFileNames.map(async (fileName) => {

                        const file = await new Promise<string>((resolve) => {
                            chrome.storage.local.get([fileName], async (data) => {
                                if (!data[fileName]) return resolve(null)
                                //@ts-expect-error we added this method to the File class
                                const file = await File.fromJSON(data[fileName])
                                resolve(file);
                            });
                        });
                        await new Promise((resolve) => setTimeout(resolve, 500));

                        return file;
                    })
                );
                setFiles(loadedFiles);


            }
        });
    }, [key]);

    // Update chrome.storage.local when files change
    const storeFiles = async (newFiles: File[]) => {
        setFiles(newFiles);
        newFiles = newFiles.filter((file) => {
            if (file.name == "screenshot.png") {
                setStored((stored) => [...stored, file.name]);
                return false;
            } else {
                return true;
            }
        });

        for (const file of newFiles) {

            //@ts-expect-error we added this method to the File class
            const fileString = await file.toJSON();
            chrome.storage.local.set({ [file.name]: fileString });
            setStored((stored) => [...stored, file.name]);
            await new Promise((resolve) => setTimeout(resolve, 500));

        }
        chrome.storage.local.set({ [key]: newFiles.map((file) => file.name) });

    };

    const handleRemove = async (fileName: string) => {
        chrome.storage.local.remove([fileName]);
        setStored((stored) => stored.filter((name) => name !== fileName));
        await new Promise((resolve) => setTimeout(resolve, 500));
        setFiles((files) => files.filter((file) => file.name !== fileName));
    }

    return [files, storeFiles, handleRemove, stored];
}

export default useStoredFileArray;