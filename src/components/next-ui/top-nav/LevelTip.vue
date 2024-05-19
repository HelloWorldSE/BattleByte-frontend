<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    title: string,
    level: 'gold' | 'silver' | 'copper'
}>()

const color = computed(() => {
    switch (props.level) {
        case 'gold':
            return '#f3da00'
        case 'silver':
            return '#000000'
        case 'copper':
            return '#000000'
    }
})
</script>

<template>
    <span :style="{color: color, borderColor: color}">{{ props.title }}</span>
</template>

<style scoped>
span {
    font-size: 0.9rem;
    border: 1px solid black;
    border-radius: 5px;
    padding: 0 2px;
    opacity: 0.96;
}
</style>