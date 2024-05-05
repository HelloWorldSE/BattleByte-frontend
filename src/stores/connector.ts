import { ConnectionClient, type WSConnectState } from "@/core/comm/conn";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export type { WSConnectState } from '@/core/comm/conn'

export const useConnector = defineStore('connector', () => {
    const conn = new ConnectionClient(`ws://${location.host}/socket`)

    const stateChangeListeners: ((value: WSConnectState)=>Promise<void>) [] = []

    const state = ref<WSConnectState>(conn.state)
    conn.onStateChange = (now_state: WSConnectState) => {
        console.log(`State changed to ${now_state}`)
        state.value = now_state
        stateChangeListeners.forEach((f) => {
            f(state.value)
        })
    }

    const registerStateChangeEvent = (listener: (state: WSConnectState)=>void) => {
        stateChangeListeners.push(async (value: WSConnectState) => {
            listener(value)
        })
    }

    const delayRef = ref(0)

    let decreaseTimeout: ReturnType<typeof setTimeout> | undefined = undefined
    
    const decrease = () => {
        delayRef.value--
        if (delayRef.value > 0) {
            decreaseTimeout = setTimeout(decrease, 1000)
        } else {
            decreaseTimeout = undefined
        }
    }

    conn.onRetry = (delaySec: number) => {
        if (decreaseTimeout) {
            clearTimeout(decreaseTimeout)
        }
        delayRef.value = delaySec
        decreaseTimeout = setTimeout(decrease, 1000)
    }


    return {
        conn,
        registerStateChangeEvent,
        delay: delayRef,
        state
    }
})