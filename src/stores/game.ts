import type { HpMap, MatchInfo, PosMap } from "@/core/game/game";
import { $undefined } from "@/utils/hand-mocker";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('game', () => {
    const match_info = ref<MatchInfo | undefined>($undefined({
        "playerMap":{"0":15,"1":12},
        "info":{"questionId": [26, 25], 'currentQuestion':1},
        hpMap: {
            26: 100,
            25: 10
        },
        acMap: {
            26: 0,
            25: 1
        }
    }))

    const submit_list = ref<string[]>([])

    const posMap = ref<PosMap>({})

    return {
        match_info,
        submit_list,
        posMap
    }
})
