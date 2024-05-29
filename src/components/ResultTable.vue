<template>
  <div>
    <Table :columns="columns" :dataSource="data" rowKey="id" :pagination=false >
      <template #status="{ text }">
        <Tag color="red">{{ text }}</Tag>
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
    title: 'When',
    dataIndex: 'when',
    key: 'when',
    customRender: ({ text }) => formatDate(text)
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' },
  },
  {
    title: 'Problem',
    dataIndex: 'problem',
    key: 'problem',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Memory',
    dataIndex: 'memory',
    key: 'memory',
  },
  {
    title: 'Language',
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
    when: item.create_time,
    status: status_name[item.result],
    problem: item.problem,
    time: item.statistic_info.time_cost,
    memory: item.statistic_info.memory_cost,
    language: item.language,
  }))
});

const getStatusColor = (status) => {
  const colors = {
    '-2': 'gray',
    '-1': 'red',
    '0': 'green',
    '1': 'orange',
    '2': 'orange',
    '3': 'purple',
    '4': 'red',
    '5': 'gray',
    '6': 'blue',
    '7': 'blue',
    '8': 'yellow',
    '9': 'blue'
  };
  return colors[status] || 'default';
};

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


</script>

<style scoped>
a-table {
  margin-top: 16px;
}

a-button {
  float: right;
}
</style>
