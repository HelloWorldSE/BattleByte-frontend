<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalReconnectingMessage from './components/websocket/GlobalReconnectingMessage.vue';
import { useConnector } from './stores/connector';
import { useHallState } from './stores/hall';

// keep hallstore & conn store alive from the startup
useConnector()
useHallState()

</script>

<template>
  <GlobalReconnectingMessage/>

  <RouterView />
</template>
