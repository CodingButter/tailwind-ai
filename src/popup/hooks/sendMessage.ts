import { ACTIONS } from "../../types";
import { v4 as uuidv4 } from 'uuid';
const port = chrome.runtime.connect({ name: "popup" });

interface sendMessageProps {
  action: ACTIONS,
  data?: any
}

interface sendMessageResponse {
  action: ACTIONS,
  data?: any
  uuid: string
}

interface sendMessageCallbackProps {
  data?: any,
  error?: string
}
type sendMessageCallback = (props: sendMessageCallbackProps) => void

const listeners = new Map<string, (response: { action: ACTIONS, data?: any, error?: string, uuid: string }) => void>();
port.onMessage.addListener((message) => {
  console.log({ from: 'popup', message })
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

  if (callback) {
    createListener(uuid, callback);
    port.postMessage({ target: "content", action, data, uuid })
  }
  else {
    return new Promise((resolve) => {
      createListener(uuid, ({ data, error }) => {
        resolve({ data, error });
      });
      port.postMessage({ target: "content", action, data, uuid });
    });
  }
}

export default sendMessage;
