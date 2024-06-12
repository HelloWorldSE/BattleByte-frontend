<script setup lang="ts">

const props = defineProps<{
    speaker: string,
    msg: string
}>()

</script>

<template>
<div class="msg">
    <span>{{speaker}}:</span>
    <span>{{msg}}</span>
</div>
</template>

<style scoped>
/* .msg {
  position: absolute;
  z-index: 9999;
} */

#span{
  color: red;
}

</style>
