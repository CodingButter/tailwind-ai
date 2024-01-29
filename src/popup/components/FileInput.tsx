import React, { useState, ChangeEvent } from "react";
import FileGrid from "./FileGrid";
import { useFileManager } from "../hooks/useFileManager";
import classNames from "classnames";

function FileInput() {
  const { files, handleFileChange, handleFileDelete, inputRef, stored } =
    useFileManager();
  return (
    <div
      className={classNames("", files?.length === 0 || (!files && "hidden"))}
    >
      <input
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
        id="file-input"
        name="file-input"
        className="hidden"
        multiple
      />

      <FileGrid handleDelete={handleFileDelete} files={files} stored={stored} />
    </div>
  );
}

export default FileInput;
