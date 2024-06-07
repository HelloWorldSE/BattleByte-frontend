<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import { ref } from 'vue'

const props = defineProps<{
    animationData: any,
    local?: boolean,
    background?: boolean
}>()

const wrapper_classes = ref<string[]>([])

if (props.local) {
    wrapper_classes.value.push('local')
} else {
    wrapper_classes.value.push('global')
}

if (props.background) {
    wrapper_classes.value.push('bg')
}

</script>

<template>
    <div class="wrapper" :class="wrapper_classes">
        <Vue3Lottie :animation-data="props.animationData" height="25rem" width="25rem" />
    </div>
</template>

<style scoped>
.wrapper {
    z-index: 1009;

    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
}
.wrapper.global {
    position: fixed;
    inset: 0;
}
.wrapper.local {
    width: 100%;
    height: 100%;
}
.wrapper.bg {
    background: #fff;
}
</style>