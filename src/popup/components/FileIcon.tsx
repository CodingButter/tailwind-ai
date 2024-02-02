import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileCode,
  faFileImage,
  faFileAlt,
  faFileAudio,
  faFileVideo,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFileArchive,
} from "@fortawesome/free-solid-svg-icons";
import { MyFile } from "../../types";

interface FileIconProps extends React.HTMLAttributes<HTMLDivElement> {
  file: MyFile;
}

const FileIcon: React.FC<FileIconProps> = (props: FileIconProps) => {
  const file = props?.file;
  const iconSize = "sm";
  // Function to determine if file is an image
  const isImage = (file: MyFile): boolean => file?.type?.startsWith("image/");

  // Function to get FontAwesome icon for file type
  const getFileIcon = (fileType: string): JSX.Element => {
    switch (fileType) {
      case "application/pdf":
        return (
          <FontAwesomeIcon
            size={iconSize}
            icon={faFilePdf}
            className={"text-red-500"}
          />
        );
      case "text/html":
      case "text/css":
      case "application/javascript":
        return (
          <FontAwesomeIcon
            size={iconSize}
            icon={faFileCode}
            className={"text-blue-500"}
          />
        );
      case "text/plain":
        return <FontAwesomeIcon size={iconSize} icon={faFileAlt} />;
      case "audio/*":
        return <FontAwesomeIcon size={iconSize} icon={faFileAudio} />;
      case "video/*":
        return <FontAwesomeIcon size={iconSize} icon={faFileVideo} />;
      case "application/msword":
        return <FontAwesomeIcon size={iconSize} icon={faFileWord} />;
      case "application/vnd.ms-excel":
        return <FontAwesomeIcon size={iconSize} icon={faFileExcel} />;
      case "application/vnd.ms-powerpoint":
        return <FontAwesomeIcon size={iconSize} icon={faFilePowerpoint} />;
      case "application/zip":
      case "application/x-rar-compressed":
      case "application/x-7z-compressed":
        return <FontAwesomeIcon size={iconSize} icon={faFileArchive} />;
      default:
        return isImage(file) ? (
          <FontAwesomeIcon size={iconSize} icon={faFileImage} />
        ) : (
          <FontAwesomeIcon size={iconSize} icon={faFileAlt} />
        );
    }
  };

  return (
    <a className="flex justify-center items-center aspect-square rounded overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 text-gray-700">
      {file && isImage(file) ? (
        <img
          src={URL.createObjectURL(file)}
          alt="thumbnail"
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-300 h-full w-full text-3xl">
          {getFileIcon(file?.type)}
        </div>
      )}
    </a>
  );
};

export default FileIcon;
