<template>
  <div id="app">
      <Stars/>
      

      <div class="waiting-room">
          <div class="waiting-title">
              <h3>当前房间：{{ roomInfo.name }}，玩家数：{{ onlinePlayers.length }}</h3>
              <h3 v-if="onlinePlayers.length<2">正在等待其他玩家加入...</h3>
              <h3 v-if="onlinePlayers.length>=2 && curUserId !== roomInfo.uid">请等待房主开始游戏...</h3>
              <h3 v-if="onlinePlayers.length>=2 && curUserId === roomInfo.uid">可以开始游戏</h3>
              <!-- <button @click="hall.hall.room_leave(roomId as unknown as number)">exit (测试)</button> -->
          </div>
          <div class="player-list">
              <template v-for="(player, index) in onlinePlayers" :key="player.username">
              <Tooltip  placement="top" :title="player.userid === curUserId ? 'You' : player.username">
                  <Avatar :src="player.avatarUrl"
                  :class="[
                  'player-avatar',
                  curUserId === player.userid ? 'self-avatar' : 'other-avatar',
                  index === 0 ? 'animate__animated animate__pulse' : ''
                  ]" />
                  <div :class="[curUserId === player.userid ? 'self-name' : 'player-name']">{{ player.username }}</div>
              </Tooltip>
              </template>
          </div>
          <div class="waiting-animation">
                  <Vue3Lottie
                  width="200px"
                  height="200px"
                  :speed=1
                  loop
                  :animation-data="LottieJson">
                  </Vue3Lottie>
          </div>
          <Flex wrap="wrap" gap="large">
            <Button type="primary" size="large" @click="()=>{hall.hall.room_start(roomId as unknown as number)}"
            :disabled="!(onlinePlayers.length>=2)" :class="onlinePlayers.length>=2 ? undefined : 'disabled-btn'" v-if="curUserId==roomInfo.uid">开始游戏</Button>
            <Button type="primary" size="large" @click="()=>{confirmLeave=true}">退出房间</Button>
            <!-- <Button type="primary" size="large">踢人</Button> -->
            <Button type="primary" size="large" v-if="curUserId==roomInfo.uid" @click="openDrawer">查看题目</Button>

          </Flex>

      </div>
      <Modal v-model:open="confirmLeave" title="提示" @ok="handleOk" @cancel="handleCancel" centered>
          <p>确定要离开房间吗？</p>
      </Modal>
      <Drawer
          title="当前题单"
          placement="right"
          :visible="isDrawerOpen"
          @close="closeDrawer"
          :mask="false"
          width="600"
          :push="addProblemsDrawer == true ? {distance: 400} : {distance:600}"
      >
          <List>
            <!-- {{ allProblemsInfo }} -->
              <ListItem v-for="problem in showProblems" :key="problem._id">
                <Skeleton :loading="skeletonLoading">
                  <ListItemMeta
                      :title="problem.title"
                      :description="formatDescription(problem.description)"
                  >
                  </ListItemMeta>
                </Skeleton>
                  <template #actions>
                      <a key="check-problem" @click="openDetailsDrawer(problem._id)">查看</a>
                      <a key="delete-problem" @click="deleteProblem(problem._id)">删除</a>
                  </template>
              </ListItem>
              <template #loadMore>
                  <div
                      :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                  >
                      <Pagination @change="onLoadMore" :current="currentPage" :total="totalProblems" :pageSize="onePageSize" simple/>
                  </div>
              </template>
          </List>
          <Button type="primary" @click="()=>{addProblemsDrawer = true}">添加题目</Button>

          <AddProblems v-model:modelValue="addProblemsDrawer" v-model:existedProblems="allProblemsInfo" 
          @update="initGetProblems(pair.start, pair.end)" :gameId="roomInfo.gameId"/>

          <Drawer
            title="题目详情"
            placement="right"
            :visible="isDetailsDrawerOpen"
            @close="closeDetailsDrawer"
            :mask="false"
            width="600"
            :push="{distance: 600}"
          >
            <QuestionView :problem-id="curProblemId"
            v-if="curProblemId !== -1"/>
            <p v-else>没有选中题目！</p>

          </Drawer>
          
      </Drawer>





      <!-- <FloatButton shape="circle" type="primary" :style="{ left: '40px' }" @click="()=>{router.push('/rooms')}">
          <i class="anticon anticon-arrow-left"></i>
      </FloatButton> -->

      <!-- <FriendListDrawer userId="1" :modelValue="isDrawerOpen"/> -->
  </div>
  
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Spin, Avatar, Tooltip, Button, Flex, Drawer, Modal, message, FloatButton, List, ListItem,ListItemMeta, Pagination, Skeleton } from 'ant-design-vue';
import 'animate.css';
import LottieJson from '@/assets/Animation_fighting.json';
import { Vue3Lottie } from 'vue3-lottie'

