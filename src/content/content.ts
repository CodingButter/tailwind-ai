import type { ACTIONS } from "../types";
window.onload = () => {

    const [HTML, CSS, Config] = Array.from(document.querySelectorAll("main>div>div>button")) as HTMLButtonElement[];
    const getButton = document.createElement("button");
    getButton.setAttribute("style", "display:none");
    document.body.appendChild(getButton);
    const setButton = document.createElement("button");
    setButton.setAttribute("style", "display:none");
    document.body.appendChild(setButton);

    const getButtonOnClick = async (): Promise<string> => {
        getButton.setAttribute("onclick", `(()=>localStorage.setItem('EDITOR_VALUE',window.MonacoEditor.getValue()))();`);
        await new Promise((resolve) => setTimeout(() => resolve(getButton.click()), 500));
        return localStorage.getItem('EDITOR_VALUE')
    }

    const setButtonOnClick = async (value: string): Promise<void> => {
        setButton.setAttribute('onclick', `(()=>window.MonacoEditor.setValue(\`${value}\`))();`);
        await new Promise((resolve) => setTimeout(() => resolve(setButton.click()), 500));
    }

    const actions = {
        GET_HTML: async (value?: string): Promise<string | void> => {
            HTML.click();
            return await getButtonOnClick();
        },
        GET_CSS: async (value?: string): Promise<string | void> => {
            CSS.click();
            return await getButtonOnClick();
        },
        GET_CONFIG: async (value?: string): Promise<string | void> => {
            Config.click();
            getButton.click()
            return await getButtonOnClick();
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
        const { type, uuid } = message;
        try {
            const data = await actions[message.type](message?.data);
            port.postMessage({ target: "popup", type, data, uuid });
        } catch (error) {
            port.postMessage({ target: "popup", type, error, uuid });
            console.error(error);
        }
    });
}
