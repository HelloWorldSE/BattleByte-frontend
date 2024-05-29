<template>
  <div class="left">
    <div class="question-content">
      <QuestionView :problem-id="currentProblemId" v-if="currentProblemId !== undefined"/>
      <div v-else>没有选中题目！</div>
    </div>
    <div class="question-picker">
      <QuestionPicker />
    </div>
  </div>
  <div class="right">
      <CodeInputView :problem-id="currentProblemId"/>
  </div>
</template>
<script setup lang="ts">
import CodeInputView from "@/views/CodeInputView.vue";
import QuestionView from "@/views/QuestionView.vue";
import QuestionPicker from "@/components/next-ui/QuestionPicker.vue"
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

  display: flex;
  flex-direction: column;
}
.right {
  width: 50%;
  height: 100%; /* 为左右两部分设置一个固定高度 */
  float: left;
  overflow: hidden; /* 取消垂直滚动条 */
}

.question-content {
  flex: 1;
  min-height: 0;
  width: 100%;
}

.question-picker {
  width: 100%;
}

</style>
