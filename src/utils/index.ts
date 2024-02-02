import { Emittor, MyFile } from "../types";

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
            func(...args)
        }, wait)
    }
}
export const throttle = (() => {
    const finishEmitor = new Emittor();
    const currentQueue: any[] = []
    const runQueue = async (delay: number) => {
        if (!currentQueue.length) return;
        const { frozenId, func } = currentQueue.shift()
        let error: any, response: any;
        try {
            response = await func()
            finishEmitor.emit("finish", frozenId, response)
        } catch (e) {
            error = e
            finishEmitor.emit("finish", frozenId, response, error)
        }
        await new Promise(resolve => setTimeout(resolve, delay))
        if (currentQueue.length) {
            runQueue(delay);
        }
    }

    const throttle = async <T>(func: (...args: any[]) => Promise<T>, delay: number = 200) => {
        const frozenId = currentQueue.length;
        if (currentQueue.find((item) => item.func == func)) return;
        currentQueue.push({ func, frozenId })


        const returnPromis = new Promise((resolve, reject) => {
            finishEmitor.on("finish", (id: number, response: T, error: any) => {
                if (error) return reject(error)
                if (frozenId === id) {
                    console.log({ frozenId, id })
                    finishEmitor.off("finish", func)
                    resolve(response)
                }
            })
        })
        runQueue(delay);
        return returnPromis
    }
    return throttle;
})();

export const getScreenShot = async (filename: string): Promise<MyFile> => {
    return new Promise((resolve, reject) => {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            // You can add that image HTML5 canvas, or Element.
            try {
                const file = new File([base64ImageToBlob(image)], `${filename.replace(/[^a-zA-Z0-9]/g, '_').replace(/*replace extension*/ /\.[^/.]+$/, "")}.png`, {
                    type: "image/jpeg",
                }) as MyFile
                file.ignore = true;
                file.stored = true;
                resolve(file)
            } catch (e) {
                reject(e)
            }
        })
    })
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));