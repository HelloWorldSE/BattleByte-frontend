<template>
  <Table :columns="columns" :data-source="data" :pagination="false">
    <template v-slot:bodyCell="data">
      <template v-if="data.column.key === 'hp'">
        <template v-for="i in data.text">
          <HeartFilled style="color: red" />
        </template>
      </template>
      <template v-else>
        {{ data.text }}
      </template>
    </template>
  </Table>
</template>

<script lang="ts" setup>
import {HeartFilled } from '@ant-design/icons-vue';
import { Table } from "ant-design-vue";
import { ref } from 'vue';

// 为ref函数提供泛型参数
const columns = ref<Column[]>([
  {
    dataIndex: 'name',
    title: 'Name',
    key: 'name',
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    key: 'hp',
    title: 'HP',
    dataIndex: 'hp',
    customCell: (text: any) => ({
      template: `<template v-for="i in ${text}"><HeartFilled style="color: red" /></template>`,
    }),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'AC',
    dataIndex: 'ac',
    key: 'ac',
  }

]);

const data = ref<DataItem[]>([
  {
    key: '1',
    name: 'Sword',
    rank: 1,
    hp: 5,
    quantity: 3,
    ac: 10,
  },
  {
    key: '2',
    name: 'Shield',
    rank: 2,
    hp: 3,
    quantity: 2,
    ac: 15,
  },
  {
    key: '3',
    name: 'Potion',
    rank: 3,
    hp: 1,
    quantity: 5,
    ac: 20,
  },
  {
    key: '4',
    name: 'Bow',
    rank: 4,
    hp: 2,
    quantity: 1,
    ac: 25,
  },
  {
    key: '5',
    name: 'Arrow',
    rank: 5,
    hp: 1,
    quantity: 10,
    ac: 30,
  },
]);

interface DataItem {
  key: string;
  name: string;
  rank: number;
  hp: number;
  quantity: number;
  ac: number;
}

interface Column {
  dataIndex?: string;
  key: string;
  title: string;
  customCell?: (text: any) => any;
}


</script>

