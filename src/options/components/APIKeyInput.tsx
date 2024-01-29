import React, { ChangeEvent } from "react";
import type { Options } from "../../hooks/useOpenAI";
import type { ErrorMessage } from "../../types";
import ErrorComponent from "../../components/ErrorComponent";
interface APIKeyInputProps {
  error: ErrorMessage;
  options: Partial<Options>;
  setOptions: (options: Partial<Options>) => void;
}

const APIKeyInput: React.FC<APIKeyInputProps> = ({
  options,
  setOptions,
  error,
}) => {
  const { openAIKey } = options;
  const handleSetAIKey = (e: ChangeEvent<HTMLInputElement>) => {
    setOptions({ openAIKey: e.target.value });
  };

  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <div className="flex justify-start items-end gap-2">
        <label
          htmlFor="openai-api-key"
          className="block text-lg whitespace-nowrap"
        >
          OpenAI API Key
        </label>
        <div className="h-12 w-3/4 translate-y-3 -z-10">
          <ErrorComponent error={error} />
        </div>
      </div>
      <input
        value={openAIKey}
        onChange={handleSetAIKey}
        type="password"
        id="openai-api-key"
        className="bg-gray-700 text-white block w-full p-2 rounded"
        placeholder="Enter your API Key"
      />
    </div>
  );
};

export default APIKeyInput;
