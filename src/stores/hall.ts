import { defineStore } from "pinia";
import { useConnector } from "./connector";
import { Hall, HallStatus } from "@/core/game/hall";
import { ref, watch } from "vue";
import type { 
    ChatMsgData, GameAddData, HpChangeData, 
    ItemUsedData, PosSyncData, 
    RoomInvitedData, RoomRefreshData } from "@/core/comm/interfaces";
import { useRoomState } from "./room";
import { useGameStore } from "./game";

export const useHallState = defineStore('hall_state', () => {
    const hallStatus = ref<HallStatus>(HallStatus.OFFLINE)

    const roomState = useRoomState()
    const gameState = useGameStore()

    const rcv_chat_msg = ref<(data: ChatMsgData) => void>(()=>{})
    const rcv_answer_result = ref<(data: any) => void>(()=>{})
    const rcv_game_end = ref<(data: {result: 'win'|'lose'}) => void>(()=>{})
    const rcv_pos_sync = ref<(data: PosSyncData) => void>(()=>{})
    const rcv_item_used = ref<(data: ItemUsedData) => void>(()=>{})
    const rcv_room_refresh = ref<(data: RoomRefreshData) => void>((data)=>{
        roomState.roomInfo = data
    })
    const rcv_hp_change = ref<(data: HpChangeData) => void>((data) => {
        if (gameState.match_info) {
            gameState.match_info.hpMap[data.change_id] = data.hp
        }
    })
    const rcv_game_add = ref<(data: GameAddData) => void>((data) => {
        if (gameState.match_info) {
            gameState.match_info.info.currentQuestion = data.currentQuestion
        }
    })
    const rcv_room_invited = ref<(data: RoomInvitedData) => void>((data) => {
        
    })


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
            } else if (type == 'GAME_END') {
                rcv_game_end.value(data)
            } else if (type == 'ITEM_USED') {
                rcv_item_used.value(data)
            } else if (type == 'ROOM_REFRESH') {
                rcv_room_refresh.value(data)
            } else if (type == 'HP_CHANGE') {
                rcv_hp_change.value(data)
            } else if (type == 'GAME_ADD') {
                rcv_game_add.value(data)
            } else if (type == 'ROOM_INVITED') {

            }
        }
    )

    

    return {
        hall,
        hallStatus,
        chat_msg_callback: rcv_chat_msg,
        answer_result_callback: rcv_answer_result,
        pos_sync_callback: rcv_pos_sync,
        game_end_callback: rcv_game_end,
        item_used_callback: rcv_item_used
    }
})