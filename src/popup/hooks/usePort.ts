import React, { useEffect, useState } from "react";
import type { ACTIONS, ACTIONS_KEYS } from "../../types";

const port = chrome.runtime.connect({ name: "popup" });


export const useGet = (action: ACTIONS_KEYS) => {
  const [value, setValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const update = async () => {
    const listener = (message) => {

      console.log(message);
      if (message.type === action) {
        setIsLoading(false);
        if (message.error) {
          setError(message.error);
        } else {
          setValue(message.data);
        }
      }
      port.onMessage.removeListener(listener);
    };
    setIsLoading(true);
    port.postMessage({ target: "content", type: action });
    port.onMessage.addListener(listener);
  };
  useEffect(() => {
    update();
  }, []);
  return [value, isLoading, error, update];
};
