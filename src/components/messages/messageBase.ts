import { message } from 'ant-design-vue';
import type { MessageType } from 'ant-design-vue/es/message';
import type { Ref } from 'vue';

export type ReconnectMessageType = 'LOADING' | 'SUCCESS' | 'INFO' | 'ERROR' | 'WARNING'

export function initMessage(type: ReconnectMessageType, text: Ref<string> | string | (() => string), delay: number = 0) {
    
    const apiFunc = (() => {
        switch (type) {
            case 'LOADING':
                return message.loading
            case 'SUCCESS':
                return message.success
            case 'INFO':
                return message.info
            case 'ERROR':
                return message.error
            case 'WARNING':
                return message.warning
        }
    }) ()

    let tipWindow: MessageType | undefined

    const show = () => {
        hide()

        if (typeof text == 'string') {
            tipWindow = apiFunc(text, delay)
        } else if (typeof text == 'function') {
            tipWindow = apiFunc({content: text, duration: delay})
        } else {
            tipWindow = apiFunc({content: () => text.value}, delay)
        }
    }

    const hide = () => {
        if (tipWindow) {
            tipWindow()
            tipWindow = undefined
        }
    }

    return [hide, show]
}