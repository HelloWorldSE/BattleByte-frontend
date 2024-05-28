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
    fromName?: string,
    message: string
}

export interface PosSyncData {
    user_id: number,
    row: number,
    col: number,
    total_row: number
}

export interface ItemUsedData {
    sender_id: number,
    type: string
}

export interface RoomRefreshData {
    roomid: number,
    userid: number[],
    username: string[],
    avatarUrl: string[]
}

export interface ErrorData {
    ack: number,
    msg: string
}