import { useRoute, useRouter } from 'vue-router';
import { generateDelete, generateGet } from '@/utils/protocol';
import Stars from '@/components/Stars.vue';
import { useRoomState } from '@/stores/room';
import { pageIs } from '@/utils/pageis';
import { useHallState } from '@/stores/hall';
import { HallStatus } from '@/core/game/hall';
import QuestionView from './QuestionView.vue';
import FriendListDrawer from '@/components/FriendListDrawer.vue';
import AddRoom from '@/components/AddRoom.vue';
import AddProblems from '@/components/AddProblems.vue';




  // import LottieVuePlayer from '@lottiefiles/vue-lottie-player';

pageIs('in-room');

const pair = ref({start:0, end:10});

const addProblemsDrawer = ref(false);

// const curUserId = ref(localStorage.getItem('userId'));

const route = useRoute();

function getPageRoomId(params: string | string[]) {
  return params ? (Array.isArray(params) ? params[0] as string : params as string) : '';
}

const roomId = ref(getPageRoomId(route.params.id))
const curUserId = ref(localStorage.getItem('userId'))
const gameId = ref('')


const roomInfo = ref<any>({name: ''})
interface Player {
  userid: string;
  username: string;
  avatarUrl: string;
}


const initRoomInfo = async () => {
  console.log('roomId', roomId.value);

  generateGet(`/api/room/id?id=${roomId.value}`).then((res) => {
    if (res.data.status === 0) {
      roomInfo.value = res.data.data;
      gameId.value = roomInfo.value.gameId;
      console.log('roomInfo', roomInfo.value);
      console.log('curUserId', curUserId.value);
    } else {
      console.log(res.data.msg);
    }
  }).catch((err) => {
    console.log(err);
  });
};

initRoomInfo();

const router = useRouter();

const roomState = useRoomState();



const onlinePlayers = computed(() => {
  const players: Player[] = []
  for (let i = 0; i < (roomState.roomInfo?.userid?.length ?? 0); i++) {
    const avatarUrl = roomState.roomInfo?.avatarUrl[i] ?? ''
    players.push({
      userid: roomState.roomInfo?.userid[i].toString() ?? '',
      username: roomState.roomInfo?.username[i] ?? 'NONAME',
      avatarUrl: avatarUrl == '' ? '/logo.jpg'  : 'http://81.70.241.166/avatar/' + avatarUrl
    })
  }
  return players
});

const hall = useHallState()
hall.hall.room_enter(roomId.value as unknown as number);
// if (hall.hall.status == HallStatus.ONLINE) {
//   hall.hall.room_enter(roomId.value as unknown as number)
// }

const confirmLeave = ref(false)
const handleOk = () => {
  hall.hall.room_leave(roomId.value as unknown as number)
  confirmLeave.value = false
  router.push('/rooms')
}

const handleCancel = () => {
  confirmLeave.value = false
}

