import { useNotifications } from "@/stores/notifications"

export const openMsgBox = (friend_id: number, room_id: number) => {
    useNotifications().openMsgBox(friend_id, room_id)
}
