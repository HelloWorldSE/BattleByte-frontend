import { defineStore } from "pinia";
import { useConnector } from "./connector";
import { Hall, HallStatus } from "@/core/game/hall";
import { ref, watch } from "vue";
import type { 
    AcChangeData,
    ChatMsgData, FriendInvitationData, GameAddData, HpChangeData, 
    ItemUsedData, PosSyncData, 
    RoomInvitedData, RoomRefreshData } from "@/core/comm/interfaces";
import { useRoomState } from "./room";
import { useGameStore } from "./game";
import { openMsgBox, openNotification } from "@/components/next-ui/notifications/notifications";

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
    const rcv_ac_change = ref<(data: AcChangeData) => void>((data) => {
        if (gameState.match_info) {
            gameState.match_info.acMap[data.change_id] = data.ac
        }
    })
    const rcv_game_add = ref<(data: GameAddData) => void>((data) => {
        if (gameState.match_info) {
            gameState.match_info.info.currentQuestion = data.currentQuestion
        }
    })
    const rcv_room_invited = ref<(data: RoomInvitedData) => void>((data) => {
        openMsgBox(data.friendid, data.roomid)
    })
    const rcv_friend_invitation = ref<(data: FriendInvitationData) => void>((data) => {
        openNotification(data.name, '想添加您为好友', data.friendid)
    })

    const handlers_after_login: (()=>void)[] = []
    const append_after_login = (handler: () => void) => {
        handlers_after_login.push(handler)
    }


    const hall = new Hall(
        (val) => {
            hallStatus.value = val
            if (val == HallStatus.ONLINE) {
                handlers_after_login.forEach((h) => {
                    h()
                })
                handlers_after_login.splice(0, handlers_after_login.length)
            }
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
                rcv_room_invited.value(data)
            } else if (type == 'FRIEND_INVITATION') {
                rcv_friend_invitation.value(data)
            } else if (type == 'AC_CHANGE') {
                rcv_ac_change.value(data)
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
        item_used_callback: rcv_item_used,
        append_after_login
    }
})