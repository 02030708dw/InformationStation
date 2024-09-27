import { defineStore } from "pinia";
import { ref } from "vue";
const option={
    persist: {
      enabled: true, //Store中数据持久化生效
      storage:sessionStorage
    },
  }
export const useUserState = defineStore("UserState",() => {
    const shareId=ref('')
    return { shareId };
  },option);