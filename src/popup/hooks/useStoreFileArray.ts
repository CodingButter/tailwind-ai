import { useState, useEffect } from 'react';
import { MyFile, FileJSON } from "../../types"

function useStoredFileArray(key: string): [MyFile[], (files: MyFile[]) => Promise<void>, (file: string) => Promise<void>] {
    const [files, setFiles] = useState<MyFile[]>([]);
    const [storedFiles, setStoredFiles] = useState<string[]>([]);
    // Load files from chrome.storage.local

    useEffect(() => {
        chrome.storage.sync.get([key]).then((storedFiles: string[] = []) => {
            storedFiles = storedFiles[key] || storedFiles;

            storedFiles.length > 0 &&
                chrome.storage.local.get([...storedFiles]).then(async (_files: FileJSON[]) => {

                    const newFiles = await Promise.all(Object.keys(_files).map(async (_key) => {
                        const obj = _files[_key];
                        const newFile = await MyFile.fromJSON(obj);
                        newFile.stored = true;
                        return newFile;
                    }))
                    console.log(newFiles)
                    setFiles(newFiles)
                }).catch((e) => console.error({ from: "files", error: e }))
        }).catch((e) => console.log({ from: "file names", error: e }))
    }, [key])

    useEffect(() => {
        setStoredFiles(files.map((file) => file.name))
    }, [files])

    // Update chrome.storage.local when files change
    const storeFiles = async (newFiles: MyFile[]) => {
        console.log({ newFiles })
        setFiles(newFiles.map((file) => { file.stored = false; return file }))
        newFiles = newFiles.filter((file) => file && !file.ignore);
        await chrome.storage.sync.set({ [key]: newFiles.map((files) => files.name) })
        for (const file of newFiles) {
            const jsonFile = await file.toJSON();
            await chrome.storage.local.set({ [file.name]: jsonFile })
            file.stored = true;
            setFiles([...files, file])
        }
    };

    const handleRemove = async (fileName: string) => {
        if (fileName) {
            await chrome.storage.local.remove([fileName]);
            const remainingFiles = files.filter((file) => file && file?.name !== fileName) as MyFile[];
            await chrome.storage.sync.set({ [key]: remainingFiles.map((file) => file.name) });
            setFiles(remainingFiles);
        }
    }

    return [files, storeFiles, handleRemove];
}

export default useStoredFileArray;