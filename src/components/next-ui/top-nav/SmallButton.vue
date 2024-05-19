<script setup lang="ts">
import type { AntdIconType } from './d';

const props = defineProps<{
    icon: AntdIconType
}>()

const Icon: AntdIconType = props.icon

</script>

<template>
    <div class="button">
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