import React from "react";
import FileInput from "./FileInput";
import { useFileManager } from "../hooks/useFileManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import TextAreaAutosize from "react-textarea-autosize";

function ChatArea() {
  const { inputRef, files } = useFileManager();
  return (
    <div className="w-full rounded-md h-full flex flex-col justify-end gap-2 px-4">
      <div
        id="chat-area"
        className="w-full h-full element-with-custom-scrollbar mb-2 overflow-y-auto rounded px-2 py-1 text-sm"
      >
        {/* Chat messages will be dynamically inserted here */}
      </div>
      <div className="surface flex flex-col gap-2">
        <FileInput />
        <div className="relative flex justify-center items-start w-full rounded py-1 gap-2">
          <button
            onClick={() => inputRef?.current?.click()}
            className="text-white py-2 pl-4 flex items-end absolute z-10 left-0 bottom-0"
          >
            <FontAwesomeIcon size="xl" icon={faPaperclip} />
          </button>
          <TextAreaAutosize
            id="chat-input"
            minRows={1}
            maxRows={6}
            className="element-with-custom-scrollbar p-1 px-12 text-sm w-full rounded bg-transparent outline-none resize-none"
            placeholder="Type your message..."
          ></TextAreaAutosize>
          <button className="text-white py-2 pr-4 flex items-end absolute z-10 right-0 bottom-0">
            <FontAwesomeIcon size="xl" icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
