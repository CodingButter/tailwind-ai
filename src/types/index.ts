const actions = {
    'GET': 'GET',
    'POST': 'POST',
    'PUT': 'PUT',
    'DELETE': 'DELETE',
    'HEAD': 'HEAD',
    'OPTIONS': 'OPTIONS',
    'CONNECT': 'CONNECT',
    'TRACE': 'TRACE',
    'PATCH': 'PATCH'
}
export type ACTIONS = keyof typeof actions;
export type messageResponse = {
    uuid: string,
    data?: any,
    error?: string
}
export enum ErrorType {
    API_KEY,
    MODEL,
}

export enum ErrorLevel {
    ERROR,
    WARNING,
    INFO,
}

export type ErrorMessage = {
    level?: ErrorLevel;
    type: ErrorType;
    message: string;
};

export type FileJSON = {
    name: string;
    type: string;
    size: number;
    content: string;
    ignore?: boolean;
    stored?: boolean;
};

export class MyFile extends File {
    public ignore?: boolean = false;
    public stored?: boolean = false;
    public content: string;
    constructor(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag) {
        super(fileBits, fileName, options);
    }

    async createContent(): Promise<void> {
        const { content } = await this.toJSON();
        this.content = content;
    }
    static async fromFile(file: File): Promise<MyFile> {
        const newFile = new MyFile([file], file.name, { type: file.type, lastModified: file.lastModified });
        await newFile.createContent();
        return newFile;
    }

    static fromJSON(json: FileJSON): Promise<MyFile> {
        return new Promise((resolve, reject) => {
            try {
                const obj = json
                console.log({ obj })
                const byteCharacters = atob(obj.content);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: obj.type });
                const file = new MyFile([blob], obj.name, { type: obj.type, lastModified: new Date().getTime() });
                resolve(file);
            } catch (error) {
                reject(error);
            }
        });
    };

    toJSON(): Promise<FileJSON> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const dataUrl = event.target.result;

                // create base64 encoded string from dataUrl chunk handle Buffer case
                if (dataUrl instanceof ArrayBuffer) return resolve({
                    name: this.name,
                    type: this.type,
                    size: this.size,
                    ignore: this.ignore,
                    stored: this.stored,
                    content: Buffer.from(dataUrl).toString('base64')
                });
                const base64EncodedData = dataUrl.split(",")[1];

                resolve({
                    name: this.name,
                    type: this.type,
                    size: this.size,
                    ignore: this.ignore,
                    stored: this.stored,
                    content: base64EncodedData
                });
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsDataURL(this);
        });
    };

    toString(): string {
        return JSON.stringify(this.toJSON());
    }
    static fromString(str: string): Promise<MyFile> {
        return MyFile.fromJSON(JSON.parse(str));
    }
}

export class Emittor {
    private events: { [key: string]: ((...args: any[]) => any)[] } = {};
    on(event: string, callback: (...args: any[]) => any) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }
    off(event: string, callback: (...args: any[]) => any) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter((func) => func !== callback);
    }
    emit(event: string, ...args: any[]) {
        if (!this.events[event]) return;
        this.events[event].forEach((func) => func(...args));
    }
}