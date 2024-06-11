<script setup lang="ts">
import { useSoundFX } from '@/stores/soundfx';
import type { AntdIconType } from './d';

const props = defineProps<{
    icon: AntdIconType
}>()

const emit = defineEmits<{
    click: []
}>()

const Icon: AntdIconType = props.icon

const soundfx = useSoundFX()
const click = () => {
    soundfx.play('topbar-switch')
    emit('click')
}

const hover = () => {
    soundfx.play('button-hover')
}

</script>

<template>
    <div class="button" @click="click" @mouseenter="hover">
        <Icon class="icon"/>
    </div>
</template>

<style scoped>
.button {
    width: 2.625rem;
    height: 2.625rem;
    border-radius: 0.58rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
.button:hover {
    background-color: rgba(0,0,0,0.2);
}
.button:active {
    background-color: rgba(0,0,0,0.4);
}
.icon {
    font-size: 1.76rem;
    color: rgba(255,255,255,0.45)
}
</style>