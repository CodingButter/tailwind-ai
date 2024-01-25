const ports = new Map<string, { port: chrome.runtime.Port, listeners: string[] }>();
chrome.runtime.onConnect.addListener((port) => {
    ports.set(port.name, { port, listeners: [] });
    port.onMessage.addListener((message) => {
        ports.get(message.target)?.port.postMessage(message)
    });
    port.onDisconnect.addListener(() => {
        ports.delete(port.name);
    });

})