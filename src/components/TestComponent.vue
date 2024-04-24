<script setup lang="ts">
import { useConnector } from '@/stores/connector';
import { Button, Input } from 'ant-design-vue'
import { ref } from 'vue';

const connector = useConnector()
connector.conn.addListener("LOGIN_ACK", (e) => {console.log})

const content = ref("")

let cter = 0

const send_msg = () => {
    connector.conn.send("LOGIN_REQ", {token: content.value})
    connector.conn.send("MATCH_REQ", {type: 0x1}, (e)=>{console.log(`Server reports error`, e,cter++)})
}

import ConnectionIndicator from './websocket/ConnectionIndicator.vue';

</script>

<template>

<Input v-model:value="content" />

{{ content }}

<ConnectionIndicator/>

<Button @click="send_msg">
    abc
</Button>

</template>