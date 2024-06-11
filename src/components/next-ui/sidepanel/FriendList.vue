<script setup lang="ts">

import { Avatar, List, ListItem, ListItemMeta, Pagination, Skeleton, InputSearch } from "ant-design-vue";
import { generateGet } from "@/utils/protocol";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
import { getUserId } from "@/utils/auth";
import { useHallState } from "@/stores/hall";
import { useRoomState } from "@/stores/room";

const route = useRoute();
const router = useRouter();


const userId = getUserId();
const localUserId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
const onePageFriends = 5;

const localFriends = ref<Array<any>>([]);
const curFriendPage = ref(1);
const totalFriendsPages = ref(0);


const initFriendsLoading = ref(true);
const initProfile = async () => {


    // get friends
    generateGet("api/user/friend", { pageSize: onePageFriends, page: 1}).then((res) => {
        if (res.data.status === 0) {
            initFriendsLoading.value = false;
            // pageUserName = res.data.username;
            // pageEmail = res.data.email;
            localFriends.value = res.data.data.content;
            console.log('localFriends', localFriends);
            curFriendPage.value = res.data.data.pageable.pageNumber + 1;
            console.log('curFriendPage', curFriendPage);
            totalFriendsPages.value = res.data.data.totalPages;
            console.log('totalFriendsPages', totalFriendsPages);

        } else {
            console.log(res);
        }

    })


}

initProfile();

const friendsLoading = ref(false);
const todo_member = ref("")

const onLoadMoreFriends1 = (val: any) => {
    console.log("curFriendPage:", curFriendPage);
    curFriendPage.value = val;
    friendsLoading.value = true;
    const xx = [...new Array(onePageFriends)].map(() => ({ loading: true, name: {}, picture: {} }))
    localFriends.value = xx;
    generateGet("api/user/friend", {name: todo_member.value, pageSize: onePageFriends, page: curFriendPage.value}).then((res) => {
        if (res.data.status === 0) {
            // pageUserName = res.data.username;
            // pageEmail = res.data.email;
            friendsLoading.value = false;
            localFriends.value = res.data.data.content;
            console.log('localFriends', localFriends);
            curFriendPage.value = res.data.data.pageable.pageNumber + 1;
            console.log('curFriendPage', curFriendPage);
            totalFriendsPages.value = res.data.data.totalPages;
            console.log('totalFriendsPages', totalFriendsPages);

        } else {
            console.log(res);
        }});
};



const fieldData = ref({
    openEditProfile: false,
    openEditPassword: false,
    openDeleteFriend: false,
    openAddFriend: false,
});
const deleteItem = ref({
    userId: -1,
    userName: '',
    friendId: -1,
});


const searchFriends = () => {
    console.log("todo_member is", todo_member.value);
    // curFriendPage = val;

    friendsLoading.value = true;
    generateGet("api/user/friend", {name: todo_member.value, pageSize: onePageFriends}).then((res) => {
        if (res.data.status === 0) {
            friendsLoading.value = false;
            localFriends.value = res.data.data.content;
            console.log('localFriends', localFriends);
            curFriendPage.value = res.data.data.pageable.pageNumber + 1;
            console.log('curFriendPage', curFriendPage);
            totalFriendsPages.value = res.data.data.totalPages;
            console.log('totalFriendsPages', totalFriendsPages);
        } else {
            console.log(res);
        }
    });
}

const clickUserName = (item:any) => {
    console.log("this user id is", item.id);
    router.push(`/user/profile/${item.id}`);

    // 服务器使用需要修改
    window.location.href = 'http://81.70.241.166/user/profile/' + item.id;

    // window.location.href = 'http://127.0.0.1:5173/user/profile/' + item.id;
    // location.reload();
}

const deleteOneFriend = (item:any) => {
    console.log("this friend id is", item.id);
    deleteItem.value.userId = item.id;
    deleteItem.value.userName = item.userName;
    deleteItem.value.friendId = item.friendId;
    console.log("deleteItem is", deleteItem);
    console.log("openDeleteFriend");
    fieldData.value.openDeleteFriend = true;
    console.log('fieldData', fieldData);
}

const hall = useHallState()
const room = useRoomState()
const invite = (item:any) => {
    if (room.roomInfo) {
        hall.hall.room_invite(room.roomInfo.roomid, item.id)
    }
}

const openAddFriend = () => {
    console.log("openAddFriend");
    fieldData.value.openAddFriend = true;
    console.log('fieldData', fieldData);
}
</script>

<template>
    <InputSearch
        v-model:value="todo_member"
        placeholder="输入好友的名字"
        style="width: 100%; margin:auto;"
        @search="searchFriends"
        />
    <List
        class="demo-loadmore-list"
        :loading="initFriendsLoading"
        item-layout="horizontal"
        :data-source="localFriends"
        id="FriendsList"
    >
        <template #loadMore>
            <!-- v-if="!initFriendsLoading && !friendsLoading" -->
        <div
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
        >
            <!-- <Button @click="onLoadMoreFriends">loading more</Button> -->
            <Pagination @change="onLoadMoreFriends1" :current="curFriendPage" :total="totalFriendsPages * onePageFriends" :pageSize="onePageFriends" simple/>
        </div>
        </template>
        <template #renderItem="{ item }">
        <ListItem>

            <template #actions>
            <a key="list-loadmore-edit" @click="deleteOneFriend(item)">删除</a>
            <a key="list-loadmore-more" @click="invite(item)">邀请</a>
            </template>
            <Skeleton avatar :title="false" :loading="!!item.loading" active>
            <ListItemMeta
                :description="item.userEmail"
            >
                <template #title>
                <a @click="clickUserName(item)">{{ item.userName }}</a>
                </template>
                <template #avatar>
                <Avatar :src="'http://81.70.241.166/avatar/' + item.avatar" />
                </template>
            </ListItemMeta>
            </Skeleton>
        </ListItem>
        </template>
    </List>
</template>


<style scoped>
:deep(.ant-list-item-meta-content h4) {
    margin-top: 0;
}
</style>