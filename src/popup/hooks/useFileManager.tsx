import React, {
  useState,
  ChangeEvent,
  createContext,
  useContext,
  useRef,
  useEffect,
} from "react";
import useStoredFileArray from "./useStoreFileArray";
import { getScreenShot } from "../../utils";

type FileArray = File[];

interface FileManagerContextProps {
  files: FileArray;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileDelete: (fileName: string) => void;
  handleAddFile: (file: File, override: boolean, index?: number) => void;
  stored: string[];
  setFiles: (files: FileArray) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const FileManagerContext = createContext<FileManagerContextProps>({
  files: [],
  stored: [],
  setFiles: (files: FileArray) => {},
  handleFileChange: (event: ChangeEvent) => {},
  handleFileDelete: (fileName: string) => {},
  handleAddFile: (file: File, override: boolean, index?: number) => {},
  inputRef: { current: null },
});

export const useFileManager = () => useContext(FileManagerContext);

export const FileManagerProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [files, setFiles, handleDelete, stored] = useStoredFileArray("files");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      if (files) {
        Array.from(event.target.files).forEach((file) => {
          if (files.some(({ name }) => name === file.name)) {
            return;
          }
          files.push(file);
        });
      }
      setFiles([...(files || [])]);
    }
  };

  const handleAddFile = (
    file: File,
    override: boolean = false,
    index?: number
  ): void => {
    if (files && files.some(({ name }) => name === file.name)) {
      //if override then splice the new file in place of the old one
      if (override) {
        index = files.findIndex(({ name }) => name === file.name);
        files.splice(index, 1, file);
      } else {
        return;
      }
    } else if (index) {
      files.splice(index, 1, file);
    } else {
      files.push(file);
    }
    setFiles([...(files || [])]);
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
        files: [screenshot, ...files] as FileArray,
        stored: ["screenshot.png", ...stored],
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
