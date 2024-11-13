import { defineStore } from "pinia";
import { ref } from "vue";
const option={
    persist: {
      enabled: true, //Store中数据持久化生效
      storage:sessionStorage
    },
  }
export const usePageStore = defineStore("PageStore",() => {
    const isBack=ref(false)
    const MenuTitle=ref('')
    return { isBack,MenuTitle };
  },option);