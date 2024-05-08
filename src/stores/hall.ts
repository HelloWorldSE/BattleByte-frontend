import { defineStore } from "pinia";
import { useConnector } from "./connector";
import { Hall, HallStatus } from "@/core/game/hall";
import { ref, watch } from "vue";
import type { ChatMsgData, PosSyncData } from "@/core/comm/interfaces";

export const useHallState = defineStore('hall_state', () => {
    const hallStatus = ref<HallStatus>(HallStatus.OFFLINE)

    const rcv_chat_msg = ref<(data: ChatMsgData) => void>(()=>{})
    const rcv_answer_result = ref<(data: any) => void>(()=>{})
    const rcv_pos_sync = ref<(data: PosSyncData) => void>(()=>{})
    


    const hall = new Hall(
        (val) => {
            hallStatus.value = val
        },
        (type, data) => {
            if (type == 'CHAT_MSG') {
                rcv_chat_msg.value(data)
            } else if (type == 'ANSWER_RESULT') {
                rcv_answer_result.value(data)
            } else if (type == 'POS_SYNC') {
                rcv_pos_sync.value(data)
            }
        }
    )

    

    return {
        hall,
        hallStatus,
        chat_msg_callback: rcv_chat_msg,
        answer_result_callback: rcv_answer_result,
        pos_sync_callback: rcv_pos_sync
    }
})