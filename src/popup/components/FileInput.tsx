import React, { useState, ChangeEvent } from "react";
import FileGrid from "./FileGrid";
import { useFileManager } from "../hooks/useFileManager";

function FileInput() {
  const { files, handleFileChange, handleFileDelete, inputRef } =
    useFileManager();
  return (
    <div className={files.size === 0 && "hidden"}>
      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        id="file-input"
        name="file-input"
        className="hidden"
        multiple
      />

      <FileGrid
        handleDelete={handleFileDelete}
        files={Array.from(files).map(([name, file]) => file)}
      />
    </div>
  );
}

export default FileInput;
