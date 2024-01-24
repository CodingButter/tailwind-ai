chrome.runtime.sendMessage('I am loading content script', (response) => {
    console.log(response);
    console.log('I am content script')

})

window.onload = (event: Event = null) => {
    console.log('page is fully loaded');
};
