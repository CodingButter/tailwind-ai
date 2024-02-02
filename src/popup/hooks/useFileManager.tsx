import React, {
  useState,
  ChangeEvent,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import useStoredFileArray from "./useStoreFileArray";
import { getScreenShot, throttle } from "../../utils";
import { MyFile } from "../../types";

interface FileManagerContextProps {
  files: MyFile[];
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileDelete: (fileName: string) => void;
  handleAddFile: (file: MyFile, override: boolean, index?: number) => void;
  setFiles: (files: MyFile[]) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const FileManagerContext = createContext<FileManagerContextProps>({
  files: [],
  setFiles: (files: MyFile[]) => {},
  handleFileChange: (event: ChangeEvent) => {},
  handleFileDelete: (fileName: string) => {},
  handleAddFile: (file: MyFile, override: boolean, index?: number) => {},
  inputRef: { current: null },
});

export const useFileManager = () => useContext(FileManagerContext);

export const FileManagerProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [files, setFiles, handleDelete] = useStoredFileArray("files");
  const [screenshot, setScreenshot] = useState<MyFile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (files) {
        const newFiles: MyFile[] = [];
        for (const file of Array.from(event.target.files)) {
          const myFile = await MyFile.fromFile(file);
          if (myFile) {
            newFiles.push(myFile);
          }
        }
        setFiles(newFiles);
      }
    }
  };

  const handleAddFile = async (
    file: MyFile,
    override: boolean = false,
    index?: number
  ): Promise<void> => {
    if (files && files.some(async ({ name }) => name === file.name)) {
      if (override) {
        index = files.findIndex(({ name }) => name === file.name);
        files.splice(index, 1, file);
      } else {
        return;
      }
    } else if (index) {
      files.splice(index, 1, file as MyFile);
    } else {
      files.push(file);
    }
    await setFiles([...files]);
  };

  const handleFileDelete = (fileName: string): void => {
    handleDelete(fileName);
  };

  useEffect(() => {
    getScreenShot("screenshot").then(setScreenshot);
  }, []);

  return (
    <FileManagerContext.Provider
      value={{
        files: [screenshot, ...files] as MyFile[],
        setFiles,
        handleFileChange,
        handleFileDelete,
        handleAddFile,
        inputRef,
      }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};
