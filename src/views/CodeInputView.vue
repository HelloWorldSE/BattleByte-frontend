<template>
  <div class="components-code-input" ref="selfDiv">
    <div class="area1">
      <Select style="width: 80px" v-model:value="language" @change="changeLanguageHandle">
        <SelectOption value="C">C</SelectOption>
        <SelectOption value="C++">C++</SelectOption>
        <SelectOption value="Python3">Python 3</SelectOption>
        <SelectOption value="Java">java</SelectOption>
        <SelectOption value="JavaScript">javascript</SelectOption>
      </Select>

      <Select name="theme" style="width: 150px" v-model:value="style" @change="handleChangeTheme">
        <SelectOption value="vs-dark">vsCode暗色主题</SelectOption>
        <SelectOption value="vs-light">vsCode亮色主题</SelectOption>
        <SelectOption value="hc-black">高对比度黑色主题</SelectOption>
      </Select>

      <span>字体大小</span>
      <Select name="fontSize" style="width: 60px" v-model:value="font" @change="handleChangeFontSize">
        <SelectOption value="14">14</SelectOption>
        <SelectOption value="18">18</SelectOption>
        <SelectOption value="20">20</SelectOption>
      </Select>

      <span>行高</span>
      <Select name="lineHeight" style="width: 60px" v-model:value="height" @change="handleChangeLineHeight">
        <SelectOption value="20">20</SelectOption>
        <SelectOption value="24">24</SelectOption>
        <SelectOption value="28">28</SelectOption>
      </Select>

    </div>
    <div class="area2">
      <div  ref="main" class="editor">
        <div v-for="pos, player in gameStore.posMap">
          <div class="curpos" :class="(player == my_userid) ? 'me' : 'enermy'" :style="curPosStyles[player]"></div>
          <div class="maxpos" :class="(player == my_userid) ? 'me' : 'enermy'" :style="maxLineStyles[player]"></div>
        </div>
        <TransitionGroup>
          <Tomato v-for="item in tomatoes" :show="item.show" :style="item.pos" :key="item.key"/>
        </TransitionGroup>
      </div>

      <div class="bottom">
        <div class="table">
          <template v-if="isResultShown">
            <ResultTable :result-array="resultArray" />
          </template>
          <template v-else>
            <ContestTable/>
          </template>
        </div>
        <div class="other">
          <div class="chat-box">
            <ChatBox/>
          </div>
          <Button class="showResult" @click="handleResult" >
            {{ isResultShown ? '收起评测结果' : '显示评测结果' }}
          </Button>

          <!-- 提交按钮 -->
          <Button class="submit-button" @click="handleSubmit" type="primary" shape="round">
            提交
          </Button>

          <div>
            <Button class="surrender-button" @click="surrender">
              投降
              <template #icon><FlagOutlined /> </template>
            </Button>
          </div>
          <div>
            <Button class="tomato-button" @click="tomato(1)">🍅</Button>
            <Button class="tomato-3-button" @click="tomato(3)">🍅x3</Button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {Button, Select, SelectOption, message} from 'ant-design-vue';
import {FlagOutlined} from '@ant-design/icons-vue';
import * as monaco from 'monaco-editor';

import {generateCompletionItems} from '@/components/generateCompletionItem'; // 注意路径是否正确

import {useGameStore} from '@/stores/game';

import ChatBox from '@/components/ChatBox.vue';
import {useHallState} from '@/stores/hall';
import {getUserId} from '@/utils/auth';
import {generatePost} from '@/utils/protocol';
import router from '@/router';
import Tomato from '@/components/items/tomato.vue';
import ContestTable from "@/components/ContestTable.vue";
import ResultTable from "@/components/ResultTable.vue";


const props = defineProps({
  problemId: Number
})

const surrender = () => {
  hall.hall.surrender()
}

const tomato = (number) => {
  if (number == 1) {
    hall.hall.use_item('tomato')
  } else if (number == 3) {
    hall.hall.use_item('tomato3')
  }
}

const create_tomato = () => {
  if (main) {
    const editorContainer = main.value
    const x = Math.random() * editorContainer.offsetWidth
    const y = Math.random() * editorContainer.offsetHeight / 2

    tomatoes.value.push({
      show: true,
      pos: {left: `${x}px`, top: `${y}px`},
      key: performance.now().toString()
    })
    setTimeout(() => {
      tomatoes.value.shift()
    }, 5000)
  }
}

const tomatoes = ref([])
const item_used_callback = (data) => {
  if (data.type == 'tomato') {
    create_tomato()
  } else if (data.type == 'tomato3') {
    create_tomato()
    create_tomato()
    create_tomato()
  }
}

const hall = useHallState()
hall.item_used_callback = item_used_callback


