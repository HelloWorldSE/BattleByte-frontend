export interface WSProtocol<T> {
    type: string,
    data: T,
    id: number
}

export interface LoginRequestData {
    token: string,
}

export interface LoginResultData {
    code: number,
    message: string
}


export interface ErrorData {
    ack: number,
    code: number
}