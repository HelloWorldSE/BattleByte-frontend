<template>
  <div id="mainPage">
  <div id="app">
    <Stars></Stars>
    <!-- <div class="topBar">
        <TopNav/>
    </div> -->
    <Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex" justify="center" class="main">
      <Col :span="6" v-for="(room, index) in curRooms" :key="room" :style="{marginTop: '50px'}">
        <Card hoverable class="roomCard">
          <template #cover>
            <img
              alt="example"
              src="/logo.jpg"
            /> 
            <!-- <p>房间一</p> -->
          </template>
          <template #actions>
            <EnterRoomButton :roomId="room.id"/>
            <DeleteRoomButton :roomId="room.id" :curRooms="curRooms"/>
        <!-- <Button type="primary" @click="color='blue'">Change Color</Button> -->
          </template>
          <CardMeta :title="room.name" description="等待中...">
            <template #avatar>
            <Tooltip title="房主" placement="bottom">
              <Avatar :src="'http://81.70.241.166/avatar/'+roomAvatar[index]"></Avatar>
            </Tooltip>
          </template>
          </CardMeta>
        </Card>
      </Col>
    </Row>
    <Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex" justify="center">
    <Pagination @change="onLoadMoreRooms" :total="totalPages * onePageSize" :current="currentPage" v-model:pageSize="onePageSize" style="margin-top: 20px;"
    show-size-changer @showSizeChange="onShowSizeChange" :page-size-options="pageSizeOptions" class="pagination">
    <template #buildOptionText="props">
      <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
      <span v-else>全部</span>
    </template>
  </Pagination>
  </Row>
  <div class="fixed-button">
    <Tooltip title="添加房间" placement="left">
      <Button type="primary" shape="circle" @click="handleOpenCreateRoom" size="large">
        <template #icon>
          <PlusOutlined />
        </template>
      </Button>
    </Tooltip>
    </div>
  </div>
  <div id="BigParentBox">
    <AddRoom v-model="fieldData.createRoom" :roomList="curRooms"/>
    
  </div>

</div>
</template>
<script lang="ts" setup>

import TopNav from '@/components/TopNav.vue';
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Card, CardMeta, Avatar, Button, Tooltip, Row, Col, Pagination } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import AddRoom from '@/components/AddRoom.vue';
import { useRoute, useRouter } from "vue-router";
import { generateGet } from '@/utils/protocol';
import EnterRoomButton from '@/components/EnterRoomButton.vue';
import DeleteRoomButton from '@/components/DeleteRoomButton.vue';
import Stars from '@/components/Stars.vue';
import { pageIs } from '@/utils/pageis';
pageIs('rooms');

const router = useRouter();
const fieldData = ref({
  createRoom: false,
});
const roomList = ref([] as any)
const roomAvatar = ref([] as any)

const curUserId = ref(localStorage.getItem('userId'));

const handleOpenCreateRoom = () => {
  fieldData.value.createRoom = true;
};

const handleEnterRoom = () => {
  router.push('/roomDetails');
};

