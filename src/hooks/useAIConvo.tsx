import React, { useState } from "react";
import actions from "../utils/actions/execute";
import AIToolsArray from "../utils/actions/AITools";
import OpenAI from "openai";
import { useOpenAI } from "./useOpenAI";

const useAIConvo = () => {
  const [convo, setConvo] = useState<OpenAI.ChatCompletion[]>([]);
  const { openAI } = useOpenAI();

  const userSendMessage = async (message: string) => {};

  return {
    handleAITool,
  };
};
