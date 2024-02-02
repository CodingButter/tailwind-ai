import React, { ChangeEvent, useEffect } from "react";
import { useOpenAI, type Options } from "../../hooks/useOpenAI";
import PromptTextArea from "../../components/PromptTextArea";
import AITemperatureSlider from "../../components/AITemperatureSlider";

function Accordion() {
  const { options, runningOptions, setRunningOptions } = useOpenAI();

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
          options={runningOptions}
          setOptions={setRunningOptions}
        />
        <AITemperatureSlider
          options={runningOptions}
          setOptions={setRunningOptions}
        />
      </div>
    </div>
  );
}

export default Accordion;
