import React, { useState, useEffect } from "react";
import actions from "../utils/actions/execute";
import AIToolsArray from "../utils/actions/AITools";
import { useOpenAI } from "./useOpenAI";

const useAIConvo = () => {
  const [convo, setConvo] = useState([]);
  const [message, setMessage] = useState("");
  const { openAI, options, runningOptions } = useOpenAI();

  useEffect(() => {
    if (!openAI || options.prompt) return;
  }, [openAI, options]);

  const userSendMessage = async (message: string) => {
    const response = await openAI.chat.completions.create({
      model: options.model,
      messages: [
        {
          role: "system",
          content: `${prompt}
            
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    setConvo([
      ...convo,
      { role: "user", content: message },
      { role: "system", content: response.choices[0].message.content },
    ]);
  };

  return {
    userSendMessage,
  };
};
