<script setup lang="ts">

import { useConnector } from '@/stores/connector';

import { computed } from 'vue';

import ReconnectingMessage from '@/components/messages/ReconnectingMessage.vue';

const connector = useConnector()

const rec_mes_show = computed(() => (
  connector.state == 'CONNECTING'
))

const delay_message_text = computed(() => (
  `连接丢失，将在 ${connector.delay} 秒后重连...`
))
const delay_mes_show = computed(() => (
  connector.delay > 0
))
</script>

<template>
  <ReconnectingMessage :show="rec_mes_show" type="LOADING" text="连接中" />
  <ReconnectingMessage :show="delay_mes_show" type="WARNING" :text="delay_message_text" />
</template>