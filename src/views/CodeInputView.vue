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

      <Select name="theme"  style="width: 150px" v-model:value="style" @change="handleChangeTheme">
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
      <div ref="main" class="editor">
        <div class="curpos_my" :style="curpos_pos_my"></div>
        <div class="maxpos_my" :style="maxpos_pos_my"></div>
      </div>
      <!-- 提交按钮 -->
      <Button class="submit-button" @click="handleSubmit" type="primary" shape="round">
        提交
      </Button>
      <div class="chat-box">
        <ChatBox />
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {Button,Select,SelectOption, message} from 'ant-design-vue';
import * as monaco from 'monaco-editor';
import axios from 'axios';
import {generateCompletionItems} from '@/components/generateCompletionItem'; // 注意路径是否正确

import { useGameStore } from '@/stores/game';

import ChatBox from '@/components/ChatBox.vue';
import { useHallState } from '@/stores/hall';

let monacoEditor = null;
const language = ref('C++');
const style = ref('vs-light');
const font = ref('14');
const height = ref('20');
const selfDiv = ref(null);
const main = ref(null);


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

const curpos_pos_my = ref({top: '0px', height: '19px'})
const maxpos_pos_my = ref({top: '0px'})

let curLineNumber = 1
let scrollOffset = 0

const updateMaxLine = () => {
  const maxLine = monacoEditor?.getModel().getLineCount()
  const lineHeight = monacoEditor?.getOption(monaco.editor.EditorOption.lineHeight)
  maxpos_pos_my.value.top = `${maxLine * lineHeight + scrollOffset}px`
}
const updatePosShow = () => {
  const lineHeight = monacoEditor.getOption(monaco.editor.EditorOption.lineHeight)
  curpos_pos_my.value.top = `${(curLineNumber - 1) * lineHeight + scrollOffset}px`
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
  monacoEditor.onDidChangeModelContent(updateMaxLine)

  monacoEditor.onDidChangeCursorPosition((e) => {
    curLineNumber = e.position.lineNumber
    updatePosShow()
  })
  monacoEditor.onDidScrollChange((e) => {
    scrollOffset = - e.scrollTop
    updateMaxLine()
    updatePosShow()
  })

});

const theme = ref('vs-dark');
const fontSize = ref(14);
const lineHeight = ref(20);

const gameStore = useGameStore()

const submit_id_to_refresh = ref()

const hall = useHallState()


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
  if (typeof data.result === 'string') {
    // temporary MATCH_END pack
    const match_res = data.result;
    message.success(match_res, 2)

  } else {
    if (data.result.data.result !== undefined) {
      if (data.result.data.result !== 6 && data.result.data.result !== 7 && data.result.data.result !== 9) {
        if (data.result.data.result === 0) {
          message.success({content: '通过！', duration: 2, key: 'oj-pending'})
        } else {
          message.warn({content: `未能通过，评测状态：${status_name[data.result.data.result.toString()]}`, duration: 2, key: 'oj-pending'})
        }
        clearInterval(refresh_timeout)
      }
    }
  }
}

hall.answer_result_callback = refresh_submit_status_callback

//处理提交事件
const handleSubmit = async () => {
  //获取编辑器中的代码
  const code = monacoEditor.getModel().getValue();
  console.log(code);

  console.log(`STAGE B`, gameStore.match_info, gameStore.match_info.info.questionId)
  axios.post("/api/api/oj/submit",{
    problem_id: gameStore.match_info.info.questionId + 745,
    language: language.value,
    code: code
  }, {headers: {"Content-Type": "application/json"}}).then(res => {
    if(res.data.status === 0){
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
.components-code-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.editor {
  width: 100%;
  height: 617px;
  flex: 1;
  position: relative;
}

.submit-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1000; /* Ensure the button is above the editor */
}
.chat-box {
  position: absolute;
  bottom: 10px;
  right: 90px;
  width: 30%;
  z-index: 1000;
}

.maxpos_my {
  position: absolute;
  content: "";
  width: 100%;
  height: 1px;
  background-color: green;
  z-index: 1000;
}
.curpos_my {
  position: absolute;
  content: "";
  width: 3px;
  background-color: green;
  z-index: 1000;
}

</style>
