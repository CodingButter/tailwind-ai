import React from "react";
import "./App.css";
import Accordion from "./components/Accordion";
import FileInput from "./components/FileInput";
import ChatArea from "./components/ChatArea";

function App() {
  return (
    <div className="rounded-md bg-gray-800 text-gray-200 shadow-lg">
      <div
        className="overflow-y-auto p-4"
        style={{ width: "400px", height: "600px" }}
      >
        <div className="mb-2">
          <a
            onClick={() => chrome.runtime.openOptionsPage()}
            className="text-accent hover:text-accent text-sm hover:underline cursor-pointer"
          >
            Go to Options
          </a>
        </div>
        <Accordion>
          <label htmlFor="prompt" className="mb-1 text-gray-400">
            Prompt (optional)
          </label>
          <input
            placeholder="Some Extra Context"
            type="text"
            id="prompt"
            name="prompt"
            className="border-accent mb-2 w-full rounded bg-gray-500 px-2 py-1 placeholder:text-gray-200"
          />

          <label htmlFor="temperature" className="mb-1 text-gray-400">
            Temperature
          </label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            className="border-accent w-full rounded bg-gray-500 px-2 py-1"
            placeholder="0.7"
            step="0.01"
          />
        </Accordion>
        <FileInput />
        <ChatArea />
        <button
          id="convert-to-react"
          className="text-accent bg-primary w-full rounded py-2 text-sm hover:bg-gray-700"
        >
          Convert to React
        </button>
      </div>
    </div>
  );
}

export default App;
