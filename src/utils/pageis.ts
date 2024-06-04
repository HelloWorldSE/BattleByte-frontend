import { pageIsStore, type PageId } from "@/stores/pageis"
import { computed } from "vue"

export { type PageId } from '@/stores/pageis'

export const pageIs = (pageId: PageId) => {
    pageIsStore().pageId = pageId
}

export const pageId = computed(() => {
    return pageIsStore().pageId
})