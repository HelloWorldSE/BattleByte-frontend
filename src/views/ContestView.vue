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
  <Transition name="bounce">
    <LottiePage :animation-data="animationWin" v-show="is_win"/>
  </Transition>
  <Transition name="bounce">
    <LottiePage :animation-data="animationLose" v-show="is_lose"/>
  </Transition>
  <Transition name="bounce">
    <div class="animation-bg" v-show="is_lose || is_win">
      <div class="header">
        <span v-if="is_win">恭喜获胜！</span>
        <span v-else>遗憾落败…</span>
      </div>
      <div class="footer">
        <span v-if="is_win">戒骄戒躁，继续努力！</span>
        <span v-else>不要灰心，再接再厉！</span>
      </div>
    </div>
  </Transition>
  
  <div class="blur-bg-div" :class="is_lose || is_win?'blurred':undefined">
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
import { computed, ref } from "vue";
import { useHallState } from "@/stores/hall"
import router from "@/router";
import { message } from "ant-design-vue";
import LottiePage from "@/components/next-ui/loading/LottiePage.vue";

// const animationWin = ref<any>({})
// import ("@/assets/Animation-win.json").then((val) => animationWin.value=val)

import animationWin from "@/assets/Animation-win.json"
import animationLose from "@/assets/Animation-lose.json"
import { delay } from "@/utils/delay";
import { HallStatus } from "@/core/game/hall";
import { useSoundFX } from "@/stores/soundfx";


pageIs('in-match')

const pickedProblemId = ref<number>(0)

const game = useGameStore();
const currentProblemId = computed(() => 
  game.match_info?.info.questionId[pickedProblemId.value] ?? undefined
)

const is_win = ref(false)
const is_lose = ref(false)
const hall = useHallState()

const soundfx = useSoundFX()

hall.game_end_callback = (data) => {
  const match_res = data.result;
  if (match_res === "win") {
    is_win.value = true
    soundfx.play('game-win')
  } else {
    is_lose.value = true
    soundfx.play('game-lose')
  }
  
  delay(6000).then(() => {
    hall.hall.quit_settlement()
    router.push('/')
  })
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

.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.animation-bg {
  position: fixed;
  background-color: #fff;
  border-radius: 3rem;
  width:32rem;
  height: 35rem;
  
  z-index: 500;
  
  margin:auto;
  left:0;
  right:0;
  top:0;
  bottom:0;

  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .header {
    font-size: 3rem;
    padding-top: 0.5rem;
  }
  .footer {

  }
}

.blur-bg-div {
  position: fixed;
  z-index: 499;
  inset: 0;
  transition: all 5s;
  display: none;
}
.blur-bg-div.blurred {
  display: unset;
  opacity: 1;
  backdrop-filter: blur(5px);
  background-color: rgba(0,0,0,0.1);
}
</style>
