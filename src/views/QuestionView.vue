<template>
  <div class="components-question-area">
    <h1 v-if="data.title">{{ data.title }}</h1>
    <h1 v-else>标题</h1>
    <h2>题目背景</h2>
    <p>{{ data.questionBackground }}</p>
    <h2>题目描述</h2>
    <p v-html="data.describe" />
    <h2>交互格式说明</h2>
    <div class="leftRight">
      <div class="left">
        <h3>输入</h3>
        <p v-html="data.inputDescribe" />
      </div>
      <div class="right">
        <h3>输出</h3>
        <p v-html="data.outputDescribe" />
      </div>
    </div>
    <h2>交互格式样例</h2>
    <div class="leftRight">
      <div class="left">
        <h3>输入</h3>
      </div>
      <div class="right">
        <h3>输出</h3>
      </div>
    </div>
    <div v-for="(ioObj, idx) in data.ioEgg" :key="idx" class="leftRight">
      <div class="left">
        <div class="showArea">
          <div v-for="(str, idx) in ioObj.in.split('\n')" :key="idx" class="line">{{ str }}</div>
        </div>
      </div>
      <div class="right">
        <div class="showArea">
          <div v-for="(str, idx) in ioObj.out.split('\n')" :key="idx" class="line">{{ str }}</div>
        </div>
      </div>
    </div>
    <h2>提示</h2>
    <p v-html="data.tips" />
    <h2>标签</h2>
    <div class="tags">
      <span v-for="(str, idx) in data.tags" :key="idx" class="tag">{{ str }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';


const data = ref({
  title: '',
  describe: '',
  inputDescribe: '',
  outputDescribe: '',
  ioEgg: [] as any[],
  tips: '',
  tags: [],
  questionBackground: '',
});

onMounted(() => {
  fetchData();
});

async function fetchData() {
  try {
    const response = await axios.get(' http://81.70.241.166:1233/api/admin/problem?id=746'); // 替换成你的API地址
    Object.assign(data.value, response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    // 处理错误情况
  }
}
</script>

<style scoped>

.components-question-area {
  background-color: #1E1E1E; /* 设置背景为黑色 */
  color: white; /* 设置文字颜色为白色 */
}

/* 可以添加更多选择器来确保所有文字都是白色，如果需要的话 */
h1, h2, h3, p, .tag {
  margin-left: 10px;
  color: white;
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
}

/* 如果你想要让整个组件的背景铺满整个屏幕，可以添加以下样式 */
.components-question-area {
  min-height: 100vh;
}
</style>

