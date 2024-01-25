import type { ACTIONS } from "../types";
window.onload = () => {

    const [HTML, CSS, Config] = Array.from(document.querySelectorAll("main>div>div>button")) as HTMLButtonElement[];
    const getButton = document.createElement("button");
    getButton.setAttribute("style", "display:none");
    document.body.appendChild(getButton);
    const setButton = document.createElement("button");
    setButton.setAttribute("style", "display:none");
    document.body.appendChild(setButton);

    const getButtonOnClick = async (key: string): Promise<string> => {
        getButton.setAttribute("onclick", `(()=>localStorage.setItem('${key}',window.MonacoEditor.getValue()))();`);
        getButton.click();
        return new Promise((resolve) => setTimeout(() => resolve(localStorage.getItem(key)), 500));
    }

    const setButtonOnClick = (value: string) => {
        setButton.setAttribute('onclick', `(()=>window.MonacoEditor.setValue(\`${value}\`))();`);
        setButton.click();
    }

    const actions: ACTIONS = {
        GET_HTML: async (value?: string): Promise<string | void> => {
            HTML.click();
            return await getButtonOnClick("HTML");
        },
        GET_CSS: async (value?: string): Promise<string | void> => {
            CSS.click();
            return await getButtonOnClick("CSS");
        },
        GET_CONFIG: async (value?: string): Promise<string | void> => {
            Config.click();
            getButton.click()
            return await getButtonOnClick("Config");
        },
        SET_HTML: async (value?: string): Promise<string | void> => {
            HTML.click();
            setButtonOnClick(value)
        },
        SET_CSS: async (value?: string): Promise<string | void> => {
            CSS.click();
            setButtonOnClick
        },
        SET_CONFIG: async (value?: string): Promise<string | void> => {
            Config.click();
            setButtonOnClick
        },
    }



    const port = chrome.runtime.connect({ name: "content" });
    port.onMessage.addListener(async (message) => {
        const { type } = message;
        try {
            const data = await actions[message.type](message?.data);
            port.postMessage({ target: "popup", type, data });
        } catch (error) {
            port.postMessage({ target: "popup", type, error });
            console.error(error);
        }
    });
}
