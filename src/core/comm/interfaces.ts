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

export interface MatchEnterData {
    info: {
        questionId: number
    },
    playerMap: {
        [team_id: string]: number
    }
}

export interface ChatMsgData {
    fromId: number,
    message: string
}

export interface PosSyncData {
    user_id: number,
    row: number,
    col: number,
    total_row: number
}

export interface ErrorData {
    ack: number,
    code: number
}