const getAvatars = (roomList:any[]) => {
  roomList.forEach((room) => {
    generateGet(`/api/user/profile`, {id: room.uid}).then((res) => {
      if (res.data.status === 0) {
        roomAvatar.value.push(res.data.data.avatar);
      } else {
        console.log(res.data.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  });
};

// 分页机制
const onePageSize = ref(10);
const currentPage = ref(1);
const totalPages = ref(0);
const curRooms = ref<any[]>([]);

const roomsLoading = ref(false);

const initGetRooms = () => {
  generateGet('/api/room', {pageSize: onePageSize.value, page:currentPage.value}).then((res) => {
    if (res.data.status === 0) {
      curRooms.value = res.data.data.content;
      getAvatars(curRooms.value);
      console.log("roomAvatar.value is",roomAvatar.value);
      totalPages.value = res.data.data.totalPages;
      console.log("totalPages.value is",totalPages.value);
    } else {
      console.log(res.data.msg);
    }
  }).catch((err) => {
    console.log(err);
  });
};

initGetRooms();

const onLoadMoreRooms = (val: any) => {
  currentPage.value = val;
  roomsLoading.value = true;

  // const xx = [...new Array(onePageSize.value)].map(() => ({ loading: true, name: {}, id: 0}));
  // const yy = [...new Array(onePageSize.value)].map(() => ({ avatar: {}}));

  // curRooms.value = xx;
  // roomAvatar.value = yy;

  generateGet("api/room", {pageSize: onePageSize.value, page: currentPage.value}).then((res) => {
    if (res.data.status === 0) {
      curRooms.value = res.data.data.content;
      getAvatars(curRooms.value);
      console.log("curRooms.value is",curRooms.value);
      currentPage.value = res.data.data.pageable.pageNumber + 1;
      console.log("currentPage.value is",currentPage.value);
      totalPages.value = res.data.data.totalPages;
      console.log("totalPages.value is",totalPages.value);
      // location.reload();
    } else {
      console.log(res.data.msg);
    }
  }).catch((err) => {
    console.log(err);
  });

  
};

const pageSizeOptions = ref<string[]>(['10', '20', '30', '40', '50']);

const onShowSizeChange = (current: number, size: number) => {
  onePageSize.value = size;
  currentPage.value = 1;
  initGetRooms();
};

</script>
<style scoped>
#mainPage {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}

#app {
  background-color: black; /* 设置背景为黑色 */
  min-height: 100vh; /* 至少为视口的100%高度 */
  display: flex;
  flex-direction: column; /* 如果你需要垂直布局 */
  align-items: stretch; /* 使子元素填满容器宽度 */
}

.topBar {
  width: 100%;
  overflow: hidden; /* 隐藏超出部分 */
  height: 60px;
  position: relative; /* 确保 TopNav 绝对定位相对于 .top */
  z-index: 1005;
}

:deep(.ant-list-item-meta-content h4) {
    margin-top: 0;
}

.main {
  margin-top: 60px; /* 留出 TopNav 的高度 */
  padding: 20px;
  margin: 0px;
}

.button-icon {
  margin-right: 12px;
}

.button-text {
  font-size: 16px;
  font-weight: bold;
}

.fixed-button {
  position: fixed;
  right: 40px;
  bottom: 30px;
  z-index: 100;
}

.roomCard {
  /* width: 300px; */
  margin: 20px;
  transition: box-shadow 0.3s;
}

.roomCard:hover {
  box-shadow: 0 0 11px rgb(255, 255, 255); 
}

.pagination {
  background-color: #FFFFFF;
  font: white 16px Arial;
}

</style>

<!-- <style lang="scss" scoped>
:deep(.ant-pagination-item) {
  border:1px solid #336ECD;
  background-color: transparent;
    color: white;
  a{
      color: white;
  }
 }
 
:deep(.ant-pagination-item-active){
  border:1px solid #336ECD;
  background-color: transparent;
    color: #FFC600;
  a{
      color: #FFC600;
  }
  
}
 
:deep(.ant-pagination-prev .ant-pagination-item-link){
  border:1px solid #336ECD;
  background-color: transparent;
    color: white;
  a{
      color: #FFC600;
  }  
}
 
:deep(.ant-pagination-next .ant-pagination-item-link){
  border:1px solid #336ECD;
  background-color: transparent;
    color: white;
  a{
      color: #FFC600;
  }  
}
 
:deep(.ant-pagination-item:hover){
  border:1px solid #336ECD;
   background-color: transparent;
  a{
      color: #00FFF7;
  } 
}
:deep(.ant-pagination-item-link:hover){
  border-color: #00FFF7;
  span{
      color: #00FFF7;
  } 
}

:deep(.ant-select-selector) {
  background-color: transparent;
}

:deep(.ant-select:not(.ant-select-disabled):hover .ant-select-selector){
  border-color: #00FFF7;
}
:deep(.ant-pagination-options-quick-jumper input:hover){
  border-color: #00FFF7;
}
:deep(.ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector){
  border-color: #00FFF7;
}
 
:deep(.ant-pagination-options-quick-jumper) {
  color: white;
  input {
     border:1px solid #336ECD;
    background-color: transparent;
    color: #FFC600;
  }
}
</style> -->
