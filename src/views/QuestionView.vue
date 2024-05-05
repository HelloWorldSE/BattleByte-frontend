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
      <Tag v-for="(str, idx) in data.tags" :key="idx" class="tag" color="blue" >{{ str }}</Tag>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from 'vue';
import {CopyOutlined} from '@ant-design/icons-vue';
import axios from 'axios';
import {message,Tag} from "ant-design-vue";
import {useGameStore} from "@/stores/game";



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

const game = useGameStore();
console.log(game.match_info?.info.questionId);
const problemId = game.match_info?.info.questionId;
console.log(problemId);

async function fetchData() {
  try {
    const response = await axios.get(`http://81.70.241.166/api/api/oj/problem?id=${problemId}`); // 替换成你的API地址
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
  min-height: 100vh;
  overflow-y: auto; /* 添加垂直滚动条 */
}

/* 可以添加更多选择器来确保所有文字都是白色，如果需要的话 */
h1, h2, h3, p, .tag {
  margin-left: 10px;
}

h1 {
  display: flex; /* 使用Flexbox布局 */
  flex-direction: column; /* 设置主轴方向为垂直 */
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
}

/* 如果你想要代码块中的文本也是白色，可以添加以下样式 */
.line {
  color: black;
  margin-left: 10px;
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
  background-color: #eaf3f8; /* 或者其他深色调以便于阅读 */
  height: 75%; /* 让showArea占据父容器的全部高度 */
  display: flex;
  flex-direction: column;
}


</style>
