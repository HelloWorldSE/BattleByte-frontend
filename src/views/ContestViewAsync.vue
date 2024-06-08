<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LoadingPage from '@/components/next-ui/loading/LoadingPage.vue'
import { delay } from '@/utils/delay';
import { pageIs } from "@/utils/pageis";

pageIs('in-match')

const AsyncComp = defineAsyncComponent({
  // the loader function
  loader: async () => {
    // 这里可以加入匹配等待其他玩家加载之类的代码
    await delay(1000)
    return await import('./ContestView.vue')
  },

  // A component to use while the async component is loading
  loadingComponent: LoadingPage,
  // Delay before showing the loading component. Default: 200ms.
  delay: 200,
})

</script>

<template>
    <Transition name="fade" mode="out-in">
        <AsyncComp />
    </Transition>
</template>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>