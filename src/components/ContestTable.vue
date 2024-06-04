<template>
  <Table :columns="columns" :data-source="data" :pagination="false">
    <template v-slot:bodyCell="data">
      <template v-if="data.column.key === 'hp'">
        <BloodBar :value="data.text"/>
      </template>
      <template v-else>
        {{ data.text }}
      </template>
    </template>
  </Table>
</template>

<script lang="ts" setup>
import { useGameStore } from '@/stores/game';
import BloodBar from './BloodBar.vue';
import { Table } from "ant-design-vue";
import { computed, ref } from 'vue';

// 为ref函数提供泛型参数
const columns = ref<Column[]>([
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    dataIndex: 'name',
    title: 'Name',
    key: 'name',
  },
  {
    key: 'hp',
    title: 'HP',
    dataIndex: 'hp',
    customCell: (text: any) => ({
      template: `<template v-for="(item, index) in text" :key="index"> <BloodBar :value="item.value" /></template>`,
    }),
  },
  {
    title: 'AC',
    dataIndex: 'ac',
    key: 'ac',
  }

]);

const game = useGameStore()

const data = computed(() => {
  const dataItems: DataItem[] = []
  for (const teamId in game.match_info?.playerMap) {
    const playerId = game.match_info.playerMap[teamId]
    dataItems.push({
      key: playerId.toString(),
      name: 'NONAME',
      rank: 0,
      hp: game.match_info.HPMAP[playerId],
      ac: game.match_info.acMAP[playerId]
    })
  }
  return dataItems
})

interface DataItem {
  key: string;
  name: string;
  rank: number;
  hp: number;
  ac: number;
}

interface Column {
  dataIndex?: string;
  key: string;
  title: string;
  customCell?: (text: any) => any;
}


</script>

