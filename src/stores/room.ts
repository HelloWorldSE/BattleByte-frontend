import type { RoomRefreshData } from "@/core/comm/interfaces";
import { $undefined } from "@/utils/hand-mocker";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useRoomState = defineStore('room', () => {
    const roomInfo = ref<RoomRefreshData | undefined>(
        $undefined({
            roomid: 15,
            userid: [1, 2, 3, 4, 5, 6, 7],
            username: ['Player1', 'Player2', 'Player3', 'Player4', 'Player22', 'Player6', 'Player7'],
            avatarUrl: ['/logo.jpg', '/logo.jpg', '/logo.jpg', '/logo.jpg', '/logo.jpg', '/logo.jpg', '/logo.jpg']
        })
    )
    return {
        roomInfo
    }
})