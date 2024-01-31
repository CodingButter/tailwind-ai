export function base64ImageToBlob(str: string) {
    // extract content type and base64 payload from original string
    str = str || '';
    const pos = str.indexOf(';base64,');
    const type = str.substring(5, pos);
    const b64 = str.substring(pos + 8);

    // decode base64
    const imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for (let n = 0; n < imageContent.length; n++) {
        view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    const blob = new Blob([buffer], { type: type });

    return blob;
}
let timeout: any
export function debounce<T>(func: (...args: T[]) => any, wait: number, immediate: boolean = false): (...args: T[]) => any {
    if (immediate) return func;


    return (...args: T[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log('debounce stored')
            func(...args)
        }, wait)
    }
}

export const getScreenShot = async (filename: string): Promise<File> => {
    return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            // You can add that image HTML5 canvas, or Element.
            try {
                const file = new File([base64ImageToBlob(image)], `${filename.replace(/[^a-zA-Z0-9]/g, '_').replace(/*replace extension*/ /\.[^/.]+$/, "")}.png`, {
                    type: "image/jpeg",
                });
                resolve(file)
            } catch (e) {
                reject(e)
            }
        })
    })
}