const executeFunction = async (func: (...args: any[]) => any, ...args: any[]) => {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (activeTab.url?.includes('play.tailwindcss.com')) {
        const response = await chrome.scripting.executeScript(
            {
                args,
                target: { tabId: activeTab.id },
                func
            });
        return response[0]
    }
    return { result: null, error: 'Please open a Tailwind Play page' }
}

const actions = {
    getHTML: {
        type: "function",
        function: {
            name: "getHTML",
            description: "Returns the HTML in the editor",
            parameters: {}
        },
        exec: async () => {
            await executeFunction(() => {
                try {
                    //@ts-expect-error these are global variables ive set
                    const HTML_BTN = window.HTML_BTN;
                    //@ts-expect-error these are global variables ive set
                    const getButton = window.getButton;
                    HTML_BTN.click();
                    getButton.setAttribute('onclick', 'document.getElementById("tailwind-ai-result").setAttribute("data-response",MonacoEditor.getValue())');
                } catch (error) {
                    return { result: null, error }
                }
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const results = await executeFunction(() => {
                try {
                    //@ts-expect-error these are global variables ive set
                    const getButton = window.getButton;
                    getButton.click();
                    //@ts-expect-error these are global variables ive set
                    const resultDiv = window.resultDiv;
                    return resultDiv.getAttribute('data-response')
                } catch (error) {
                    return null
                }
            });
            return results.result;
        }
    },
    getCSS: {
        type: "function",
        function: {
            name: "getCSS",
            description: "Returns the CSS in the Editor",
            parameters: {}
        },
        exec: async () => {
            await executeFunction(() => {
                try {
                    //@ts-expect-error these are global variables ive set
                    const CSS_BTN = window.CSS_BTN;
                    //@ts-expect-error these are global variables ive set
                    const getButton = window.getButton;
                    CSS_BTN.click();
                    getButton.setAttribute('onclick', 'document.getElementById("tailwind-ai-result").setAttribute("data-response",MonacoEditor.getValue())');
                } catch (error) {
                    return { result: null, error }
                }
            })
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const results = await executeFunction(() => {
                try {
                    //@ts-expect-error these are global variables ive set
                    const getButton = window.getButton;
                    getButton.click();
                    //@ts-expect-error these are global variables ive set
                    const resultDiv = window.resultDiv;
                    return resultDiv.getAttribute('data-response')
                } catch (error) {
                    return { result: null, error }
                }
            });
            return results.result;
        }
    },
    getConfig: {
        type: "function",
        function: {
            name: "getConfig",
            description: "Returns the Tailwind Config in the Editor",
            parameters: {}
        },
        exec: async () => {
            await executeFunction(() => {
                try {
                    //@ts-expect-error these are global variables ive set
                    const CONFIG_BTN = window.CONFIG_BTN;
                    //@ts-expect-error these are global variables ive set
                    const getButton = window.getButton;
                    CONFIG_BTN.click();
                    getButton.setAttribute('onclick', 'document.getElementById("tailwind-ai-result").setAttribute("data-response",MonacoEditor.getValue())');
                } catch (error) {
                    return { result: null, error }
                }
            })
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const results = await executeFunction(() => {
                try {
                    //@ts-expect-error these are global variables ive set
                    const getButton = window.getButton;
                    getButton.click();
                    //@ts-expect-error these are global variables ive set
                    const resultDiv = window.resultDiv;
                    return resultDiv.getAttribute('data-response')
                } catch (error) {
                    return { result: null, error }
                }
            });
            return results.result;
        }
    },
    setHTML: {
        type: "function",
        function: {
            name: "setHTML",
            description: "Sets the HTML in the editor",
            parameters: {
                type: "string",
                description: "The HTML on a single line with \n for new lines"
            }

        },
        exec: async (css: string) => {
            const resp = await executeFunction((css: string) => {
                try {
                    //@ts-expect-error these are global variables ive set
                    const HTML = window.HTML;
                    //@ts-expect-error these are global variables ive set
                    const setButton = window.setButton;
                    HTML.click();
                    //@ts-expect-error these are global variables ive set
                    MonacoEditor.setValue(css);
                } catch (error) {
                    return { result: null, error }
                }
            })
            return resp.result;
        }
    }
}


export default actions;

