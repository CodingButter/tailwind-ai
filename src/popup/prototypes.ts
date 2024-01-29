
interface FileJSON {
    name: string;
    type: string;
    size: number;
    content: string;
}
//@ts-expect-error we are adding a static method to the File class
File.fromJSON = function (json: FileJSON) {
    return new Promise((resolve, reject) => {
        try {
            const obj = json
            const byteCharacters = atob(obj.content);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: obj.type });
            const file = new File([blob], obj.name, { type: obj.type, lastModified: new Date().getTime() });
            resolve(file);
        } catch (error) {
            reject(error);
        }
    });
};

//@ts-expect-error we are adding a prototype method to the File class
File.prototype.toJSON = function (): Promise<FileJSON> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            // create base64 encoded string from dataUrl chunk handle Buffer case
            if (dataUrl instanceof ArrayBuffer) return resolve({
                name: this.name,
                type: this.type,
                size: this.size,
                content: Buffer.from(dataUrl).toString('base64')
            });
            const base64EncodedData = dataUrl.split(",")[1];

            resolve({
                name: this.name,
                type: this.type,
                size: this.size,
                content: base64EncodedData
            });
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.readAsDataURL(this);
    });
};

File.prototype.toString = function () {
    return JSON.stringify(this.toJSON());
}
//@ts-expect-error we are adding a static method to the File class
File.fromString = function (str: string) {
    //@ts-expect-error we are adding a static method to the File class
    return File.fromJSON(JSON.parse(str));
}