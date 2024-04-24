<template>
  <div class="components-top-nav">
    <div class="left">
      <img
          class="LOGO"
          src=""
          alt="LOGO"
      />
      <div class="title">BattleByte</div>
    </div>
    <!-- 中间部分内容 -->
    <div class="middle">
      <Menu
          theme=""
          mode="horizontal"
          class="menu"
          :selectedKeys="current"
          @select="onSelect"
      >
        <MenuItem key="/home" class="menu-item">
          <AppstoreOutlined />
          首页
        </MenuItem>
        <MenuItem key="/game">
          <SkinOutlined />
          好友
        </MenuItem>
        <MenuItem key="/mail">
          <MailOutlined />
          历史对局
        </MenuItem>
        <MenuItem key="/mail">
          <MailOutlined />
          规则介绍
        </MenuItem>
        <MenuItem key="/setting">
          <SettingOutlined />
          设置
        </MenuItem>
      </Menu>
    </div>
    <!-- 右侧部分内容 -->
    <div class="right">
      <img
          class="headImg"
          src=""
          alt="头像"
      />
      <div class="userName">用户名</div>
      <div class="userLevel">等级</div>
      <div class="musicBtn">
        <i class="iconfont icon-yinle"></i>
      </div>
      <div class="soundBtn">
        <i class="iconfont icon-yinxiao"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {useRoute} from "vue-router";
import { MailOutlined, AppstoreOutlined, SettingOutlined,SkinOutlined } from '@ant-design/icons-vue';
import { Menu, MenuItem, SubMenu, MenuItemGroup } from 'ant-design-vue';
import type {Key} from "ant-design-vue/es/_util/type";


const current = ref<Key[]>([]); // 修改类型为 Key[]
const route = useRoute();

const state = {
  isLogin: false,
  isUserPlaying: false,
  modeName: '什么模式',
  isMusicPlay: false,
  isSoundPlay: false,
};



watch(() => route.path, (newPath, oldPath) => {
  current.value = [newPath as Key];
});

</script>

<style scoped>
.components-top-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #333;
  color: #fff;
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
  width: 200%;
}

.right {
  display: flex;
  align-items: center;
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

</style>
