import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrawerState = defineStore('drawers', () => {
    const friendOpen = ref(false)
    const settingsOpen = ref(false)

    return {
        friendOpen,
        settingsOpen
    }
})