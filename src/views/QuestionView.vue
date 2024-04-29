<template>
  <div class="components-question-area">
    <h1 v-if="data.title">{{ data.title }}</h1>
    <h1 v-else>标题</h1>
    <h2>题目描述</h2>
    <p v-html="data.description"/>
    <h2>交互格式说明</h2>
    <div>
      <div>
        <h3>输入</h3>
        <p v-html="data.input_description"/>
      </div>
      <div>
        <h3>输出</h3>
        <p v-html="data.output_description"/>
      </div>
    </div>
    <h2>交互格式样例</h2>


    <div v-for="(ioObj, idx) in data.samples" :key="idx" class="sample">
      <div class="input">
        <h3>输入
        <a class="copy-icon" @click="copyInput(ioObj.input)">
          <CopyOutlined />
        </a>
        </h3>
        <div class="showArea">
          <div v-for="(str, idx) in ioObj.input.split('\n')" :key="idx" class="line">{{ str }}</div>
        </div>
      </div>
      <div class="output">
        <h3>输出
          <a class="copy-icon" @click="copyInput(ioObj.output)">
            <CopyOutlined />
          </a></h3>
        <div class="showArea">

          <div v-for="(str, idx) in ioObj.output.split('\n')" :key="idx" class="line">{{ str }}</div>
        </div>
      </div>
    </div>

    <h2>标签</h2>
    <div class="tags">
      <span v-for="(str, idx) in data.tags" :key="idx" class="tag">{{ str }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted, reactive} from 'vue';
import {CopyOutlined} from '@ant-design/icons-vue';
import axios from 'axios';
import {message} from "ant-design-vue";

const copyInput = (inputText: string) => {
  const el = document.createElement('textarea');
  el.value = inputText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  message.success('复制成功');
};

const data = reactive({
  title: '',
  description: '',
  input_description: '',
  output_description: '',
  samples: [] as any[],
  tags: [],
});

onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const response = await axios.get(' http://81.70.241.166/api/api/oj/problem?id=1'); // 替换成你的API地址
    console.log(response.data.data.data);
    const list = response.data.data.data;
    data.title = list.title;
    data.description = list.description;
    data.input_description = list.input_description;
    data.output_description = list.output_description;
    data.samples = list.samples;
    data.tags = list.tags;

  } catch (error) {
    console.error('Error fetching data:', error);
    // 处理错误情况
  }
}
</script>

<style scoped>

.components-question-area {
  background-color: white; /* 设置背景为黑色 */
  color: #1E1E1E; /* 设置文字颜色为白色 */
}

/* 可以添加更多选择器来确保所有文字都是白色，如果需要的话 */
h1, h2, h3, p, .tag {
  margin-left: 10px;
  //color: white;
}

h1 {
  display: flex; /* 使用Flexbox布局 */
  flex-direction: column; /* 设置主轴方向为垂直 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
}

/* 如果你想要代码块中的文本也是白色，可以添加以下样式 */
.line {
  background-color: #111; /* 或者其他深色调以便于阅读 */
  color: white;
  margin-left: 10px;
}

/* 如果你想要让整个组件的背景铺满整个屏幕，可以添加以下样式 */
.components-question-area {
  min-height: 100vh;
}

.sample {
  display: flex;
  justify-content: space-between; /* 左右对齐 */

  .input, .output {
    flex-basis: 48%; /* 左右各占48%的宽度，留出一定的间距 */
    padding: 0 5px; /* 设置左右间距 */
  }
}

.showArea {
  background-color: #111; /* 或者其他深色调以便于阅读 */
  height: 75%; /* 让showArea占据父容器的全部高度 */
  display: flex;
  flex-direction: column;
}


</style>
