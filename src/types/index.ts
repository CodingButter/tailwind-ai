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