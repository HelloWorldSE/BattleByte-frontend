// 这也太抽象了，vueuse的库，类型注解一直是无法使用的状态，居然连issue都没有
// @ts-ignore
import { useSound } from "@vueuse/sound";
import { defineStore } from "pinia";


import soundAssets from '@/assets/sounds/soundfx.mp3'


const spriteMap = {
    'button-clicked': [0, 1091],
    'game-lose': [1093, 3834],
    'game-win': [4965, 3542],
    'match-start': [8533, 1529],
    'reserved-1': [10069, 2938],
    'reserved-2': [14049, 1025],
    'notification': [14052, 1397],
    'submit-accepted': [15453, 776],
    'submit-wrong': [16255, 221],
    'tomato-threw': [16505, 1331],
    'tomato-thrown': [18193, 1375],
    'topbar-switch': [19597, 1362],
    'button-hover': [20961, 79]
}

type FXID = keyof typeof spriteMap

export const useSoundFX = defineStore('soundfx', () => {
    const { play } = useSound(soundAssets, {
        sprite: spriteMap
    })

    return {
        _play: play as (param? :{id: FXID}) => void, 
        play: (id: FXID) => play({id})
    }    
})