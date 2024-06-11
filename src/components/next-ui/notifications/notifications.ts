import { useNotifications } from "@/stores/notifications"

export const openMsgBox = (friend_id: number, room_id: number) => {
    useNotifications().openMsgBox(friend_id, room_id)
}

import { notification } from 'ant-design-vue';
import { h } from "vue";
import BurningCircle from '@/components/next-ui/notifications/BurningCircle.vue'
import Notification from '@/components/next-ui/notifications/Notification.vue'
import { useSoundFX } from "@/stores/soundfx";

let id = 0

export const openNotification = (title: string, description: string, extraInfo: any, duration: number = 3) => {

    const newBurningCircle = () => h(BurningCircle, {duration: duration * 1000})
    const key = `BB_NOTIF_${id++}`

    useSoundFX().play('notification')

    notification.open({
        message: h(Notification, {title: title, description, duration, _key: key, newBurningCircle, extraInfo}),
        key: key,
        description: () => {},
        style: {
          width: '22rem',
          height: '8rem',
          borderRadius: 0
          // marginLeft: `${335 - 600}px`,
        },
        top: '5.5rem',
        duration: duration,
        closeIcon: newBurningCircle(), 
    });
}