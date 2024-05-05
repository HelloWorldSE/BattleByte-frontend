<script setup lang="ts">

const props = defineProps<{
    speaker: string,
    msg: string
}>()

</script>

<template>
<div>
    <span>{{speaker}}:</span>
    <span>{{msg}}</span>
</div>
</template>