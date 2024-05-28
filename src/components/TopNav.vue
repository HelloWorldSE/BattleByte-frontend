<template>
  <!-- <Row>
    <Col span="6"></Col>
    <Col span="12"></Col>
    <Col span="6"></Col>
  </Row> -->

  <div class="components-top-nav">
    <div class="left">
      <img
          class="LOGO"
          src="/logo.jpg"
          alt="LOGO"
      />
      <div class="title">BattleByte</div>
      
    </div>
    <div class="hide-middle" v-if="thisId===null">Pit your skills, against the best</div>
    <!-- 中间部分内容 -->
    <div class="middle" v-if="thisId!==null">
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
        <MenuItem key="userProfile">
          <SettingOutlined />
          个人中心
        </MenuItem>
      </Menu>
    </div>
<!--     右侧部分内容-->
    <div class="right" v-if="thisId!==null">
  
        <Dropdown>
        <Avatar :src="pageAvatar" class="headImg"/>
        <template #overlay>
          <Menu>
            <MenuItem key="1" @click="pushProfile">
              <ProfileOutlined />
              个人中心
            </MenuItem>
            <MenuItem key="2">
              <MessageOutlined />
              消息
            </MenuItem>
            <MenuItem key="3" @click="bell">
              <BellOutlined />
              通知
            </MenuItem>
            <MenuItem key="4" @click="log_out">
              <LogoutOutlined />
              退出登录
            </MenuItem>
          </Menu>
        </template>
        </Dropdown>
  
    </div>
  </div>
  <TestBell v-model="fieldData.bellVisible"></TestBell>
</template>

<script lang="ts" setup>
import {reactive, ref, watch, h} from 'vue';
import { useRouter } from 'vue-router';
import { MailOutlined, AppstoreOutlined, SettingOutlined,SkinOutlined,LogoutOutlined,MessageOutlined,ProfileOutlined, BellOutlined } from '@ant-design/icons-vue';
import { Menu, MenuItem, SubMenu, MenuItemGroup, Button, Tooltip, Row, Col, Avatar, Dropdown } from 'ant-design-vue';
import type {Key} from "ant-design-vue/es/_util/type";
import { useHallState } from '@/stores/hall';
import { generateGet } from '@/utils/protocol';
import TestBell from '@/components/TestBell.vue';


const thisId = localStorage.getItem('userId');
let pageAvatar = ref('');


const router = useRouter();
const handleClick = (event: { key: string | number }) => {
  const {key} = event;
  console.log('key:', key);
  if (key === 'userProfile') {
    router.push(`/user/profile/${thisId}`);
    window.location.href = `http://81.70.241.166/user/profile/${thisId}`;
  }
  else if (typeof key == 'string') {
    router.push(key);
  }
};
const current = ref<Key[]>(['首页']); // 修改类型为 Key[]


const hall = useHallState()
const log_out = () => {

  hall.hall.logout()
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  router.push('/auth/login')

}

const pushProfile = () => {

  router.push(`/user/profile/${thisId}`);
  window.location.href = `http://81.70.241.166/user/profile/${thisId}`;

}


const avatar = ref<string>('');
const initProfile = async () => {

  // getAvatar

  generateGet("api/user/profile", { id: thisId }).then((res) => {
        if (res.data.status === 0) {
            console.log(res);
            // pageUserName.value = res.data.data.userName;
            // pageEmail.value = res.data.data.userEmail;
            pageAvatar.value = 'http://81.70.241.166/avatar/' + res.data.data.avatar;
            console.log('pageAvatar:', pageAvatar);


            // friends = res.data.friends;
        } else {
            console.log(res);
        }});
  // generateGet("api/upload/getAvatar", { id: thisId }).then((res) => {
  //       if (res.data.status === 0) {
  //           console.log(res);
  //           // decode Base64 to image
  //           pageAvatar.value = 'data:image/png;base64,' + res.data.data;
  //           // pageAvatar.value = res.data.data;
  //           console.log('pageAvatar:', pageAvatar);
  //       } else {
  //           console.log(res);
  //       }
  //   });
};

initProfile();

// 通知Modal
const fieldData = ref({
  bellVisible: false
});

const bell = () => {
  fieldData.value.bellVisible= true;
};

</script>

<style scoped>
.components-top-nav {
  display: flex;
  align-items: center;
  /* padding: 10px; */
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
  width: 10%;
}

.LOGO {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.title {
  font-size: 20px;
  font-family:"Times New Roman", Times, serif;
}

.middle {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  /* margin-right: 35%; */
  width: 80%;
}

.right {
  display: flex;
  align-items: center;
  width: 8%;
  /* font-color: #ffffff; */
}

.headImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px; 
  cursor: pointer;
  z-index: 999;
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
  width: 100%;
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

.hide-middle {
  /* 其他样式 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  font: italic 2em Georgia, serif;
  font-weight: 200;
}

</style>
