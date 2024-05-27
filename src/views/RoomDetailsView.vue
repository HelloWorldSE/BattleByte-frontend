<template>
    <div class="waiting-room">
      <div class="waiting-title">
        <h2>正在等待其他玩家加入...</h2>
      </div>
      <div class="player-list">
        <template v-for="(player, index) in onlinePlayers" :key="player.username">
          <Tooltip :title="player.username" placement="top">
            <Avatar :src="player.avatarUrl"
            :class="[
              'player-avatar',
              index === 0 ? 'self-avatar' : 'other-avatar',
              index === 0 ? 'animate__animated animate__pulse' : ''
            ]" />
            <div class="player-name">{{ player.username }}</div>
          </Tooltip>
        </template>
      </div>
      <div class="waiting-animation">
            <Vue3Lottie
            width="300px"
            height="300px"
            speed="1"
            loop
            :animation-data="LottieJson">

            </Vue3Lottie>
      </div>


    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { Spin, Avatar, Tooltip } from 'ant-design-vue';
  import 'animate.css';
  import LottieJson from '@/assets/Animation_fighting.json';
  import { Vue3Lottie } from 'vue3-lottie'
    // import LottieVuePlayer from '@lottiefiles/vue-lottie-player';
  
  interface Player {
    username: string;
    avatarUrl: string;
  }
  
  const onlinePlayers = ref<Player[]>([
    { username: 'Player1', avatarUrl: '/logo.jpg' },
    { username: 'Player2', avatarUrl: '/logo.jpg' },
    { username: 'Player3', avatarUrl: '/logo.jpg' },
    { username: 'Player4', avatarUrl: '/logo.jpg' },
    { username: 'Player5', avatarUrl: '/logo.jpg' },
    { username: 'Player6', avatarUrl: '/logo.jpg' },
  ]);
  </script>
  
  <style scoped>
  .waiting-room {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
  }
  
  .waiting-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
  }
  
  .player-list {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }
  
  .player-avatar {
    margin: 0 32px;
    width: 64px;
    height: 64px;
  }

  .player-name {
    font-size: 14px;
    margin-top: 8px;
    animation: float 3s ease-in-out infinite;
  }
  
  .self-avatar {
    width: 128px;
    height: 128px;
    animation: pulse 2s infinite;
  }
  
  .other-avatar {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
  </style>