let monacoEditor = null;
const language = ref('C++');
const style = ref('vs-light');
const font = ref('14');
const height = ref('20');
const selfDiv = ref(null);
const main = ref(null);
let isResultShown = ref(false);

const codeTemplates = {
  'C++': `#include <iostream>\n\nint main() {\n\t// Your C++ code here\n\treturn 0;\n}`,
  'C': `#include <stdio.h>\n\nint main() {\n\t// Your C code here\n\treturn 0;\n}`,
  'Python3': `# Your Python code here`,
  'Java': `public class Main {\n\tpublic static void main(String[] args) {\n\t\t// Your Java code here\n\t}\n}`,
  'JavaScript': `// Your JavaScript code here`,
};

const languageIds = {
  'C++': `cpp`,
  'C': `c`,
  'Python3': `python`,
  'Java': `java`,
  'JavaScript': `javascript`,
};

const curpos_pos_my = ref({top: '0px', height: '20px'})
const maxpos_pos_my = ref({top: '0px'})

let curLineNumber = 1
let curColumn = 1
const scrollOffset = ref(0)

const resultArray = [];

const updateMaxLine = () => {
  const maxLine = monacoEditor?.getModel().getLineCount()
  gameStore.posMap[my_userid.value].total_rows = maxLine
}
const updatePosShow = () => {
  gameStore.posMap[my_userid.value].row = curLineNumber
  gameStore.posMap[my_userid.value].col = curColumn
}
const sendPosUpdate = () => {
  hall.hall.pos_update(
      gameStore.posMap[my_userid.value].row,
      gameStore.posMap[my_userid.value].col,
      gameStore.posMap[my_userid.value].total_rows
  )
}

hall.pos_sync_callback = (data) => {
  const {user_id, ...rest} = data
  gameStore.posMap[user_id] = rest
}

onMounted(() => {
  monacoEditor = monaco.editor.create(main.value, {
    theme: 'vs-light',
    value: codeTemplates['C++'],
    language: 'cpp',
    folding: true,
    foldingHighlight: true,
    foldingStrategy: 'indentation',
    showFoldingControls: 'always',
    disableLayerHinting: true,
    emptySelectionClipboard: false,
    selectionClipboard: false,
    automaticLayout: true,
    codeLens: false,
    scrollBeyondLastLine: false,
    colorDecorators: true,
    accessibilitySupport: 'off',
    lineNumbers: 'on',
    lineNumbersMinChars: 5,
    enableSplitViewResizing: false,
    readOnly: false,
    lineHeight: 20,
  });
  // 注册 C++ 的代码补全提供器
  monaco.languages.registerCompletionItemProvider('cpp', {
    provideCompletionItems: (model, position, context, token) => {
      // 获取当前行的文本
      const lineText = model.getLineContent(position.lineNumber);
      // 根据当前行文本生成代码补全项
      const suggestions = generateCompletionItems(lineText);
      return {suggestions};
    },
  });

  updateMaxLine()
  sendPosUpdate()
  monacoEditor.onDidChangeModelContent(updateMaxLine)

  monacoEditor.onDidChangeCursorPosition((e) => {
    curLineNumber = e.position.lineNumber
    curColumn = e.position.column
    updatePosShow()

    sendPosUpdate()
  })
  monacoEditor.onDidScrollChange((e) => {
    scrollOffset.value = -e.scrollTop
    updateMaxLine()
    updatePosShow()
  })

});


const theme = ref('vs-dark');
const fontSize = ref(14);
const lineHeight = ref(20);

const my_userid = ref(Number.parseInt(getUserId()))
const curPosStyles = ref({})
const maxLineStyles = ref({})

const gameStore = useGameStore()
gameStore.posMap = {}
for (const player of Object.values(gameStore.match_info.playerMap)) {
  gameStore.posMap[player] = {row: 1, col: 1, total_rows: 1}
  curPosStyles.value[player] = computed(() => {
    const curLineNumber = gameStore.posMap[player].row
    return {
      top: `${(curLineNumber - 1) * lineHeight.value + scrollOffset.value}px`,
      height: `${lineHeight.value}px`
    }
  })
  maxLineStyles.value[player] = computed(() => {
    const maxLine = gameStore.posMap[player].total_rows
    return {
      top: `${maxLine * lineHeight.value + scrollOffset.value}px`
    }
  })
}

const submit_id_to_refresh = ref()

const refresh_submit_status = () => {
  hall.hall.answer_refresh(submit_id_to_refresh.value)
}

let refresh_timeout = null

