<script setup lang="ts">
import { useDrawerState } from '@/stores/drawer';
import { ConfigProvider, Drawer, Tabs, TabPane } from 'ant-design-vue';

const drawerState = useDrawerState()
import { theme } from 'ant-design-vue';

import NewFriendsApply from '@/components/next-ui/sidepanel/NewFriendsApply.vue'
import FriendList from '@/components/next-ui/sidepanel/FriendList.vue'

</script>

<template>
    <Drawer v-model:open="drawerState.friendOpen">
        <Tabs animated>
            <TabPane key="friend" tab="好友列表">
                <FriendList />
            </TabPane>
            <TabPane key="new" tab="新的好友">
                <NewFriendsApply />
            </TabPane>
        </Tabs>
    </Drawer>
</template>

<style scoped>

</style>