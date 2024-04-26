// 大厅

import type { LoginRequestData, LoginResultData } from "@/core/comm/interfaces"
import { useConnector } from "@/stores/connector"
import { ref, type Ref } from "vue"

enum HallStatus {
    OFFLINE,
    LOGGING_IN,
    ONLINE,
    MATCHING,
    IN_MATCH,
    SETTLING
}

export class Hall {

    status: Ref<HallStatus> = ref(HallStatus.OFFLINE)
    conn: ReturnType<typeof useConnector>

    constructor() {
        this.conn = useConnector()
        this.conn.conn.addListener('LOGIN_ACK', this.rcv_login_ack)
        this.conn.conn.addListener('MATCH_START', this.rcv_match_start)
        this.conn.conn.addListener('MATCH_ENTER', this.rcv_match_enter)
        this.conn.conn.addListener('MATCH_END', this.rcv_match_end)
    }

    private rcv_login_ack(data: LoginResultData) {
        this.status.value = HallStatus.ONLINE
    }

    login() {
        const token = localStorage.getItem('token')

        if (!token) {
            throw 'Token is not set. Cannot send login request to WSServer.'
        }

        const login_req: LoginRequestData = {
            token: token
        }

        this.status.value = HallStatus.LOGGING_IN

        this.conn.conn.send('LOGIN_REQ', login_req)
    }

    match_request() {

        this.conn.conn.send('MATCH_REQ', {
            type: 1
        })

    }

    private rcv_match_start() {
        this.status.value = HallStatus.MATCHING

    }

    private rcv_match_enter() {
        this.status.value = HallStatus.IN_MATCH

    }

    private rcv_match_end() {
       this.status.value = HallStatus.SETTLING
    }

    quit_settlement() {
        this.status.value = HallStatus.ONLINE
    }

    send_submit_id(submit_id: string) {
        this.conn.conn.send('ANSWER_SUBMIT', {
            task_no: 0,
            submit: submit_id
        })
    }

    logout() {
        this.conn.conn.close()
        this.status.value = HallStatus.OFFLINE
    }
}