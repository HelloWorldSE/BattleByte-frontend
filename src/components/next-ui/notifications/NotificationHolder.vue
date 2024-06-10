<script setup lang="ts">
import MessageBox from '@/components/next-ui/notifications/MessageBox.vue'
import { useNotifications } from '@/stores/notifications';

const notifications = useNotifications()

</script>

<template>
    <MessageBox v-for="msgBox in notifications._msgBoxes"
        :friendid="msgBox.friend_id" :roomid="msgBox.room_id" 
        :key="msgBox.key"/>
</template>

<style scoped>
</style>