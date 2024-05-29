<template>
  <div class="left">
    <QuestionView :problem-id="currentProblemId" v-if="currentProblemId !== undefined"/>
    <div v-else>没有选中题目！</div>
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
import { useGameStore } from "@/stores/game";
import { computed } from "vue";

pageIs('in-match')

const game = useGameStore();
const currentProblemId = computed(() => 
  game.match_info?.info.questionId[game.match_info.info.currentQuestion] ?? undefined
)


</script>

<style scoped>
.left {
  width: 50%;
  height: 100%; /* 为左右两部分设置一个固定高度 */
  overflow-y: scroll;
  float: left;
}
.right {
  width: 50%;
  height: 100%; /* 为左右两部分设置一个固定高度 */
  float: left;
  overflow: hidden; /* 取消垂直滚动条 */
}

</style>
