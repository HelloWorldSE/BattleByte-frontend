<script setup lang="ts">
</script>

<template>

    <div class="button">
        <svg width="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <clipPath id="clip" clipPathUnits="objectBoundingBox">
                <path id="border" transform="scale(0.0028653295, 0.0094339623)" d="M20.5655 0C5.89276 0 -3.78528 15.2746 2.48128 28.5418L33.6554 94.5418C36.9597 101.538 44.0026 106 51.7396 106H297.26C304.997 106 312.04 101.538 315.345 94.5418L346.519 28.5418C352.785 15.2746 343.107 0 328.435 0H20.5655Z"/>
            </clipPath>
        </svg>
        <div class="text-bg">
            <span class="text">对战</span>
        </div>
    </div>

</template>

<style scoped>
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    clip-path: url(#clip);
    background-color: #cc2828;
    position: relative;
    margin-top: -0.625rem;
    z-index: 1;

    width: 23.1875rem;
    height: 6.625rem;
    margin-bottom: -6.625rem;

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
    background-color: rgba(255, 255, 255, 0.05);
}

span.text {
    color: white;
    font-size: 2.25rem;
    font-weight: bold;
    text-align-last: justify;
    width: 34%;
    user-select: none;
}


</style>