const status_name = {
  '-2': 'Compile Error',
  '-1': 'Wrong Answer',
  '0': 'Accepted',
  '1': 'Time Limit Exceeded',
  '2': 'Time Limit Exceeded',
  '3': 'Memory Limit Exceeded',
  '4': 'Runtime Error',
  '5': 'System Error',
  '6': 'Pending',
  '7': 'Judging',
  '8': 'Partial Accepted',
  '9': 'Submitting'
}

const refresh_submit_status_callback = (data) => {
  if (data.result.data.result !== undefined) {
    if (data.result.data.result !== 6 && data.result.data.result !== 7 && data.result.data.result !== 9) {
      if (data.result.data.result === 0) {
        message.success({content: '通过！', duration: 2, key: 'oj-pending'})
      } else {
        message.warn({
          content: `未能通过，评测状态：${status_name[data.result.data.result.toString()]}`,
          duration: 2,
          key: 'oj-pending'
        })
      }
      clearInterval(refresh_timeout)
    }
  }
  resultArray.push(data.result.data)
  console.log(resultArray)

}


hall.answer_result_callback = refresh_submit_status_callback


const handleResult = () => {
  isResultShown.value = !isResultShown.value;
};

//处理提交事件
const handleSubmit = async () => {
  //获取编辑器中的代码
  const code = monacoEditor.getModel().getValue();
  console.log(code);

  console.log(`STAGE B`, gameStore.match_info, gameStore.match_info.info.questionId)
  if (props.problemId === undefined) {
    console.warn('未选中题目，本次提交已取消。')
    return
  }

  generatePost("/api/oj/submit", {
    problem_id: props.problemId,
    language: language.value,
    code: code
  }).then(res => {
    if (res.data.status === 0) {
      console.log("提交成功");
    }

    console.log(res)



    submit_id_to_refresh.value = res.data.data.data.id
    if (refresh_timeout) {
      clearInterval(refresh_timeout)
    }
    refresh_timeout = setInterval(
        refresh_submit_status
        , 3000);

    message.loading({content: '正在评测...', duration: 0, key: 'oj-pending'})

  })

};



const changeLanguageHandle = (event) => {
  const selectedLanguage = event;
  console.log(selectedLanguage);
  const selectedTemplate = codeTemplates[selectedLanguage];
  console.log(selectedTemplate);
  monacoEditor?.getModel().setValue(selectedTemplate);
  if (monacoEditor) {
    monaco.editor.setModelLanguage(monacoEditor.getModel(), languageIds[selectedLanguage])
  }
};


const handleChangeTheme = (event) => {
  const selectedTheme = event;
  theme.value = selectedTheme;
  monacoEditor?.updateOptions({theme: selectedTheme});
};


const handleChangeFontSize = (event) => {
  fontSize.value = parseInt(event);
  monacoEditor?.updateOptions({fontSize: fontSize.value});
  updateMaxLine()
  updatePosShow()
};

const handleChangeLineHeight = (event) => {
  lineHeight.value = parseInt(event);
  monacoEditor?.updateOptions({lineHeight: lineHeight.value});

  curpos_pos_my.value.height = `${lineHeight.value}px`
  updateMaxLine()
  updatePosShow()
};

</script>

<style scoped>
.area2 {
  display: flex;
  flex: 1;
  min-height: 0;
  flex-direction: column;
}

.components-code-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.editor {
  width: 100%;
  /* height: 400px; */
  flex: 1;
  position: relative;
  min-height: 0;
}

.bottom {
  width: 100%;
  height: 200px;
  /* flex: 1; */
  position: relative;
  overflow: hidden;
}

.table {
  width: 80%;
  height: 100%;
  float: left;
  overflow-y: scroll;
}

.other {
  width: 20%;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.submit-button {
  width: 50%;
  margin: 5px;
  z-index: 1000; /* Ensure the button is above the editor */
}

.surrender-button {
  width: 50%;
  margin: 5px;
  z-index: 1000; /* Ensure the button is above the editor */
}

.tomato-button {
  width: 48%;
  z-index: 1000; /* Ensure the button is above the editor */
}

.tomato-3-button {
  width: 48%;
  z-index: 1000; /* Ensure the button is above the editor */
}

.chat-box {
  width: 100%;
  z-index: 1000;
  height: 28px;
}

.maxpos {
  position: absolute;
  content: "";
  width: 100%;
  height: 1px;
  z-index: 1000;
}

.maxpos.me {
  background-color: green;
}

.maxpos.enermy {
  background-color: red;
}

.curpos {
  position: absolute;
  content: "";
  width: 3px;
  background-color: green;
  z-index: 1000;
}

.curpos.me {
  background-color: green;
}

.curpos.enermy {
  background-color: red;
}

.showResult {
  margin-top: 5px;
  width: 75%;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-leave-to {
  opacity: 0;
}

.pcjg {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
