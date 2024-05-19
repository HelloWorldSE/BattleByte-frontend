<script setup lang="ts">
const props = defineProps<{
    clipId: string,
    offset: string,
    title: string
}>()
</script>

<template>

    <div class="button" :style="{clipPath: `url(#${props.clipId})`, marginLeft: props.offset}">
        <slot></slot>
        <div class="text-bg">
            <span class="text">{{props.title}}</span>
        </div>
    </div>

</template>

<style scoped>
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    clip-path: url(#clip-side);
    background-color: none;
    position: relative;
    margin-top: -0.625rem;
    margin-left: -2.5rem;
    z-index: 0;

    width: 15.6875rem;
    height: 5.125rem;

    >svg {
        position: absolute;
    }
}
.text-bg {
    position: absolute;
    inset: 0;
    padding-top: 0.7rem;
    
    
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.text-bg:hover {
    background-color: rgba(217, 217, 217, 0.8);
}

span.text {
    color: rgba(255, 255, 255, 0.85);
    font-size: 1.25rem;
    text-align-last: justify;
    width: 30%;
    user-select: none;
}


</style>