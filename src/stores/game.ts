import type { MatchInfo, PosMap } from "@/core/game/game";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('game', () => {
    const match_info = ref<MatchInfo>({"playerMap":{"0":14,"1":10},"info":{"questionId":26}})

    const submit_list = ref<string[]>([])

    const posMap = ref<PosMap>({})

    return {
        match_info,
        submit_list,
        posMap
    }
})
