import type { MatchInfo } from "@/core/game/game";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('game', () => {
    const match_info = ref<MatchInfo>()
    
    const submit_list = ref<string[]>([])

    return {
        match_info,
        submit_list
    }
})