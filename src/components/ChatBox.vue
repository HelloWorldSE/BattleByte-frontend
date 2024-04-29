<script setup lang="ts">
import { useHallState } from '@/stores/hall';
import { getUserId } from '@/utils/auth';

const hall = useHallState()
hall.chat_msg_callback = (data) => {
    console.log(`user ${data.fromId} says: ${data.message}`)
}

import { Input } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import { Row, Col } from 'ant-design-vue';

import { ref } from 'vue'

const msgToSend = ref<string>()
const sendMsg = () => {

    if (msgToSend.value) {
        hall.hall.chat_req('global', msgToSend.value)
    }
}
</script>

<template>
    <Row>
        <Col :span="10">
            <Input v-model:value="msgToSend"/>
        </Col>
        <Col :span="2">
            <Button @click="sendMsg">发送</Button>
        </Col>
    </Row>
</template>