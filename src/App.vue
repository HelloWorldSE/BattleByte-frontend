<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import GlobalReconnectingMessage from './components/websocket/GlobalReconnectingMessage.vue';
import { useConnector } from './stores/connector';
import { useHallState } from './stores/hall';

import TopNav from '@/components/next-ui/top-nav/TopNav.vue';

// keep hallstore & conn store alive from the startup
useConnector()
useHallState()

import NotificationHolder from './components/next-ui/notifications/NotificationHolder.vue';
import FriendListDrawer from './components/FriendListDrawer.vue';
</script>

<template>
  <GlobalReconnectingMessage/>
  <NotificationHolder/>
  <div class="page">
    <TopNav />
    <div class="router-wrapper">
      <RouterView />
    </div>
    
  </div>
</template>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.router-wrapper {
  flex-grow: 1;
  min-height: 23.125rem;
  /*height: 100%;*/
  /*position: relative;*/
}
</style>
