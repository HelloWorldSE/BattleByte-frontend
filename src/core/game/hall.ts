// 大厅

import type { LoginRequestData, LoginResultData, MatchEnterData } from "@/core/comm/interfaces"
import { useConnector, type WSConnectState } from "@/stores/connector"
import { useGameStore } from "@/stores/game"
import { isLoggedIn } from "@/utils/auth"
import { message } from "ant-design-vue"
import type { MessageType } from "ant-design-vue/es/message"
import { useRouter } from "vue-router"

export enum HallStatus {
    OFFLINE,
    LOGGING_IN,
    ONLINE,
    MATCHING,
    IN_MATCH,
    IN_ROOM,
    SETTLING
}

export class Hall {

    status: HallStatus = HallStatus.OFFLINE
    conn: ReturnType<typeof useConnector>
    game: ReturnType<typeof useGameStore>

    router: ReturnType<typeof useRouter>

    msgToClose: MessageType | undefined

    constructor(private state_update_callback?: (new_value: HallStatus) => void,
                private sync_callback: (
                    type: 'POS_SYNC' | 'SCORE_SYNC' | 'ANSWER_RESULT' |
                          'CHAT_MSG' | 'GAME_END' | 'ITEM_USED' |
                          'ROOM_REFRESH' | 'HP_CHANGE' | 'GAME_ADD' |
                          'ROOM_INVITED' ,
                    data: any) => void = () => {}) {

        // use arrow function to avoid 'this'-bindings
        const rcv_login_ack = (data: LoginResultData) => {
            this.set_status(HallStatus.ONLINE)
            // message.success({content: "登录成功！", key: 'hall_login', duration: 1})
        }
        const rcv_match_start = () => {
            this.set_status(HallStatus.MATCHING)
            this.game.match_info = undefined
            // message.loading({content: "正在匹配...", key: 'hall_match', duration: 0})
        }
        const rcv_match_enter = (data: MatchEnterData) => {
            this.set_status(HallStatus.IN_MATCH)
            this.game.match_info = data
            console.log(`STAGE A`, this.game.match_info)
            // message.loading({content: "匹配成功！", key: 'hall_match', duration: 1})
            this.router.push('/contest')
        }
        /* -- DEPRECATED --
        const rcv_match_end = () => {
            message.success('比赛已结束！', 1)
        }
        */

        const rcv_pos_sync = (data: any) => {
            this.sync_callback('POS_SYNC', data)
        }
        const rcv_score_sync = (data: any) => {
            this.sync_callback('SCORE_SYNC', data)
        }
        const rcv_answer_result = (data: any) => {
            this.sync_callback('ANSWER_RESULT', data)
        }
        const rcv_chat_msg = (data: any) => {
            this.sync_callback('CHAT_MSG', data)
        }
        const rcv_game_end = (data: any) => {
            this.set_status(HallStatus.SETTLING)
            this.sync_callback('GAME_END', data)
        }
        const rcv_item_used = (data: any) => {
            this.sync_callback('ITEM_USED', data)
        }
        const rcv_romm_refresh = (data: any) => {
            this.set_status(HallStatus.IN_ROOM)
            this.sync_callback('ROOM_REFRESH', data)
        }
        const rcv_hp_change = (data: any) => {
            this.sync_callback('HP_CHANGE', data)
        }
        const rcv_game_add = (data: any) => {
            this.sync_callback('GAME_ADD', data)
        }
        const rcv_room_invited = (data: any) => {
            this.sync_callback('ROOM_INVITED', data)
        } 


        const conn_state_change = (state: WSConnectState) => {
            switch (state) {
                case "CONNECTED":
                    if (isLoggedIn()) {
                        this.login()
                    }
                    break
                case "CLOSED":
                    this.set_status(HallStatus.OFFLINE)
                    break
                case "CONNECTING":
            }
        }

        this.conn = useConnector()
        this.conn.conn.addListener('LOGIN_ACK', rcv_login_ack)
        this.conn.conn.addListener('MATCH_START', rcv_match_start)
        this.conn.conn.addListener('MATCH_ENTER', rcv_match_enter)

        // SYNC CALLBACK
        this.conn.conn.addListener('POS_SYNC', rcv_pos_sync)
        this.conn.conn.addListener('SCORE_SYNC', rcv_score_sync)
        this.conn.conn.addListener('ANSWER_RESULT', rcv_answer_result)
        this.conn.conn.addListener('CHAT_MSG', rcv_chat_msg)
        this.conn.conn.addListener('GAME_END', rcv_game_end)
        this.conn.conn.addListener('ITEM_USED', rcv_item_used)
        this.conn.conn.addListener('ROOM_REFRESH', rcv_romm_refresh)
        this.conn.conn.addListener('HP_CHANGE', rcv_hp_change)
        this.conn.conn.addListener('GAME_ADD', rcv_game_add)
        this.conn.conn.addListener('ROOM_INVITED', rcv_room_invited)

        // OFFLINE EVENT
        this.conn.registerStateChangeEvent(conn_state_change)
        if (this.conn.state == 'CONNECTED') {
            if (isLoggedIn()) {
                this.login()
            }
        }

        this.game = useGameStore()

        this.router = useRouter()
    }