const allProblemsInfo = ref(Array<any>());
const skeletonLoading = ref(true);

const isDrawerOpen = ref(false);

const showProblems = ref(Array.from({ length: 10 }, () => ({} as any)));
const totalProblems = ref(0);
const allProblems = ref(Array<any>());


const initGetProblems = (start:number=0, end:number=10, type:number=0) => {// type=0: 初始化和删除时, type=1: 添加时
  generateGet(`/api/game/getquestion?id=${roomInfo.value.gameId}`).then((res) => {
    if (res.data.status === 0) {
      allProblems.value = res.data.data;
      // showProblems.value = res.data.data.content;
      totalProblems.value = allProblems.value.length;
      if (totalProblems.value <= 10) {
        pair.value = {start:0, end:totalProblems.value};
        currentPage.value = 1;
      }
      else {
        pair.value = {start:start, end:end};
      }
      // pair.value = {start:start, end:end};
      // showProblems.value = allProblems.value.slice(0, onePageSize);
      // allProblemsInfo.value = new Array(allProblems.value.length);
      // 注意返回值
      allProblemsInfo.value = []
      const fetchPromises = allProblems.value.map((problem, index) => 
        fetchProblemData(problem.questionId).then((data) => {
          allProblemsInfo.value[index] = data;
        }).catch((err) => {
          console.log(err);
        })
      );

      Promise.all(fetchPromises).then(() => {
        console.log("allProblemsInfo.value is", allProblemsInfo.value);
        // console.log([1,2,3].slice(0, 1));
        //console.log(allProblemsInfo.value.slice(0, 1));
        showProblems.value = allProblemsInfo.value.slice(pair.value.start, pair.value.end);
        // console.log("allProblemsInfo.value is", allProblemsInfo.value.slice(0, 1));
        skeletonLoading.value = false;
        console.log("showProblems.value is", showProblems.value);
      });
    } else {
      console.log(res.data.msg);
    }
  }).catch((err) => {
    console.log(err);
  });
};

const openDrawer = () => {
  isDrawerOpen.value = true;
  initGetProblems(0, 10);
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
};

function formatDescription(description: string) {
    // 去除首尾的 <p> 标签
    description = description.replace(/^<p>|<\/p>$/g, "");

    // 如果字数超过 50 个字，则省略
    if (description.length > 80) {
    return description.slice(0, 80) + "...";
    }
    return description;
}

const isDetailsDrawerOpen = ref(false);
const curProblemId = ref(-1);

const openDetailsDrawer = (id: number) => {
  curProblemId.value = id;
  isDetailsDrawerOpen.value = true;
};

const closeDetailsDrawer = () => {
  isDetailsDrawerOpen.value = false;
};

const currentPage = ref(1);
const onePageSize = 10;


const onLoadMore = (val:any) => {
    currentPage.value = val;
    pair.value = {start: (currentPage.value - 1) * onePageSize, end: currentPage.value * onePageSize};
    showProblems.value = allProblemsInfo.value.slice((currentPage.value - 1) * onePageSize, currentPage.value * onePageSize);
}

const deleteProblem = (problem_id: number) => {
    console.log(problem_id);
    generateDelete(`/api/game/delquestion/${problem_id}?gid=${gameId.value}`).then((res) => {
        if (res.data.status === 0) {
            message.success('删除成功');
            initGetProblems(pair.value.start, pair.value.end);
        } else {
            message.error(res.data.msg);
        }
    }).catch((err) => {
        message.error('网络错误');
    });
}

const fetchProblemData = async (problemId: number) => {
  const response = await generateGet(`/api/oj/problem?id=${problemId}`);
  return response.data.data.data;
};

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
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  /* background-color: #f0f2f5; */
}

.waiting-title {
  margin-top: -50px;
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
  width: 96px;
  height: 96px;
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

.disabled-btn {
  /* margin-top: 24px; */
  background: white;
}
</style>

