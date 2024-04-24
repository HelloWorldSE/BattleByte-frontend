<script setup lang="ts">
import { watch } from 'vue';
import { initMessage } from './messageBase';
import type { ReconnectMessageType } from './messageBase'


const props = defineProps<{
    show: boolean,
    type: ReconnectMessageType,
    text: string
}>()

const [hide, show] = initMessage(props.type, () => props.text)


const updateShow = (val: boolean) => {
    if (val) {
        show()
    } else {
        hide()
    }
}

watch(() => props.show,
    updateShow
)

</script>

<template>
</template>