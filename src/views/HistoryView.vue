<template>
  <div class="history">
    <Stars/>
    <div class="search-container">
      <InputSearch
        placeholder="Search by Game ID"
        enter-button
        @search="onSearch"
        v-model:value="searchValue"
      />
    </div>
    <div class="table-container">
    <Table :columns="columns" :dataSource="filteredHistory" rowKey="id" class="ant-table" :pagination=false :scroll="{ x: 1000, y: 420 }">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'team'">
          <span>{{ renderTeamMode(text) }}</span>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
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
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import { Table, Tag, InputSearch } from 'ant-design-vue';
import Stars from "@/components/Stars.vue";
import { generateGet } from "@/utils/protocol";

const localUserId = localStorage.getItem("userId");
const history = ref([]); // 创建一个ref来存储历史记录数据
const searchValue = ref(''); // 创建一个ref来存储搜索输入值

const columns = [
  {
    title: 'Game ID',
    dataIndex: 'gameId',
    key: 'gameId',
    sorter: (a, b) => a.gameId - b.gameId,
  },
  {
    title: 'Mode',
    dataIndex: 'team',
    key: 'team',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  }
]; // 定义表格列的配置


const renderTeamMode = (team) => {
  if (team === null || team === '' || team === 1 || team === 2 || team == 0) {
    return '单人模式';
  } else if (team > 2) {
    return '大逃杀模式';
  }
  return team;
};

const filteredHistory = computed(() => {
  if (!searchValue.value) {
    return history.value;
  }
  return history.value.filter(item => item.gameId.toString().includes(searchValue.value));
}); // 根据搜索值过滤历史记录数据

const onSearch = (value) => {
  searchValue.value = value;
}; // 搜索函数

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'green';
    case 'inactive':
      return 'red';
    default:
      return 'blue';
  }
}; // 定义状态颜色函数

const initHistory = async () => {
  if (localUserId) {
    try {
      const res = await generateGet("api/game/history", {
        userId: localUserId
      });
      console.log(res)
      if (res.status === 200 && res.data.status === 0) {
        history.value = res.data.data; // 更新历史记录数据
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  }
};

initHistory();
</script>

<style scoped>
.search-container {
  width: 25%; /* 设置搜索容器宽度为页面的75% */
  margin-bottom: 20px; /* 搜索容器底部外边距 */
  margin-top: 20px;
  margin-left: 37.5%; /* 搜索容器左外边距 */
}
.history {
  background-color: black; /* 设置背景为黑色 */
  min-height: 100vh; /* 至少为视口的100%高度 */
  display: flex;
  flex-direction: column; /* 垂直布局 */
  align-items: stretch; /* 使子元素填满容器宽度 */
}

.table-container {
  margin-left: 12.5%;
  width: 75%; /* 设置容器宽度为页面的75% */
  height: 75%; /* 设置容器高度为页面的75% */
  overflow: auto; /* 启用滚动 */
}

.ant-table{
  width: 100%; /* 设置表格宽度为页面的75% */
  height: 100%; /* 设置表格高度为页面的75% */
  background-color: black; /* 表格背景色为黑色 */
  color: white; /* 表格文字为白色 */
}

.ant-table-thead > tr > th {
  background-color: #333; /* 表头背景色 */
  color: white; /* 表头文字颜色 */
}

.ant-table-tbody > tr > td {
  background-color: black; /* 表格行背景色 */
  color: white; /* 表格行文字颜色 */
}

</style>
