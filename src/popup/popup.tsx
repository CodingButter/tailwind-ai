import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./popup.css";
import "../assets/tailwind.css";
import Accordion from "./components/Accordion";
import ChatArea from "./components/ChatArea";
import { useFileManager } from "./hooks/useFileManager";
import Header from "./components/Header";
import { useOpenAI } from "../hooks/useOpenAI";
import Redirector from "./components/Redirector";

function Popup() {
  const { files, handleAddFile } = useFileManager();
  const { openAI } = useOpenAI();
  const [currentUrl, setCurrentUrl] = useState("");

  const handleUpdateUrl = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentUrl(tabs[0].url);
    });
  };

  useEffect(() => {
    chrome.tabs.onActivated.addListener(function (activeInfo) {
      handleUpdateUrl();
    });
    handleUpdateUrl();
  }, []);

  return (
    <div
      className="overflow-y-auto flex flex-col gap-2 w-full h-full py-3 bg-gradient-to-t from-gray-800 to-gray-900 via-transparent"
      style={{ width: "400px", height: "600px" }}
    >
      {!openAI ? (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full p-8">
          <h1 className="text-white text-2xl font-bold">
            Configure Tailwind AI
          </h1>
          <div className="text-gray-400 text-md">
            <p>Please configure Tailwind AI before using it.</p>
            <Redirector
              timeout={5}
              enabled={!openAI}
              handleRedirect={() => chrome.runtime.openOptionsPage()}
            />
          </div>
        </div>
      ) : currentUrl.includes("https://play.tailwindcss.com") ? (
        <>
          <Header />
          <div className="w-full px-4 flex flex-col justify-center items-center gap-2">
            <Accordion />
          </div>
          <div className="w-full px-4 flex flex-col justify-center items-center gap-2"></div>
          <ChatArea />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full p-8">
          <h1 className="text-white text-2xl font-bold">
            PLAY.TAILWINDCSS.COM
          </h1>
          <p className="text-gray-400 text-mg text-center">
            This extension only works on Tailwind Play.
          </p>
          <Redirector
            timeout={5}
            enabled={true}
            handleRedirect={() =>
              window.open("https://play.tailwindcss.com", "_blank")
            }
          />
        </div>
      )}
    </div>
  );
}

export default Popup;
