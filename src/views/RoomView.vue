<template>
    <div class="topBar">
        <TopNav/>
    </div>
    <Row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }" type="flex" justify="center" class="main">
      <Col :span="6">
        <Card hoverable style="width: 300px">
          <template #cover>
            <img
              alt="example"
              src="/logo.jpg"
            /> 
            <!-- <p>房间一</p> -->
          </template>
          <template #actions>
            <!-- <SettingOutlined key="setting" />
            <EditOutlined key="edit" />
            <EllipsisOutlined key="ellipsis" /> -->
            <!-- <Button @click="color='red'">
              <template #icon>
                <SettingOutlined />
              </template>
              Change Color
            </Button> -->
            <div
              @mouseover="showOpenIcon = true"
              @mouseout="showOpenIcon = false"
              @click="handleEnterRoom"
              class="custom-button secondary"
            >
          <img
            :src="showOpenIcon ? 'door-open.svg' : 'door-close.svg'"
            alt="Door Icon"
            width="24"
            height="24"
            class="button-icon"
          />
          <span class="button-text">进入房间</span>
        </div>
        <!-- <Button type="primary" @click="color='blue'">Change Color</Button> -->
          </template>
          <CardMeta title="房间一" description="等待中...">
            <template #avatar>
            <Tooltip title="房主" placement="bottom">
              <Avatar :style="{ backgroundColor:color,verticalAlign: 'middle'}">FZ</Avatar>
            </Tooltip>
          </template>
          </CardMeta>
        </Card>
      </Col>
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
    <AddRoom v-model="fieldData.createRoom"/>
    
</template>
<script lang="ts" setup>

import TopNav from '@/components/TopNav.vue';
import { EditOutlined, EllipsisOutlined, SettingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Card, CardMeta, Avatar, Button, Tooltip, Row, Col } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import AddRoom from '@/components/AddRoom.vue';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const color = ref('red');
const showOpenIcon = ref(false);
const fieldData = ref({
  createRoom: false,
});

const handleOpenCreateRoom = () => {
  fieldData.value.createRoom = true;
};

const handleEnterRoom = () => {
  router.push('/roomDetails');
};
</script>
<style scoped>
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
}

.custom-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d9d9d9; /* 灰色边框 */
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.custom-button.secondary {
  color: #595959; /* 次要文字颜色 */
  background-color: #fff; /* 白色背景 */
}

.custom-button.secondary:hover {
  color: #262626; /* hover 时的文字颜色 */
  background-color: #f5f5f5; /* hover 时的背景色 */
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
</style>
