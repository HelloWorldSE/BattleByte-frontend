<template>
  <div id="app">
      <div class="star" v-for="i in 400" :key="i">
      </div>
      <div class="waiting-room">
          <div class="waiting-title">
              <h2>当前房间：房间号</h2>
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
                  <div :class="index === 0 ? 'self-name' : 'player-name'">{{ player.username }}</div>
              </Tooltip>
              </template>
          </div>
          <div class="waiting-animation">
                  <Vue3Lottie
                  width="300px"
                  height="300px"
                  :speed=1
                  loop
                  :animation-data="LottieJson">
                  </Vue3Lottie>
          </div>
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
#app {
background-color: black; /* 设置背景为黑色 */
min-height: 100vh; /* 至少为视口的100%高度 */
display: flex;
flex-direction: column; /* 如果你需要垂直布局 */
align-items: stretch; /* 使子元素填满容器宽度 */
}

.waiting-room {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  /* background-color: #f0f2f5; */
}

.waiting-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
  color: white;
  text-align: center;
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

.self-name {
  font-size: 20px;
  font-weight: bold;
  margin-top: 8px;
  text-align: center;
  color: white;
  /* animation: float 3s ease-in-out infinite; */
}

.player-name {
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
  color: white;
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

<style lang="scss">
.star {
position: absolute;
width: 1px;
height: 1px;
border-radius: 1px;
background: #fff;
@for $i from 1 through 400 {
  &:nth-child(#{$i}) {
    $randomOpacity: (random(95 + 1) + 5 - 1) / 100;
    left: random(1000) / 10 * 1% - 1%;
    bottom: random(1000) / 10 * 1% - 1%;
    opacity: $randomOpacity;
    box-shadow: 0 0 6px 1px rgba(255, 255, 255, $randomOpacity);
  }
}
}
</style>