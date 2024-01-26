const ports: Map<string, chrome.runtime.Port> = new Map();
chrome.runtime.onConnect.addListener((port) => {
    ports.set(port.name, port);
    port.onMessage.addListener((message) => {
        if (!ports.get(message.target))
            ports.get(message.target)?.postMessage(message)
    });
    port.onDisconnect.addListener(() => {
        ports.delete(port.name);
    });

})