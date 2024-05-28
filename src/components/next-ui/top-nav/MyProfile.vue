<script setup lang="ts">
import { Avatar, Progress } from 'ant-design-vue';
import LevelTip from './LevelTip.vue';
import ConnectionIndicator from '@/components/websocket/ConnectionIndicator.vue';
</script>

<template>
    <div class="wrapper">
        <div class="avatar-area">
            <Avatar :size="50"/>
        </div>
        <div class="info-area">
            <div class="info-text-area">
                <span class="info-text-name">
                    某机智的BBer
                    <ConnectionIndicator />
                </span>
                <LevelTip title="黄金IV" level="gold"/>
            </div>
            <div class="info-progress-area">
                <Progress :percent="30" :show-info="false" stroke-color="#f4d155" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    height: 4.5rem;
    max-width: 20.5rem;

    display: flex;

    user-select: none;
}
.avatar-area {
    width: 3.125rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.625rem;
}
.wrapper:hover {
    background-color: #d9d9d9;
}
.wrapper:active {
    background-color: rgba(0,0,0,0.1);
}

.info-area {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 1.3125rem;
    margin-left: 1.0625rem;
}

.info-text-area {
    padding-top: 0.9375rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}
.info-text-name {
    color: rgba(255,255,255,0.85);
    font-size: 1rem;
    font-family: sans-serif;
}

.info-progress-area {
    position: absolute;
    bottom: 0.3875rem;
    width: 100%;
}

</style>