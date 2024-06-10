import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type MsgBoxStatus = {
    key: string,
    friend_id: number,
    room_id: number
}

export const useNotifications = defineStore('notifications', () => {
    const msgBoxes = ref<MsgBoxStatus[]>([])


    const openMsgBox = (friend_id: number, room_id: number) => {
        msgBoxes.value.push({
            key: `${friend_id}:${room_id}`,
            friend_id: friend_id,
            room_id: room_id
        })
    }

    return {
        _msgBoxes: msgBoxes,
        openMsgBox
    }
})