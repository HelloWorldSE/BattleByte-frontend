<script setup lang="ts">
import animationLoading from '@/assets/Animation-loading.json'
import LottiePage from '@/components/next-ui/loading/LottiePage.vue'
</script>

<template>
<LottiePage :animation-data="animationLoading" background />
</template>