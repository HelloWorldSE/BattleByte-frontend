<template>
  <div>
    <Table sticky :columns="columns" :dataSource="data" rowKey="id" :pagination=false >
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'status'">
          <Tag :color="getStatusColor(text)">
            {{text}}
          </Tag>
        </template>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup>
import {computed} from 'vue';
import {Table,Tag} from "ant-design-vue";

// 定义 props 接收参数
const props = defineProps({
  resultArray: {
    type: Array,
    required: true,
  }
});


const columns = [
  {
    title: '时间',
    dataIndex: 'when',
    key: 'when',
    // customRender: ({ text }) => formatDate(text)
    width: '20%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: '12%',
  },
  {
    title: '题目号',
    dataIndex: 'problem',
    key: 'problem',
    width: '17%',
  },
  {
    title: '时间消耗',
    dataIndex: 'time',
    key: 'time',
    ellipsis: true
  },
  {
    title: '内存消耗',
    dataIndex: 'memory',
    key: 'memory',
    ellipsis: true
  },
  {
    title: '语言',
    dataIndex: 'language',
    key: 'language',
  },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const data = computed(() => {
  return props.resultArray.map(item => ({
    when: formatDate(item.create_time),
    status: status_name[item.result],
    problem: item.problem,
    time: `${item.statistic_info.time_cost} ms`,
    memory: `${(item.statistic_info.memory_cost / 1024/1024).toFixed(1)} MB`,
    language: item.language,
  }))
});

const getStatusColor = (status) => {
  const colors = {
    'CE': 'gray',
    'WA': 'red',
    'AC': 'green',
    'TLE': 'orange',
    'MLE': 'purple',
    'RE': 'red',
    'SE': 'gray',
    'PD': 'blue',
    'JDG': 'blue',
    'PA': 'yellow',
    'SBM': 'blue'
  };
  return colors[status] || 'default';
};

const status_name = {
  '-2': 'CE',
  '-1': 'WA',
  '0': 'AC',
  '1': 'TLE',
  '2': 'TLE',
  '3': 'MLE',
  '4': 'RE',
  '5': 'SE',
  '6': 'PD',
  '7': 'JDG',
  '8': 'PA',
  '9': 'SBM'
}


</script>

<style scoped>
a-table {
  margin-top: 16px;
}

a-button {
  float: right;
}
</style>
