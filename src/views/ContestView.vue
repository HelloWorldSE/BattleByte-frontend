<template>
  <div class="top">
    <TopNav/>
  </div>
  <div class="left">
    <QuestionView/>
  </div>
  <div class="right">
    <CodeInputView />
  </div>
</template>
<script setup lang="ts">
import CodeInputView from "@/views/CodeInputView.vue";
import QuestionView from "@/views/QuestionView.vue";
import TopNav from "@/components/TopNav.vue";
</script>

<style scoped>
.left,
.right {
  width: 50%;
  height: 650px; /* 为左右两部分设置一个固定高度 */
  float: left;
  overflow-y: auto; /* 添加垂直滚动条 */
}

.top {
  width: 100%;
  overflow: hidden; /* 隐藏超出部分 */
  height: 60px;
  position: relative; /* 确保 TopNav 绝对定位相对于 .top */
}
</style>
