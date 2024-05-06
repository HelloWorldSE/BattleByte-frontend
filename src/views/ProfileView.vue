<script lang="ts" setup>
import { Grid, Row, Col, Avatar, Card, TabPane, Table, Tabs, List, ListItem, ListItemMeta, Pagination, Button, Skeleton, Flex, InputSearch } from "ant-design-vue";
import { generateGet } from "@/utils/protocol";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, reactive, onMounted, nextTick, onUpdated } from "vue";
import TopNav from "@/components/TopNav.vue";
import EditProfile from "@/components/EditProfile.vue";
import EditPassword from "@/components/EditPassword.vue";
import { useHallState } from "@/stores/hall";

// import { defineComponent } from '@vue/composition-api';

const route = useRoute();
const router = useRouter();

function getPageUserId(params: string | string[]) {
    return params ? (Array.isArray(params) ? params[0] as string : params as string) : '';
}

const pageUserId = getPageUserId(route.params.id);
const localUserId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
// const localUserName = localStorage.getItem("userInfo") ? JSON.parse((localStorage.getItem("userInfo")) || '').username : NaN;
// const localEmail = localStorage.getItem("userInfo") ? JSON.parse((localStorage.getItem("userInfo")) || '').email : NaN;
const pageUserName = ref('');
const pageEmail = ref('');
const pageAvatar = ref('');
let pageFriends = ref(NaN);
let friendPageNums = 1;
let onePageFriends = 5;

const localFriends = ref<Array<any>>([]);
const curFriendPage = ref(1);
const totalFriendsPages = ref(0);


const getImageUrl = (name: any) => {
    return new URL(`${name}`, import.meta.url).href
}

// const pagination = computed(() => ({
//   total: 200,
//   current: current.value,
//   pageSize: pageSize.value,
// }));




const initFriendsLoading = ref(true);
const initProfile = async () => {
    generateGet("api/user/profile", { id: pageUserId }).then((res) => {
        if (res.data.status === 0) {
            console.log(res);
            pageUserName.value = res.data.data.userName;
            pageEmail.value = res.data.data.userEmail;
            pageAvatar.value = 'http://81.70.241.166/avatar/' + res.data.data.avatar;
            console.log('pageAvatar:', pageAvatar);


            // friends = res.data.friends;
        } else {
            console.log(res);
        }

    // generateGet("api/upload/getAvatar", { id: pageUserId }).then((res) => {
    //     if (res.data.status === 0) {
    //         console.log(res);
    //         // decode Base64 to image
    //         // pageAvatar.value = 'data:image/png;base64,' + res.data.data;
    //         pageAvatar.value = 'http://81.70.241.166/avatar/' + res.data.data;
    //         // pageAvatar.value = res.data.data;
    //         console.log('pageAvatar:', pageAvatar);
    //     } else {
    //         console.log(res);
    //     }
    // });
});


    if (pageUserId === localUserId) {
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
    });
    }


}

initProfile();
// onMounted(() => {
//     initProfile();
// });

// onUpdated(() => {
//     initProfile();
// });
// 朋友页面 翻页逻辑
const count = 5;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;



const friendsLoading = ref(false);
const friendsData = ref<Array<any>>([]);
const friendsList = ref<Array<any>>([]);
const customGapSize = ref(40);
const todo_member = ref("")

// onMounted(() => {
//   fetch(fakeDataUrl)
//     .then(res => res.json())
//     .then(res => {
//         initFriendsLoading.value = false;
//         friendsData.value = res.results;
//         friendsList.value = res.results;
//     });
// });

const onLoadMoreFriends = () => {
    friendsLoading.value = true;
    const xx = (new Array(count)).map(() => ({ loading: true, name: {}, picture: {} }))
    friendsList.value = friendsData.value.concat(xx);
  fetch(fakeDataUrl)
    .then(res => res.json())
    .then(res => {
      const newData = friendsData.value.concat(res.results);
      friendsLoading.value = false;
      friendsData.value = newData;
      friendsList.value = newData;
      nextTick(() => {
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
      });
    });
};

let friendsPage = ref(1);

const onLoadMoreFriends1 = (val: any) => {
    console.log("curFriendPage:", curFriendPage);
    curFriendPage.value = val;
    friendsLoading.value = true;
    const xx = [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))
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

    // friendsList.value = xx;
//   fetch(fakeDataUrl)
//     .then(res => res.json())
//     .then(res => {
//       const newData = res.results;
//       friendsLoading.value = false;
//       friendsData.value = newData;
//       friendsList.value = newData;
//       friendsPage.value = val;
//       nextTick(() => {
//         window.dispatchEvent(new Event('resize'));
//       });
//     });
};


