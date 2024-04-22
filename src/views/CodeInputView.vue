<template>
  <div class="components-code-input" ref="selfDiv">
    <div class="area1">
      <select name="language" @change="changeLanguageHandle">
        <option value="c">c</option>
        <option value="cpp">c++</option>
        <option value="python">python</option>
        <option value="java">java</option>
        <option value="javascript">javascript</option>
      </select>

      <select name="theme" @change="handleChangeTheme">
        <option value="vs-dark">vsCode暗色主题</option>
        <option value="vs-light">vsCode亮色主题</option>
        <option value="hc-black">高对比度黑色主题</option>
      </select>

      <span>字体大小</span>
      <select name="fontSize" @change="handleChangeFontSize">
        <option value="14">14</option>
        <option value="18">18</option>
        <option value="20">20</option>
      </select>
      <span>行高</span>
      <select name="lineHeight" @change="handleChangeLineHeight">
        <option value="20">20</option>
        <option value="24">24</option>
        <option value="28">28</option>
      </select>

    </div>
    <div class="area2">

      <div ref="main" style="width: 100%; height: 1000px"/>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as monaco from 'monaco-editor';
import { generateCompletionItems } from '@/components/generateCompletionItem'; // 注意路径是否正确
import {editor} from "monaco-editor";

let monacoEditor = ref(null);
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
 init();
});

const init = () => {
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
      return { suggestions };
    },
  });
};

const theme = ref('vs-dark');
const fontSize = ref(14);
const lineHeight = ref(20);


const changeLanguageHandle = (event) => {
  const selectedLanguage = event.target.value;
  console.log(selectedLanguage);
  const selectedTemplate = codeTemplates[selectedLanguage];
  console.log(selectedTemplate);
  editor.getModels()[0]?.setValue(selectedTemplate);
};


const handleChangeTheme = (event) => {
  const selectedTheme = event.target.value;
  theme.value = selectedTheme;
  if (monacoEditor.value) {
    monacoEditor.value.updateOptions({ theme: selectedTheme });
  }
};


const handleChangeFontSize = (event) => {
  fontSize.value = parseInt(event.target.value);
  if (monacoEditor.value) {
    monacoEditor.value.updateOptions({ fontSize: fontSize.value });
  }
};

const handleChangeLineHeight = (event) => {
  lineHeight.value = parseInt(event.target.value);
  if (monacoEditor.value) {
    monacoEditor.value.updateOptions({ lineHeight: lineHeight.value });
  }
};

</script>
