<template>
    <div>
      <Modal  v-model:visible="modalVisible" title="通知" @ok="handleOk" @cancel="cancel" centered>
        <template #footer>
            <Button key="back" @click="cancel">关闭</Button>
        </template>
        <InputSearch v-model:value="searchValue" @search="searchApp" placeholder="请输入用户名" style="width: 100%" id="search"></InputSearch>
        <List class="loadMoreList" :loading="initLoading"
        item-layout="horizontal"
        :data-source="localApps"
        id="AppsList">
        <template #loadMore>
            <div :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
                <Pagination @change="onLoadMoreApps" :current="curAppPage" :total="totalAppsPages * onePageApps" :pageSize="onePageApps" simple/>
            </div>
          </template>
          <template #renderItem="{ item }">
              <ListItem>
                  <template #actions>
                      <a key="check-user" @click="checkUser(item)">查看</a>
                      <a key="add-user" @click="processApplication(item)">处理</a>
                  </template>
                  <Skeleton avatar :title="false" :loading="!!item.loading" active>
                      <ListItemMeta :description="item.userEmail">
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
    </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
    import { Modal, Button, InputSearch, List, ListItem, message } from 'ant-design-vue';
    import { computed, ref } from 'vue';
import { generateGet, generatePost } from '@/utils/protocol';
import { useRouter } from 'vue-router';
    
  const props = defineProps({
    modelValue: {
      type: Boolean,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  
  const modalVisible = computed({
    get: () => props.modelValue,
    set: v => emit('update:modelValue', v),
  });

  // 确定按钮的回调
  const handleOk = () => {
    console.log('%c Line:21 🧀', 'color:#6ec1c2');
    emit('update:modelValue', false);
  };

  const cancel = () => {
    console.log('%c Line:25 🧀', 'color:#6ec1c2');
    emit('update:modelValue', false);
  };

  const searchValue = ref<string>('');
  const localApps = ref<Array<any>>([]);
  const curAppPage = ref(1);
  const totalAppsPages = ref(0);
  const onePageApps = 5;
  const initLoading = ref(true);
  const appsLoading = ref(false);
  const accept = ref(false);
  const router = useRouter();

  const initApplications = async () => {
    console.log('%c Line:41 🧀', 'color:#6ec1c2');
    generateGet('api/user/friend/apply', {pageSize:onePageApps}).then((res) => {
      if (res.data.status === 0) {
        console.log("res is", res);
        localApps.value = res.data.data.content;
        initLoading.value = false;
        curAppPage.value = res.data.data.pageable.pageNumber + 1;
        totalAppsPages.value = res.data.data.totalPages;
      } else {
        console.log("res is", res);
        message.error(res.data.msg);
      }
    });
  };

  initApplications();

  const searchApp = () => {
    console.log("searchValue is", searchValue.value);

    appsLoading.value = true;
    generateGet('api/user/friend/apply', {name:searchValue.value, pageSize:onePageApps}).then((res) => {
      if (res.data.status === 0) {
        console.log("res is", res);
        localApps.value = res.data.data.content;
        appsLoading.value = false;
        curAppPage.value = res.data.data.pageable.pageNumber + 1;
        totalAppsPages.value = res.data.data.totalPages;
      } else {
        console.log("res is", res);
        message.error(res.data.msg);
      }
      
    });
  };

  const onLoadMoreApps = (val:any) => {
    console.log('curAppPage is', curAppPage.value);
    curAppPage.value = val;
    appsLoading.value = true;
    const xx = [...new Array(onePageApps)].map(() => {
        return {
            loading: true,
            userName: {},
            avatar: {},
        }
    })
    localApps.value = xx;
    generateGet("api/user/friend/apply", {name:searchValue.value, pageSize:onePageApps, page:curAppPage.value}).then((res) => {
        if (res.data.status === 0) {
            appsLoading.value = false;
            localApps.value = res.data.data.content;
            console.log('localApps', localApps)
            curAppPage.value = res.data.data.pageable.pageNumber + 1;
            console.log('curUserPage', curAppPage);
            totalAppsPages.value = res.data.data.totalPages;
            console.log('totalUsersPages', totalAppsPages);

        } else {
            console.log(res);
            message.error(res.data.msg);
        }});
  }

  const checkUser = (item:any) => {
    console.log("this user id is", item.id);
    router.push(`/user/profile/${item.id}`);

    // 服务器使用需要修改
    window.location.href = 'http://81.70.241.166/user/profile/' + item.id;
}

const processApplication = (item:any) => {
  generatePost('api/user/friend/process', {accept:accept}).then((res) => {
    if (res.data.status === 0) {
      if (accept) {
        message.success('已同意');
      } else {
        message.success('已拒绝');
      }
      // message.success('已同意');
    } else {
      message.error(res.data.msg);
    }
  });
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
