import React, { ChangeEvent, useEffect } from "react";
import { useOpenAI, type Options } from "../../hooks/useOpenAI";
import useChromeStorage from "../../hooks/useChromeStorage";
import PromptTextArea from "../../components/PromptTextArea";
import AITemperatureSlider from "../../components/AITemperatureSlider";

function Accordion() {
  const { options } = useOpenAI();
  const [runningPrompt, setRunningPrompt] = useChromeStorage(
    "runningPrompt",
    options.prompt
  );

  const [runningTemp, setRunningTemp] = useChromeStorage(
    "runningTemp",
    options.temperature
  );

  const handleSetRunningoptions = (newoptions: Partial<Options>) => {
    setRunningPrompt(newoptions.prompt);
    setRunningTemp(newoptions.temperature);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center gap-4 text-accent"></div>
      <input
        type="checkbox"
        id="accordion"
        className="accordion-checkbox bg-transparent outline-none"
      />

      <div className="surface accordion-content mb-2 flex flex-col gap-1 text-sm text-gray-200">
        <PromptTextArea
          options={{ prompt: runningPrompt }}
          setOptions={handleSetRunningoptions}
        />
        <AITemperatureSlider
          options={{ temperature: runningTemp }}
          setOptions={handleSetRunningoptions}
        />
      </div>
    </div>
  );
}

export default Accordion;
