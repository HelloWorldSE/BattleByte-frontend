<script lang="ts" setup>
import { Spin } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'black'
  },
  spin: true,
});

const props = defineProps<{
    loading: boolean
}>()
</script>

<template>
  <Spin :indicator="indicator" :spinning="loading"
        style="height: 100%">
    <slot></slot>
  </Spin>
</template>