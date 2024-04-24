<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalReconnectingMessage from './components/websocket/GlobalReconnectingMessage.vue';

</script>

<template>
  <GlobalReconnectingMessage/>

  <RouterView />
</template>
