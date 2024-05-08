<script setup lang="ts">
import { getRandomizedGifDataUrl } from '@/utils/loading';
import { watch, ref } from 'vue';

const props = defineProps<{
    show: boolean
}>()

const img_src = ref("")

watch(() => props.show,
(val) => {
    if (val) {
        getRandomizedGifDataUrl('/tomatina-apunt-c.gif').then((url) => {
            img_src.value = url
            _show.value = true
        })
    } else {
        _show.value = false
    }
}, {
    immediate: true
})

const _show = ref(false)
</script>

<template>
    <div class="item-pos">
        <Transition>
            <img :src="img_src" class="item" v-if="_show" alt="item" ref="img"/>
        </Transition>
    </div>
</template>

<style scoped>
.item-pos {
    position: absolute;
    width: 0;
    height: 0;
    overflow: visible;
    z-index: 1001;
}
.item {
    transform: translate(-50%, -50%);
}
</style>