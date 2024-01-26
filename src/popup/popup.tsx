import React, { ChangeEvent, useState } from "react";
import "./popup.css";
import "../assets/tailwind.css";
import Accordion from "./components/Accordion";
import ChatArea from "./components/ChatArea";
import { FileManagerProvider } from "./hooks/useFileManager";
import {
  IconBxlReact,
  IconOptions,
  IconWeather_lightning,
} from "../components/icons";

function App() {
  const [files, setFiles] = useState<Map<string, File>>(new Map());
  return (
    <FileManagerProvider>
      <div className="h-full text-gray-200 shadow-lg">
        <div
          className="overflow-y-auto flex flex-col gap-2 w-full h-full py-2"
          style={{ width: "400px", height: "600px" }}
        >
          <div className="flex justify-items-stretch flex-row-reverse items-center gap-2 px-4 w-full">
            <button className="surface rounded p-2 text-sm top-2 right-2">
              <span className="button-text">Convert to React</span>
              <span className="button-icon">
                <IconBxlReact />
              </span>
            </button>
            <button
              className="surface rounded p-2 text-sm top-2 right-2"
              onClick={() => chrome.runtime.openOptionsPage()}
            >
              <span className="button-text">Goto Options</span>
              <span className="button-icon">
                <IconOptions />
              </span>
            </button>
            <label
              htmlFor="accordion"
              className="surface rounded p-2 text-sm top-2 right-2"
            >
              <span className="button-text">Quick Options</span>
              <span className="button-icon">
                <IconWeather_lightning />
              </span>
            </label>
          </div>
          <div className="w-full px-4 flex flex-col justify-center items-center gap-2">
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
          </div>
          <ChatArea />
        </div>
      </div>
    </FileManagerProvider>
  );
}

export default App;
