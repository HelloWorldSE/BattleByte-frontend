<script setup lang="ts">

import { Button } from 'ant-design-vue';

import TestComponent from '@/components/TestComponent.vue'
import TopNav from "@/components/TopNav.vue";

</script>

<template>
  <main>
    <TopNav/>
    <TestComponent/>
    <Button>Test Button</Button>

  </main>
</template>
