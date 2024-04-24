<template>
  <div class="components-code-input" ref="selfDiv">
    <div class="area1">
      <Select style="width: 80px" v-model:value="language" @change="changeLanguageHandle">
        <SelectOption value="c">c</SelectOption>
        <SelectOption value="cpp">c++</SelectOption>
        <SelectOption value="python">python</SelectOption>
        <SelectOption value="java">java</SelectOption>
        <SelectOption value="js">javascript</SelectOption>
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
      <div ref="main" class="editor"/>
      <!-- 提交按钮 -->
      <Button class="submit-button" @click="handleSubmit" type="primary" shape="round">
        提交
      </Button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {Button,Select,SelectOption} from 'ant-design-vue';
import * as monaco from 'monaco-editor';
import {generateCompletionItems} from '@/components/generateCompletionItem'; // 注意路径是否正确
import {editor} from "monaco-editor";

let monacoEditor = ref(null);
const language = ref('cpp');
const style = ref('vs-dark');
const font = ref('14');
const height = ref('20');
const selfDiv = ref(null);
const main = ref(null);

const codeTemplates = {
  cpp: `#include <iostream>\n\nint main() {\n\t// Your C++ code here\n\treturn 0;\n}`,
  c: `#include <stdio.h>\n\nint main() {\n\t// Your C code here\n\treturn 0;\n}`,
  python: `# Your Python code here`,
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\t// Your Java code here\n\t}\n}`,
  javascript: `// Your JavaScript code here`,
};

onMounted(() => {
  monacoEditor.value = monaco.editor.create(main.value, {
    theme: 'vs-dark',
    value: codeTemplates.cpp,
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

});

const theme = ref('vs-dark');
const fontSize = ref(14);
const lineHeight = ref(20);


//处理提交事件
const handleSubmit = () => {
  const code = editor.getModels()[0]?.getValue();
  console.log(code);
};

const changeLanguageHandle = (event) => {
  const selectedLanguage = event;
  console.log(selectedLanguage);
  const selectedTemplate = codeTemplates[selectedLanguage];
  console.log(selectedTemplate);
  editor.getModels()[0]?.setValue(selectedTemplate);
};


const handleChangeTheme = (event) => {
  const selectedTheme = event;
  theme.value = selectedTheme;
  if (monacoEditor.value) {
    monacoEditor.value.updateOptions({theme: selectedTheme});
  }
};


const handleChangeFontSize = (event) => {
  fontSize.value = parseInt(event);
  if (monacoEditor.value) {
    monacoEditor.value.updateOptions({fontSize: fontSize.value});
  }
};

const handleChangeLineHeight = (event) => {
  lineHeight.value = parseInt(event);
  if (monacoEditor.value) {
    monacoEditor.value.updateOptions({lineHeight: lineHeight.value});
  }
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
  height: 620px;
  flex: 1;
}

.submit-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
</style>
