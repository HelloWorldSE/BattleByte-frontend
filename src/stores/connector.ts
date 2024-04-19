import { ConnectionClient } from "@/core/comm/conn";
import { defineStore } from "pinia";

export const useConnector = defineStore('connector', () => {
    const conn = new ConnectionClient(`ws://${location.host}/socket`)

    return {
        conn
    }
})