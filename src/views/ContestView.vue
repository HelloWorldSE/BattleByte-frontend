<template>
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
import ContestTable from "@/components/ContestTable.vue";
import { pageIs } from "@/utils/pageis";

pageIs('in-match')
</script>

<style scoped>
.left {
  width: 50%;
  height: 650px; /* 为左右两部分设置一个固定高度 */
  overflow-y: scroll;
  float: left;
}
.right {
  width: 50%;
  height: 650px; /* 为左右两部分设置一个固定高度 */
  float: left;
  overflow: hidden; /* 取消垂直滚动条 */
}

</style>
