import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import Popup from "./popup";
import { FileManagerProvider } from "./hooks/useFileManager";
import { OpenAIProvider } from "../hooks/useOpenAI";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  appContainer.id = "app-container";
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  console.log(appContainer);
  root.render(<WrapperComponent />);
}

const WrapperComponent = () => {
  return (
    <OpenAIProvider>
      <FileManagerProvider>
        <Popup />
      </FileManagerProvider>
    </OpenAIProvider>
  );
};

init();
