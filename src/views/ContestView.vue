<template>
  <div class="left">
    <div class="question-content">
      <QuestionView :problem-id="currentProblemId" v-if="currentProblemId !== undefined"/>
      <div v-else>没有选中题目！</div>
    </div>
    <div class="question-picker">
      <QuestionPicker v-model="pickedProblemId"/>
    </div>
  </div>
  <div class="right">
      <CodeInputView :problem-id="currentProblemId"/>
  </div>
  <LottiePage :animation-data="animationWin" v-show="is_win"/>
</template>
<script setup lang="ts">
import CodeInputView from "@/views/CodeInputView.vue";
import QuestionView from "@/views/QuestionView.vue";
import QuestionPicker from "@/components/next-ui/QuestionPicker.vue"
import TopNav from "@/components/TopNav.vue";
import ContestTable from "@/components/ContestTable.vue";
import { pageIs } from "@/utils/pageis";
import { useGameStore } from "@/stores/game";
import { computed, ref } from "vue";
import { useHallState } from "@/stores/hall"
import router from "@/router";
import { message } from "ant-design-vue";
import LottiePage from "@/components/next-ui/loading/LottiePage.vue";

// const animationWin = ref<any>({})
// import ("@/assets/Animation-win.json").then((val) => animationWin.value=val)

import animationWin from "@/assets/Animation-win.json"
import { delay } from "@/utils/delay";


pageIs('in-match')

const pickedProblemId = ref<number>(0)

const game = useGameStore();
const currentProblemId = computed(() => 
  game.match_info?.info.questionId[pickedProblemId.value] ?? undefined
)

const is_win = ref(false)
const hall = useHallState()

hall.game_end_callback = (data) => {
  const match_res = data.result;
  if (match_res === "win") {
    is_win.value = true

    delay(6000).then(() => {
      router.push('/')
    })
  } else {
    message.info(match_res)
  }
  message.info(match_res)
}



</script>

<style scoped>
.left {
  width: 50%;
  height: 100%; /* 为左右两部分设置一个固定高度 */
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
  overflow-y: scroll;
}

.question-picker {
  width: 100%;
}

</style>
