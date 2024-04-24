<template>
  <div class="components-question-area">
    <h1>{{ title }}</h1>
    <h2>题目背景</h2>
    <p>{{ questionBackground }}</p>
    <h2>题目描述</h2>
    <p v-html="describe" />
    <h2>交互格式说明</h2>
    <div class="leftRight">
      <div class="left">
        <h3>输入</h3>
        <p v-html="inputDescribe" />
      </div>
      <div class="right">
        <h3>输出</h3>
        <p v-html="outputDescribe" />
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
    <div v-for="(ioObj, idx) in ioEgg" :key="idx" class="leftRight">
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
    <p v-html="tips" />
    <h2>标签</h2>
    <div class="tags">
      <span v-for="(str, idx) in tags" :key="idx" class="tag">{{ str }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    describe: String,
    inputDescribe: String,
    outputDescribe: String,
    ioEgg: Array,
    tips: String,
    tags: Array,
    questionBackground: String,
  },
};
</script>

<style scoped>
/* 样式可以根据需要自行添加 */
</style>
