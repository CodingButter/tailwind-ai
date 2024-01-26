import React from "react";

function ChatArea() {
  return (
    <div>
      <div
        id="chat-area"
        className="mb-2 h-32 overflow-y-auto rounded bg-gray-700 px-2 py-1 text-sm"
      >
        {/* Chat messages will be dynamically inserted here */}
      </div>
      <textarea
        id="chat-input"
        rows={2}
        className="w-full rounded bg-gray-700 px-2 py-1 text-sm"
        placeholder="Type your message..."
      ></textarea>
    </div>
  );
}

export default ChatArea;
