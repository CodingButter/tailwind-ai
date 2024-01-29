import React, { ChangeEvent, useEffect, useState } from "react";
import { Options } from "../hooks/useOpenAI";
import TextareaAutosize from "react-textarea-autosize";

interface PromptTextAreaProps {
  options: Partial<Options>;
  setOptions: (options: Partial<Options>) => void;
}

const PromptTextArea: React.FC<PromptTextAreaProps> = ({
  options,
  setOptions,
}) => {
  const handleSetPrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOptions({ prompt: e.target.value });
  };

  return (
    <div className="mb-4">
      <label htmlFor="ai-prompt" className="block mb-2 text-lg">
        Prompt Extra Context
      </label>
      <TextareaAutosize
        value={options.prompt}
        onChange={handleSetPrompt}
        id="ai-prompt"
        rows={4}
        minRows={8}
        className="bg-gray-700 text-white block w-full p-2 rounded"
      ></TextareaAutosize>
    </div>
  );
};

export default PromptTextArea;
