const getCurrentURL = (): string => (window.location.href);
const isTailwindcssURL = (tab: chrome.tabs.Tab): boolean => tab.url?.includes?.("https://play.tailwindcss.com/");
export interface sendParams {
    func: keyof typeof actions;
    args?: any[];
}

export const send = ({ func, args = [] }: sendParams): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab || !isTailwindcssURL(tab)) return;
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: actions[func],
            args
        });
    });
}

export const actions = {

}

