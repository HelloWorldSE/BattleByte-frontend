<script setup lang="ts">
import { useDrawerState } from '@/stores/drawer';
import { generatePost } from '@/utils/protocol';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { Button, notification } from 'ant-design-vue';
import { h } from 'vue'

const props = defineProps<{
    title: string, 
    description: string,
    duration: number,
    _key: string,
    newBurningCircle: any,
    extraInfo: any
}>()

const close = () => {
    notification.close(props._key)
}


const processApplication = (appId: number, accept: boolean) => {
  generatePost('api/user/friend/process?accept='+((accept)?'true':'false'), 
    appId
  ).then((res) => {
    if (res.data.status === 0) {
    } else {
      console.error(res.data.msg);
    }
  });
}

const accept = (e: MouseEvent) => {
    const appId = props.extraInfo as unknown as number
    processApplication(appId, true)
    close()
    e.stopPropagation()
}

const decline = (e: MouseEvent) => {
    const appId = props.extraInfo as unknown as number
    processApplication(appId, false)
    close()
    e.stopPropagation()
}

const drawerState = useDrawerState()
const jump = () => {
    // TODO：打开侧边栏并跳转好友申请页
    drawerState.friendOpen = true
    close()
}
</script>

<template>
<div class="wrapper" @click="jump">
    <div class="content">
        <div class="header">
            {{props.title}}
        </div>
        <div class="message">
            {{props.description}}
        </div>
        <div class="buttons">
            <Button ghost shape="round" danger size="small" :icon="h(CloseOutlined)" @click="decline"></Button>
            <Button ghost shape="round" size="small" :icon="h(CheckOutlined)" @click="accept"></Button>
        </div>
    </div>
</div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    inset:0;
    background: #555;

    color: white;
}
.wrapper:hover {
    background: #777;
}
.wrapper:active {
    background: #555;
}

.wrapper::before {
    content: '';
    height: 100%;
    width: 2px;
    background: #c3c3c3;
    position: absolute;
}

.content {
    margin: 1rem;
    .header {
        font-weight: bold;
        font-size: 1.5rem;
    }
    .message {

    }
    .buttons {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 1rem;

        display: flex;
        justify-content: space-between;
    }
}
</style>