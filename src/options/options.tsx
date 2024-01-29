import React, { useState, useEffect } from "react";
import "../assets/tailwind.css";
import "./Options.css";
import AIModelSelect from "./components/AIModelSelect";
import AITemperatureSlider from "../components/AITemperatureSlider";
import PromptTextArea from "../components/PromptTextArea";
import APIKeyInput from "./components/APIKeyInput";
import SaveButton from "./components/SaveButton";
import { type Options, useOpenAI } from "../hooks/useOpenAI";
import OtherOptions from "./components/OtherOptions";

const OptionsComponent = () => {
  const { openAI, options, setOptions, error } = useOpenAI();
  const [unsavedOptions, setUnsavedOptions] = useState<Options>(options);

  const handleSetUnsavedOptions = (newOptions: Partial<Options>) => {
    setUnsavedOptions({ ...unsavedOptions, ...newOptions });
  };

  const saveOptions = () => {
    setOptions(unsavedOptions);
  };

  useEffect(() => {
    if (unsavedOptions !== options) {
      setUnsavedOptions(options);
    }
  }, [options]);

  useEffect(() => {
    if (options.autoSave || unsavedOptions.autoSave) {
      if (Object.is(options, unsavedOptions)) return;
      saveOptions();
    }
  }, [unsavedOptions]);

  return (
    <div className="p-4 flex h-screen w-screen items-center justify-center text-white">
      <div className="container mx-auto p-4 max-w-screen-md gap-4 flex flex-col">
        <h1 className="text-3xl font-bold">AI Extension Options</h1>
        <hr />
        {openAI && (
          <>
            <AIModelSelect
              options={unsavedOptions}
              setOptions={handleSetUnsavedOptions}
            />
            <AITemperatureSlider
              options={unsavedOptions}
              setOptions={handleSetUnsavedOptions}
            />
            <PromptTextArea
              options={unsavedOptions}
              setOptions={handleSetUnsavedOptions}
            />
          </>
        )}
        <APIKeyInput
          error={error}
          options={unsavedOptions}
          setOptions={handleSetUnsavedOptions}
        />
        {/* Other Options Accordion */}
        <OtherOptions
          options={unsavedOptions}
          setOptions={handleSetUnsavedOptions}
        />
        <SaveButton
          options={options}
          unsavedOptions={unsavedOptions}
          setOptions={handleSetUnsavedOptions}
          saveOptions={saveOptions}
        />
      </div>
    </div>
  );
};

export default OptionsComponent;
