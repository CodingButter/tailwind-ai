import React from "react";
import FileIcon from "./FileIcon";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

interface FileGridProps extends React.HTMLAttributes<HTMLDivElement> {
  files: File[];
  stored: string[];
  handleDelete: (fileName: string) => void;
}

const FileGrid: React.FC<FileGridProps> = ({ files, stored, handleDelete }) => {
  // Function to determine if file is an image
  const isImage = (file: File): boolean => {
    return file?.type?.startsWith?.("image/");
  };

  const isStored = (file: File) =>
    stored?.find?.((storedFile) => storedFile === file?.name);

  return (
    <div className="grid grid-cols-8 gap-2 p-2">
      {files &&
        files.map((file, index) => (
          <div
            key={index}
            className={classNames(
              "relative text-gray-700 rounded overflow-hidden shadow-lg transform transition duration-200 hover:scale-1101",
              !isStored(file) && "opacity-50 animate-pulse"
            )}
          >
            {/* use fontawesome for the button icon create a nice delete button that shows up on hover in the top right of the file icon */}
            <div className="absolute top-0 right-0 w-full h-full p-2 z-50">
              <button
                title={`Delete ${file?.name}`}
                onClick={() => handleDelete(file?.name)}
                className="opacity-0 rounded-md hover:opacity-100 w-full h-full p-2 text-gray-200 bg-gray-900 rounded-bl hover:bg-gray-600 flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faTrashCan} size="sm" />
              </button>
            </div>
            <FileIcon file={file} />
          </div>
        ))}
    </div>
  );
};

export default FileGrid;