function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const fieldData = ref({
    openEditProfile: false,
    openEditPassword: false,
});


const openEditProfile = () => {
    console.log("openEditProfile");
    fieldData.value.openEditProfile = true;
    console.log('fieldData', fieldData);

    // Update personal information
    // generateGet("api/user/profile", { id: pageUserId }).then((res) => {
    //     if (res.data.status === 0) {
    //         console.log(res);
    //         pageUserName.value = res.data.data.userName;
    //         pageEmail.value = res.data.data.userEmail;
    //         // pageAvatar.value = res.data.data.avatar;
    //         // console.log('pageAvatar:', pageAvatar);
    //     } else {
    //         console.log(res);
    //     }
    // });
}

const openEditPassword = () => {
    console.log("openEditPassword");
    fieldData.value.openEditPassword = true;
    console.log('fieldData', fieldData);
}


const hall = useHallState();
const logOut = () => {
    hall.hall.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/auth/login");
}



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

</script>



<template>
    <!-- Use grid layout to show Profile-->
    <!-- The left is Avatar, and the right is a card with tab-list
        tab-1 shows Username, email, and tab-2 shows  friends-->
  <div class="topBar">
    <TopNav/>
  </div>
    <Row :gutter="24" id="main">
        <Col :span="12"  class="colBox">
            <!-- src="https://i.pravatar.cc/700" -->
            <Avatar id="avatar" :src="pageAvatar"/>
        </Col>
        <Col :span="12" class="colBox">
            <Card id="rightCard" :hoverable="true" :elevation="4" :bordered="false">
                <div id="cardDiv">
                    <h3 id="title">{{ pageUserId===localUserId ? `${pageUserName}, 你好！` : `${pageUserName}的个人主页` }}</h3>
                <Tabs id="tabs" default-active-key="1" centered>
                    <TabPane key="1" tab="个人信息">
                        <List>
                            <ListItem>
                                <ListItemMeta title="用户名"></ListItemMeta>
                                <div>{{ pageUserName }}</div>
                            </ListItem>
                            <ListItem>
                                <ListItemMeta title="邮箱"></ListItemMeta>
                                <div>{{ pageEmail }}</div>
                            </ListItem>
                        </List>
                    </TabPane>
                    <TabPane key="2" tab="朋友" v-if="pageUserId===localUserId">

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
                                    <a key="list-loadmore-edit">删除</a>
                                    <a key="list-loadmore-more">聊天</a>
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
                                    <div>content</div>
                                    </Skeleton>
                                </ListItem>
                                </template>
                            </List>

                    </TabPane>
                </Tabs>
            </div>
            </Card>
        </Col>
    </Row>

    <Flex v-if="pageUserId===localUserId" :gap="customGapSize" id="buttonGroup" justify="center" align="center">
        <Button type="primary" @click="openEditProfile">修改个人信息</Button>
        <Button type="primary" @click="openEditPassword">修改密码</Button>
        <Button type="primary">添加好友</Button>
        <Button type="primary" @click="logOut">退出登录</Button>
    </Flex > 
    <EditProfile :userId="pageUserId" v-model="fieldData.openEditProfile" :userName="pageUserName" :userEmail="pageEmail" :avatar="pageAvatar"/>
    <EditPassword :userId="pageUserId" v-model="fieldData.openEditPassword"/>
</template>

<style scoped>
#main {
    padding: 0%;
    /* margin-top: 5vh;
    margin-bottom: 10vh; */
    min-width: 100vw;
    min-height: 90vh;
}

.colBox {
    display: flex;
    justify-content: center;
    align-items: center;
}

#avatar {
    width: 50%;
    height: 50%;
    object-fit: cover;
    transition: box-shadow .3s;
    
    /* filter: brightness(0.5); */
    
}
#avatar:hover {
    /* filter: brightness(0.5); */
    /* hover shade effect */
    box-shadow: 0 0 11px rgba(33,33,33,.2); 
}

#rightCard {
    width: 80%;
    height: 80%;
    object-fit: cover;
    margin: auto;
    padding: 10px;
}

#cardDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

#title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 20px;
}

#tabs {
    width: 100%;
    margin-top: 20px;
}

.demo-loadmore-list {
  min-height: 350px;
}

#FriendsList {
    max-height: 100%;
}

:deep(.ant-list-item-meta-content h4) {
    margin-top: 0;
}
.topBar {
  width: 100%;
  overflow: hidden; /* 隐藏超出部分 */
  height: 60px;
  position: relative; /* 确保 TopNav 绝对定位相对于 .top */
  z-index: 1005;
}

</style>
