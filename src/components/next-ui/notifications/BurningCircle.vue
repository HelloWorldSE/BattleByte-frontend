<script setup lang="ts">
import { ref } from 'vue';

const closing = ref<{
    '--a': string
} | {
    'background': 'none'
}>({'--a': '360deg'})

const props = defineProps<{duration: number}>()
// Force it not to response to reactive status
const full_time = props.duration;
const start_time = performance.now();

const inter = setInterval(()=> {
    const deg = 360 - (performance.now() - start_time) / full_time * 360
    if ('--a' in closing.value) {
        closing.value['--a'] = `${deg}deg`
    }
    if (deg < 0) {
        closing.value = {
            background: 'none'
        }
        clearInterval(inter)
    }
}, 10)
</script>

<template>
<div class="arc" :style="closing"></div> 
</template>

<style scoped>
.arc {
  --b: 3px; /* the boder thickness */
  --a: 360deg; /* control the progression */
  
  width: 20px;
  aspect-ratio: 1;
  padding: var(--b);
  border-radius: 50%;
  background: rgba(255,255,255,.45);
  --_g:/var(--b) var(--b) no-repeat
    radial-gradient(50% 50%,#000 97%,#0000);
  mask: top var(--_g),
    calc(50% + 50%*sin(var(--a))) 
    calc(50% - 50%*cos(var(--a))) var(--_g),
    linear-gradient(#0000 0 0) content-box intersect,
    conic-gradient(#000 var(--a),#0000 0);

}
</style>