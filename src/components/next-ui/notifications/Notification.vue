<script setup lang="ts">
import { CheckOutlined, CloseOutlined } from '@ant-design/icons-vue';
import { Button, notification } from 'ant-design-vue';
import { h } from 'vue'

const props = defineProps<{
    title: string, 
    description: string,
    duration: number,
    _key: string,
    newBurningCircle: any
}>()

const close = () => {
    notification.close(props._key)
}

const accept = () => {
    // TODO: 接受好友申请
    close()
}

const jump = () => {
    // TODO：打开侧边栏并跳转好友申请页
    close()
}
</script>

<template>
<div class="wrapper" @click="jump">
    <div class="content">
        <div class="header">
            USERNAME
        </div>
        <div class="message">
            申请添加您为好友
        </div>
        <div class="buttons">
            <Button ghost shape="round" danger size="small" :icon="h(CloseOutlined)" @click="close"></Button>
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