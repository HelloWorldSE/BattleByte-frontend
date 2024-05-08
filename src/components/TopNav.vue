<template>
  <div class="components-top-nav">
    <div class="left">
      <img
          class="LOGO"
          src="/logo.jpg"
          alt="LOGO"
      />
      <div class="title">BattleByte</div>
    </div>
    <!-- 中间部分内容 -->
    <div class="middle">
      <Menu
          mode="horizontal"
          theme="light"
          class="menu"
          style="background: #eaf3f8; font-size: large"
          v-model:selectedKeys="current"
          @click="handleClick"
      >
        <MenuItem key="/" class="menu-item">
          <AppstoreOutlined />
          首页
        </MenuItem>
        <MenuItem key="/rule">
          <MailOutlined />
          规则介绍
        </MenuItem>
        <MenuItem key="/user/profile/:id">
          <SettingOutlined />
          个人中心
        </MenuItem>
      </Menu>
    </div>
<!--     右侧部分内容-->
    <div class="right">
      <div class="exit-button" @click="log_out">
        退出登录
      </div>
      <img
          class="headImg"
          src=""
          alt="头像"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import { useRouter } from 'vue-router';
import { MailOutlined, AppstoreOutlined, SettingOutlined,SkinOutlined } from '@ant-design/icons-vue';
import { Menu, MenuItem, SubMenu, MenuItemGroup } from 'ant-design-vue';
import type {Key} from "ant-design-vue/es/_util/type";
import { useHallState } from '@/stores/hall';

const router = useRouter();
const handleClick = (event: { key: string | number }) => {
  const {key} = event;
  console.log(key);
  if (typeof key == 'string') {
    router.push(key);
  }
};
const current = ref<Key[]>(['首页']); // 修改类型为 Key[]


const hall = useHallState()
const log_out = () => {
  hall.hall.logout()
  localStorage.removeItem('token')
  router.push('/auth/login')
}

</script>

<style scoped>
.components-top-nav {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #eaf3f8;
  color: #000;
  height: 100%; /* 让 TopNav 高度与父容器相同 */
  width: 100%;
  overflow: hidden; /* 隐藏超出部分 */
  position: absolute; /* 绝对定位 */
  top: 0; /* 定位在顶部 */
  left: 0; /* 定位在左侧 */
  right: 0; /* 宽度与 .top 相同 */
  bottom: 0; /* 高度与 .top 相同 */
}

.left {
  display: flex;
  align-items: center;
}

.LOGO {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.title {
  font-size: 20px;
}

.middle {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  margin-right: 35%;
  width: 100%;
}

.right {
  display: flex;
  align-items: center;
  font-color: #ffffff;
}

.right img.headImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
}

.right .userName {
  margin-right: 5px;
}

.right .userLevel {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.right .musicBtn,
.right .soundBtn {
  cursor: pointer;
  margin-right: 5px;
}

.lightDote {
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #ff0;
  border-radius: 50%;
  margin-left: 5px;
}

.clickItem {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
  position: relative;
}

.clickItem:hover .lightDote {
  display: block;
}

.friend .lightDote {
  position: absolute;
  top: 50%;
  right: -8px;
  transform: translateY(-50%);
}

.musicBtn:hover,
.soundBtn:hover {
  color: #ff0;
}

.menu {
  display: flex;
  justify-content: center;
  width: 75%;
}

.menu-item {
  margin: 0 10px;
  color: #fff;
}

.exit-button {
}
.exit-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
.exit-button:active {
  background-color: rgba(0, 0, 0, 0.2);
}

</style>
