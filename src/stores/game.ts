import type { HpMap, MatchInfo, PosMap } from "@/core/game/game";
import { $undefined } from "@/utils/hand-mocker";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGameStore = defineStore('game', () => {
    const match_info = ref<MatchInfo | undefined>($undefined({
        "playerMap":{"0":15,"1":12},
        "info":{"questionId": [1, 2, 3, 4, 5], 'currentQuestion':0},
        hpMap: {
            15: 100,
            12: 10
        },
        acMap: {
            15: 0,
            12: 1
        },
        nameMap: {
            "0": "xzr",
            "1": "dbd"
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
