import { defineStore } from "pinia";
import { ref } from "vue";

export type PageId = 'home' | 'in-match' | 'rooms' | 'other'

export const pageIsStore = defineStore('pageIs', () => {
    const pageId = ref<PageId>('other')
    
    return {
        pageId
    }
})