import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserInfo = defineStore("UserInfo",() => {
    const UserInfo = ref(null);
    const setUserInfo=(v)=>UserInfo.value=v
    return { UserInfo,setUserInfo };
  },{persist:true});

