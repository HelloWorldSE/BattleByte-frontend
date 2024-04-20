<template>
  <Menu v-model:selectedKeys="current" mode="horizontal">
    <MenuItem key="main">
      <template #icon>
        <mail-outlined />
      </template>
      <router-link to="/main">Main</router-link>
    </MenuItem>
    <MenuItem key="two">
      <template #icon>
        <appstore-outlined />
      </template>
      Navigation Two
    </MenuItem>
    <SubMenu key="three">
      <template #icon>
        <setting-outlined />
      </template>
      <template #title>Navigation Three - Submenu</template>
      <MenuItemGroup title="Item 1">
        <MenuItem key="setting:1">Option 1</MenuItem>
        <MenuItem key="setting:2">Option 2</MenuItem>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <MenuItem key="setting:3">Option 3</MenuItem>
        <MenuItem key="setting:4">Option 4</MenuItem>
      </MenuItemGroup>
    </SubMenu>
    <MenuItem key="four">
      <template #icon>
        <skin-outlined />
      </template>
      Navigation Four
    </MenuItem>
  </Menu>
</template>

<script lang="ts" setup>
import {ref, watch} from 'vue';
import {useRoute} from "vue-router";
import { MailOutlined, AppstoreOutlined, SettingOutlined,SkinOutlined } from '@ant-design/icons-vue';
import { Menu, MenuItem, SubMenu, MenuItemGroup } from 'ant-design-vue';
import type {Key} from "ant-design-vue/es/_util/type";


const current = ref<Key[]>([]); // 修改类型为 Key[]
const route = useRoute();


watch(() => route.path, (newPath, oldPath) => {
  current.value = [newPath as Key];
});

</script>
