import { defineStore } from "pinia";
import { useConnector } from "./connector";
import { Hall, HallStatus } from "@/core/game/hall";
import { ref, watch } from "vue";
import type { ChatMsgData } from "@/core/comm/interfaces";

export const useHallState = defineStore('hall_state', () => {
    const hallStatus = ref<HallStatus>(HallStatus.OFFLINE)

    const rcv_chat_msg = ref<(data: ChatMsgData) => void>(()=>{})


    const hall = new Hall(
        (val) => {
            hallStatus.value = val
        },
        (type, data) => {
            if (type == 'CHAT_MSG') {
                rcv_chat_msg.value(data)
            }
        }
    )

    

    return {
        hall,
        hallStatus,
        chat_msg_callback: rcv_chat_msg
    }
})