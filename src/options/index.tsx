import React from "react";
import { createRoot } from "react-dom/client";
import "../assets/tailwind.css";
import { OpenAIProvider } from "../hooks/useOpenAI";
import OptionsComponent from "./Options";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(<Wrapper />);
}

const Wrapper = () => {
  return (
    <OpenAIProvider>
      <OptionsComponent />
    </OpenAIProvider>
  );
};

init();
