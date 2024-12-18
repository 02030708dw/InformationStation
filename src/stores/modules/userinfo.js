import { defineStore } from "pinia";
import { ref } from "vue";
const option={
    persist: {
      enabled: true, //Store中数据持久化生效
      storage:sessionStorage
    },
  }
export const useUserStore = defineStore("UserState",() => {
    const memberId=ref('')//aia用户id
    const currency=ref('')//地区
    const country=ref('')//地区
    const merchantCode=ref('')//商户code
    const trialMerchantCode=ref('')//商户code
    const registerUrl=ref('')//aia注册地址
    const freeGameList=ref([])//游戏试玩列表
    return { memberId,currency,registerUrl,freeGameList,country,merchantCode,trialMerchantCode };
  },option);