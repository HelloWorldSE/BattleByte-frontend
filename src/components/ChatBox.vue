<script setup lang="ts">
import { useHallState } from '@/stores/hall';
import { getUserId } from '@/utils/auth';

const hall = useHallState()
hall.chat_msg_callback = (data) => {
    console.log(`user ${data.fromId} says: ${data.message}`)
    messages.value.push({
        speaker: data.fromId.toString(),
        msg: data.message,
        key: Date.now().toString()
    })
    if (data.fromId.toString() == getUserId()) {
        isSending.value = false
        msgToSend.value = ""
    }
    setTimeout(() => {
        messages.value.shift()
    }, 5000)
}

import { Input } from 'ant-design-vue';
import { Button } from 'ant-design-vue';
import { Row, Col } from 'ant-design-vue';

import { ref, computed, type ComponentPublicInstance } from 'vue'
import OneMsg from '@/components/chat/OneMsg.vue';

const msgToSend = ref<string>()
const sendMsg = () => {
    if (msgToSend.value) {
        isSending.value = true
        hall.hall.chat_req('global', msgToSend.value)
    }
}

const messages = ref<{speaker: string, msg: string, key: string}[]>([
])

const msgWidgets = ref<InstanceType<typeof OneMsg>[]>([])

const isSending = ref(false)

</script>

<template>
    <div class="wrapper">
        <div class="msg-fixer">
            <div class="msg">
                <TransitionGroup>
                    <OneMsg v-for="item in messages" :speaker="item.speaker" :msg="item.msg" :key="item.key" ref="msgWidgets"/>
                </TransitionGroup>
            </div>
        </div>
        <Row>
            <Col :span="10">
                <Input v-model:value="msgToSend"/>
            </Col>
            <Col :span="2">
                <Button @click="sendMsg" :disabled="isSending">发送</Button>
            </Col>
        </Row>
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
.msg-fixer {
    position: relative;
}
.msg {
    position: absolute;
    bottom: 0;
    width: 100%;
}
.v-move,
.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>