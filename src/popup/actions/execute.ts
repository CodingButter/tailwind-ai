const executeFunction = async (func: (...args: any) => any) => {
    const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true })
    if (activeTab.url?.includes('play.tailwindcss.com')) {
        const response = await chrome.scripting.executeScript(
            {
                target: { tabId: activeTab.id },
                func
            });
        return response[0]
    }
    return { result: null, error: 'Please open a Tailwind Play page' }
}

const actions = [
    {
        type: "function",
        function: {
            name: "getHTML",
            description: "Get the HTML from the Tailwind Play page",
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
    }, {
        type: "function",
        function: {
            name: "getCSS",
            description: "Get the CSS from the Tailwind Play page",
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
    {
        type: "function",
        fucntion: {
            name: "getConfig",
            description: "Get the Tailwind Config from the Tailwind Play page",
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
    }
]


export default actions;