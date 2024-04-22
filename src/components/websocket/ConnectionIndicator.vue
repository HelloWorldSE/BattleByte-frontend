<script setup lang="ts">

import { useConnector } from '@/stores/connector';
import { computed, ref } from 'vue';


const connector = useConnector()


const status_class = computed(() => {
    switch (connector.state) {
        case 'CONNECTED':
            return 'status_connected'
        case 'CLOSED':
            return 'status_closed'
        case 'CONNECTING':
            return 'status_reconnecting'
    }
})
const status_str = computed(() => {
    switch (connector.state) {
        case 'CONNECTED':
            return '已连接'
        case 'CLOSED':
            return '已断开'
        case 'CONNECTING':
            return '连接中'
    }
})

</script>

<template>
    <div class="status_box" :class="status_class">
      <span>{{status_str}}</span>
    </div>
</template>

<style>

.status_box {
  position: relative;
  color: #8E8E93;
  font-size: 12px;
  display: flex;
  align-items: center;
}
.status_box::before {
  display: inline-block;
  content: '';
  padding: 5px;
  margin-right: 10px;
  line-height: 0;
  background: #ddd;
  border-radius: 50%;
}
.status_reconnecting::before {
  background: rgb(255, 238, 0);
}
.status_closed::before {
  background: #ddd;
}
.status_connected::before {
  background: #0d2;
}
</style>