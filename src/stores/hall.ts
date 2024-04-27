import { defineStore } from "pinia";
import { useConnector } from "./connector";
import { Hall, HallStatus } from "@/core/game/hall";
import { ref, watch } from "vue";

export const useHallState = defineStore('hall_state', () => {
    const hallStatus = ref<HallStatus>(HallStatus.OFFLINE)

    const hall = new Hall(
        (val) => {
            hallStatus.value = val
        }
    )
    
    return {
        hall,
        hallStatus
    }
})