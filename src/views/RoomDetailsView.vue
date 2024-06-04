<template>
  <div id="app">
      <Stars/>
      <div class="waiting-room">
          <div class="waiting-title">
              <h2>当前房间：{{ roomInfo.name }}</h2>
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
import { useRoute } from 'vue-router';
import { generateGet } from '@/utils/protocol';
import Stars from '@/components/Stars.vue';
  // import LottieVuePlayer from '@lottiefiles/vue-lottie-player';

const route = useRoute();

function getPageRoomId(params: string | string[]) {
  return params ? (Array.isArray(params) ? params[0] as string : params as string) : '';
}

const roomId = ref(getPageRoomId(route.params.id))
const curUserId = ref(localStorage.getItem('userId'))
const roomInfo = ref<any>({name: ''})
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

const initRoomInfo = async () => {
  console.log('roomId', roomId.value);

  generateGet(`/api/room/id?id=${roomId.value}`).then((res) => {
    if (res.data.status === 0) {
      roomInfo.value = res.data.data;
      console.log('roomInfo', roomInfo.value.name);
    } else {
      console.log(res.data.msg);
    }
  }).catch((err) => {
    console.log(err);
  });
};

initRoomInfo();
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

