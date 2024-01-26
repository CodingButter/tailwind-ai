import type { ACTIONS } from "../../types";
import { v4 as uuidv4 } from 'uuid';
const port = chrome.runtime.connect({ name: "popup" });

interface sendMessageProps {
  action: ACTIONS,
  data?: string
}

interface sendMessageResponse {
  action: ACTIONS,
  data?: string
  uuid: string
}

interface sendMessageCallbackProps {
  data?: string,
  error?: string
}
type sendMessageCallback = (props: sendMessageCallbackProps) => void

const listeners = new Map<string, (response: { action: ACTIONS, data?: string, error?: string, uuid: string }) => void>();
port.onMessage.addListener((message) => {
  const { uuid } = message;
  listeners.get(uuid)?.(message)
});

const createListener = (uuid: string, callback: sendMessageCallback) => {
  listeners.set(uuid, ({ data, uuid, error }) => {
    listeners.delete(uuid);
    callback({ data, error });
  });
}

const sendMessage = async ({ action, data }: sendMessageProps, callback?: sendMessageCallback): Promise<sendMessageCallbackProps> => {
  const uuid: string = uuidv4();
  port.postMessage({ target: "content", type: action, data, uuid });
  if (callback) createListener(uuid, callback);
  return new Promise((resolve) => {
    port.postMessage({ target: "content", type: action, data, uuid });
    createListener(uuid, ({ data, error }) => {
      resolve({ data, error });
    });
  });
}

export default sendMessage;
