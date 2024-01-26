import React, { useState, ChangeEvent } from "react";
import FileGrid from "./FileGrid";

function FileInput() {
  const [files, setFiles] = useState<Map<string, File>>(new Map());

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
    <div className="mb-2">
      <input
        onChange={handleFileChange}
        type="file"
        id="file-input"
        name="file-input"
        className="hidden"
        multiple
      />
      <label
        htmlFor="file-input"
        className="bg-primary block w-full cursor-pointer rounded py-2 text-center text-sm hover:bg-gray-700"
      >
        Choose File
      </label>
      <FileGrid
        handleDelete={handleFileDelete}
        files={Array.from(files).map(([name, file]) => file)}
      />
    </div>
  );
}

export default FileInput;
