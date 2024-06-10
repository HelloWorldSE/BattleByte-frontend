<script setup lang="ts">
import { useSoundFX } from '@/stores/soundfx';

const props = defineProps<{
    title: string,
    primary?: boolean
}>()

const emit = defineEmits<{
    click: []
}>()

const soundfx = useSoundFX()
const hover = () => {
    soundfx.play('button-hover')
}
const click = () => {
    soundfx.play('button-clicked')
    emit('click')
}
</script>

<template>
    <div class="button" :class="props.primary?'primary':undefined"
        @mouseenter="hover" @click="click">
        <span>
            {{ props.title }}
        </span>
    </div>
</template>

<style scoped>
.button {
    width: 10rem;
    height: 2.375rem;
    background-color: #444;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
        user-select: none;

        color: white;
        font-weight: bold;
        
        text-align: justify; 

        font-size: 1rem;

        width: 3.5rem;
        height: 1em;
        line-height: 1em;
    }
    span:after {
        content: '';
        width: 100%;
        display: inline-block;
    }
}
.button.primary {
    background-color: #cc2828;
}
.button:hover {
    background-color: #777;
}
.button:active {
    background-color: #444;
}
</style>