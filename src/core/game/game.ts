import type { MatchEnterData } from "../comm/interfaces";

export type MatchInfo = MatchEnterData

export type PosData = {
    row: number,
    col: number,
    total_rows: number
}

export type PosMap = {
    [user_id: number]: PosData
}

export type HpMap = {
    [user_id: number]: number
}