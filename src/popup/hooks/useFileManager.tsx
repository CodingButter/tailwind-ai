import React, {
  useState,
  ChangeEvent,
  createContext,
  useContext,
  useRef,
} from "react";

interface FileManagerContextProps {
  files: Map<string, File>;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleFileDelete: (fileName: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

interface FileManagerPoviderProps {
  children: React.ReactNode;
}

const FileManagerContext = createContext<FileManagerContextProps>({
  files: new Map(),
  handleFileChange: (event: ChangeEvent) => {},
  handleFileDelete: (fileName: string) => {},
  inputRef: { current: null },
});

export const useFileManager = () => useContext(FileManagerContext);

export const FileManagerProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [files, setFiles] = useState<Map<string, File>>(new Map());
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles((current) => {
        Array.from(event.target.files).forEach((file) => {
          current.set(file.name, file);
        });
        return new Map(current);
      });
    }
  };

  const handleFileDelete = (fileName: string): void => {
    setFiles((current) => {
      current.delete(fileName);
      return new Map(current);
    });
  };

  return (
    <FileManagerContext.Provider
      value={{ files, handleFileChange, handleFileDelete, inputRef }}
    >
      {children}
    </FileManagerContext.Provider>
  );
};
