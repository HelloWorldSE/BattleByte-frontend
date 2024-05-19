<script setup lang="ts">
import SideButton from './SideButton.vue';
import SideButtonSlash from './SideButtonSlash.vue';

</script>

<template>

    <SideButton clip-id="clip-side-1" offset="-1.70rem" title="生涯">
        <svg width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-side-1" clipPathUnits="objectBoundingBox">
                <!--251, 72-->
                <path transform="scale(0.0039840637, 0.0138888889)" d="M250.5 -10L217.345 60.5417C214.04 67.5375 206.997 72 199.26 72H0.268555L25.5187 18.5417C31.7853 5.27456 22.1072 -10 7.43453 -10H207H250.5Z" fill="#D9D9D9"/>
            </clipPath>
        </svg>
    </SideButton>

    <SideButtonSlash />

    <SideButton clip-id="clip-side-2" offset="-3.1rem" title="题库">
        <svg width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip-side-2" clipPathUnits="objectBoundingBox">
                <!--251, 72-->
                <path transform="scale(0.0039840637, 0.0138888889)" fill-rule="evenodd" clip-rule="evenodd" d="M217.076 60.5418L250.231 -10H49.5L16.3446 60.5417C13.2952 66.9978 7.06174 71.2964 0.0372282 71.9212L0 72H198.992C206.729 72 213.772 67.5376 217.076 60.5418Z" fill="#D9D9D9"/>
            </clipPath>
        </svg>
    </SideButton>

    <SideButtonSlash />

</template>