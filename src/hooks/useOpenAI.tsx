import React, { useState, useEffect, createContext, useContext } from "react";
import OpenAI from "openai";
import useChromeStorage from "./useChromeStorage";
import { ErrorMessage, ErrorLevel, ErrorType } from "../types";

export type Options = {
  openAIKey: string;
  model: string;
  temperature: number;
  prompt: string;
  sendScreenshot: boolean;
  autoSave: boolean;
};

const defaultOptions: Options = {
  openAIKey: "",
  model: "davinci",
  temperature: 0.5,
  prompt: "",
  sendScreenshot: true,
  autoSave: true,
};

type OpenAIContextProps = {
  openAI: OpenAI;
  options: Options;
  setOptions: (options: Partial<Options>) => void;
  error: ErrorMessage;
};

const OpenAIContext = createContext<OpenAIContextProps>(null);
export const useOpenAI = () => useContext(OpenAIContext);

export const OpenAIProvider = ({ children }) => {
  const [error, setError] = useState<ErrorMessage>(null);
  const [openAI, setOpenAI] = useState<OpenAI>(null);
  const [options, setOptions] = useChromeStorage<Options>(
    "options",
    defaultOptions
  );

  const handleSetOptions = (updateOptions: Partial<Options>) => {
    setOptions({ ...options, ...updateOptions });
  };

  const handleCreateOpenAI = () => {
    if (!options.openAIKey) {
      if (openAI) setOpenAI(null);
      return;
    }

    const opn = new OpenAI({
      apiKey: options.openAIKey,
      dangerouslyAllowBrowser: true,
    });
    opn.models
      .list()
      .then(() => {
        setOpenAI(opn);
        setError(null);
      })
      .catch((error) => {
        setError({
          level: ErrorLevel.ERROR,
          type: ErrorType.API_KEY,
          message: error.message,
        });
        setOpenAI(null);
      });
  };

  useEffect(() => {
    handleCreateOpenAI();
  }, [options]);

  return (
    <OpenAIContext.Provider
      value={{
        error,
        openAI,
        options,
        setOptions: handleSetOptions,
      }}
    >
      {children}
    </OpenAIContext.Provider>
  );
};
