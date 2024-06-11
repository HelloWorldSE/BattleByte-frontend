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
import SidePanelFriend from './components/next-ui/sidepanel/SidePanelFriend.vue';
</script>

<template>
  <GlobalReconnectingMessage/>
  <NotificationHolder/>
  <!--<BellTest :model-value="true"/>-->
  <div class="page">
    <TopNav />
    <div class="router-wrapper">
      <RouterView />
      <SidePanelFriend />
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