    private set_status(new_status: HallStatus) {
        this.status = new_status
        console.log(`now status = ${this.status}`)
        if (this.state_update_callback) {
            this.state_update_callback(new_status)
        }
    }

    login() {

        if (this.status != HallStatus.OFFLINE) {
            throw 'Not in OFFLINE status. The log in request has been cancelled.'
        }

        const token = localStorage.getItem('token')

        if (!token) {
            throw 'Token is not set. Cannot send login request to WSServer.'
        }

        const login_req: LoginRequestData = {
            token: token
        }
        
        this.set_status(HallStatus.LOGGING_IN)

        this.conn.conn.send('LOGIN_REQ', login_req)

        // message.loading({content: "正在向服务器发送登录请求...", key: 'hall_login', duration: 0})

    }

    setMsgToClose(msg: MessageType) {
        if (this.msgToClose) {
            this.msgToClose()
        }
        this.msgToClose = msg
    }

    match_request(type: number) {
        if (this.status != HallStatus.ONLINE) {
            throw 'Not in ONLINE status. The match request has been cancelled.'
        }

        this.conn.conn.send('MATCH_REQ', {
            type: type
        }, (data) => {
            message.error(data.msg, 2).then(() => {
                this.router.go(0)
            })
        })

    }


    quit_settlement() {
        this.set_status(HallStatus.ONLINE)
    }

    send_submit_id(submit_id: string) {
        this.conn.conn.send('ANSWER_SUBMIT', {
            task_no: 0,
            submit: submit_id
        })
    }

    logout() {
        this.conn.conn.close()
        this.set_status(HallStatus.OFFLINE)
    }

    pos_update(row: number, col: number, total_rows: number) {
        this.conn.conn.send('POS_UPDATE', {
            row: row,
            col: col,
            total_rows: total_rows
        })
    }

    chat_req(type: 'global' | 'team', message: string) {
        this.conn.conn.send('CHAT_REQ', {
            type: type,
            message: message
        })
    }

    answer_refresh(submit_id: string) {
        this.conn.conn.send('ANSWER_REFRESH', {
            submit_id: submit_id
        })
    }

    surrender() {
        this.conn.conn.send('SURRENDER', {})
    }

    use_item(type: string = 'ink') {
        this.conn.conn.send('ITEM_SEND', {
            type: type
        })
    }

    room_enter(roomid: number) {
        if (this.status != HallStatus.ONLINE) {
            throw 'Not in ONLINE status. The room enter request has been cancelled.'
        }

        this.conn.conn.send('ROOM_REQUEST', {
            roomid: roomid,
            type: 'in'
        })
    }
    room_leave(roomid: number) {
        if (this.status != HallStatus.IN_ROOM) {
            throw 'Not in IN_ROOM status. The room leave request has been cancelled.'
        }

        this.conn.conn.send('ROOM_REQUEST', {
            roomid: roomid,
            type: 'out'
        })

        this.set_status(HallStatus.ONLINE)
    }

    room_start(roomid: number) {
        this.conn.conn.send('ROOM_START', {
            roomid: roomid
        })
    }

    room_refresh(roomid: number) {
        this.conn.conn.send('ROOM_GET_INFO', {
            roomid: roomid
        })
        this.set_status(HallStatus.IN_ROOM)
    }

    room_invite(roomid: number, friendid: number) {
        this.conn.conn.send('ROOM_INVITE', {
            roomid: roomid,
            friendid: friendid
        })
    }
}