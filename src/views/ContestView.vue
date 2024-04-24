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
  height: 100%;
  float: left;
}

.top {
  width: 100%;
  height: 50px;
}
</style>
