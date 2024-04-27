// 大厅

import type { LoginRequestData, LoginResultData, MatchEnterData } from "@/core/comm/interfaces"
import { useConnector } from "@/stores/connector"
import { useGameStore } from "@/stores/game"
import { message } from "ant-design-vue"
import type { MessageType } from "ant-design-vue/es/message"
import { useRouter } from "vue-router"

export enum HallStatus {
    OFFLINE,
    LOGGING_IN,
    ONLINE,
    MATCHING,
    IN_MATCH,
    SETTLING
}

export class Hall {

    status: HallStatus = HallStatus.OFFLINE
    conn: ReturnType<typeof useConnector>
    game: ReturnType<typeof useGameStore>

    router: ReturnType<typeof useRouter>

    msgToClose: MessageType | undefined

    constructor(private state_update_callback?: (new_value: HallStatus) => void) {

        // use arrow function to avoid 'this'-bindings
        const rcv_login_ack = (data: LoginResultData) => {
            this.set_status(HallStatus.ONLINE)
            message.success({content: "登录成功！", key: 'hall_login', duration: 1})
        }
        const rcv_match_start = () => {
            this.set_status(HallStatus.MATCHING)
            this.game.match_info = undefined
            message.loading({content: "正在匹配...", key: 'hall_match', duration: 0})
        }
        const rcv_match_enter = (data: MatchEnterData) => {
            this.set_status(HallStatus.IN_MATCH)
            this.game.match_info = data
            message.loading({content: "匹配成功！", key: 'hall_match', duration: 1})
            this.router.push('/contest')
        }
        const rcv_match_end = () => {
            this.set_status(HallStatus.SETTLING)
            message.success('比赛已结束！', 1)
        }

        this.conn = useConnector()
        this.conn.conn.addListener('LOGIN_ACK', rcv_login_ack)
        this.conn.conn.addListener('MATCH_START', rcv_match_start)
        this.conn.conn.addListener('MATCH_ENTER', rcv_match_enter)
        this.conn.conn.addListener('MATCH_END', rcv_match_end)

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
        const token = localStorage.getItem('token')

        if (!token) {
            throw 'Token is not set. Cannot send login request to WSServer.'
        }

        const login_req: LoginRequestData = {
            token: token
        }
        
        this.set_status(HallStatus.LOGGING_IN)

        this.conn.conn.send('LOGIN_REQ', login_req)

        message.loading({content: "正在向服务器发送登录请求...", key: 'hall_login', duration: 0})

    }

    setMsgToClose(msg: MessageType) {
        if (this.msgToClose) {
            this.msgToClose()
        }
        this.msgToClose = msg
    }

    match_request() {

        this.conn.conn.send('MATCH_REQ', {
            type: 1
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
}