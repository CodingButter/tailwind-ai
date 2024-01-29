import React, { useState, ChangeEvent, useEffect } from "react";
import { type Options } from "../hooks/useOpenAI";
interface AITemperatureSliderProps {
  options: Partial<Options>;
  setOptions: (options: Partial<Options>) => void;
}

const AITemperatureSlider: React.FC<AITemperatureSliderProps> = ({
  options,
  setOptions,
}) => {
  const runningTemp = options.temperature;

  const handleUpdateTemp = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setOptions({ temperature: value });
  };

  return (
    <div className="mb-4">
      <label htmlFor="ai-temperature" className="block mb-2 text-lg">
        AI Temperature {runningTemp && `(${runningTemp})`}
      </label>

      <input
        value={runningTemp}
        onChange={handleUpdateTemp}
        type="range"
        id="ai-temperature"
        min="0"
        max="1"
        step="0.01"
        className="w-full"
      />
    </div>
  );
};

export default AITemperatureSlider;
