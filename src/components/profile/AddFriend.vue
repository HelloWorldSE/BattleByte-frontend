<template>
    <Modal v-model:open="modalVisible" title="添加新朋友" @ok="handleOk" @cancel="cancel" centered>
        <template #footer>
            <Button key="back" @click="cancel">关闭</Button>
        </template>
    <InputSearch v-model:value="searchValue" @search="searchUser" placeholder="请输入用户名" style="width: 100%" id="search"></InputSearch>
    <List class="loadMoreList" :loading="initLoading"
    item-layout="horizontal"
    :data-source="localUsers"
    id="UsersList">
    <template #loadMore>
        <div
                                    :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
                                >
                                <Pagination @change="onLoadMoreUsers" :current="curUserPage" :total="totalUsersPages * onePageUsers" :pageSize="onePageUsers" simple/>
                            </div>
    </template>
    <template #renderItem="{ item }">
        <ListItem>
            <template #actions>
                <a key="check-user" @click="checkUser(item)">查看</a>
                <a key="add-user" @click="addApplication(item)">发送申请</a>
            </template>
            <Skeleton avatar :title="false" :loading="!!item.loading" active>
                <ListItemMeta
                    :description="item.userEmail"
                >
                <template #title>
                                        <a @click="checkUser(item)">{{ item.userName }}</a>
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

    
    </Modal>
</template>

<script lang="ts" setup>
import { Modal, Button, Form, FormItem, Input, Upload, message, InputPassword, type FormInstance, InputSearch, List, ListItem, ListItemMeta, Skeleton, Avatar, Pagination } from 'ant-design-vue';
import { ref, reactive } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';

import { defineProps, defineEmits, computed } from 'vue';
import { generateGet, generatePost } from '@/utils/protocol';
import { useRoute, useRouter } from "vue-router";
import { Item } from 'ant-design-vue/es/menu';

const props = defineProps({ 
        userId: {
            type: String,
            required: true,
        },
        modelValue: {
            type: Boolean,
        },
    })

const loading = ref<boolean>(false);

const emit = defineEmits(['update:modelValue']);

const modalVisible = computed({
        get: () => props.modelValue,
        set: v => emit('update:modelValue', v),
    });

const handleOk = () => {
    loading.value = true;
    // do something
    emit('update:modelValue', false);
}

const cancel = () => {
        emit('update:modelValue', false);
    }

const searchValue = ref<string>('');
const localUsers = ref<Array<any>>([]);
const curUserPage = ref(1);
const totalUsersPages = ref(0);
const initLoading = ref(false);
const usersLoading = ref(false);
let onePageUsers = 5;
const router = useRouter();

const searchUser = () => {
    console.log("searchValue is", searchValue.value);

    usersLoading.value = true;
    generateGet("/api/user", {name:searchValue.value, pageSize:onePageUsers}).then((res) => {
        if (res.data.status === 0) {
            usersLoading.value = false;
            localUsers.value = res.data.data.content;
            console.log('localUsers', localUsers)
            curUserPage.value = res.data.data.pageable.pageNumber + 1;
            console.log('curUserPage', curUserPage);
            totalUsersPages.value = res.data.data.totalPages;
            console.log('totalUsersPages', totalUsersPages);

        } else {
            console.log(res);
            message.error(res.data.msg);
        }
    })
}

const onLoadMoreUsers = (val:any) => {
    console.log('curUserPage:', curUserPage);
    curUserPage.value = val;
    usersLoading.value = true;
    const xx = [...new Array(onePageUsers)].map(() => {
        return {
            loading: true,
            userName: {},
            avatar: {},
        }
    })
    localUsers.value = xx;
    generateGet("api/user", {name:searchValue.value, pageSize:onePageUsers, page:curUserPage.value}).then((res) => {
        if (res.data.status === 0) {
            usersLoading.value = false;
            localUsers.value = res.data.data.content;
            console.log('localUsers', localUsers)
            curUserPage.value = res.data.data.pageable.pageNumber + 1;
            console.log('curUserPage', curUserPage);
            totalUsersPages.value = res.data.data.totalPages;
            console.log('totalUsersPages', totalUsersPages);

        } else {
            console.log(res);
            message.error(res.data.msg);
        }});
};

const checkUser = (item:any) => {
    console.log("this user id is", item.id);
    router.push(`/user/profile/${item.id}`);

    // 服务器使用需要修改
    window.location.href = 'http://81.70.241.166/user/profile/' + item.id;
}

const addApplication = (item:any) => {
    generatePost('api/user/friend/add-apply', item.id).then((res) => {
        if (res.data.status === 0) {
            message.success('已经向' + item.userName + '发送申请');
        } else {
            // message.error('发送申请失败');
            message.error('发送申请失败, ' + res.data.msg);
        }
    })
}

</script>
<style scoped>

:deep(.ant-list-item-meta-content h4) {
    margin-top: 0;
}

#search {
    margin-bottom: 10px;
    margin-top: 20px;
}
</style>