const tailwindTabs = []
const getTailwindTabs = async () => {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            if (tab.url?.includes('play.tailwindcss.com')) {
                if (!tailwindTabs.includes(tab.id)) {
                    tailwindTabs.push(tab.id)
                }
            }
        });
    })
}


chrome.tabs.onCreated.addListener(() => {
    getTailwindTabs()
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        getTailwindTabs()
    }
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    if (tailwindTabs.includes(tabId)) {
        tailwindTabs.splice(tailwindTabs.indexOf(tabId), 1)
    }
});
