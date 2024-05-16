<template>
  <router-view v-slot="{ Component }">
      <keep-alive :max="2">
        <component :is="Component" />
      </keep-alive>
    </router-view>
</template>
<script setup>
import {onMounted} from 'vue'
import {getUserInfo} from '@/api/request.js'
import {useUserInfo} from '@/stores/modules/userinfo.js'
const {setUserInfo} =useUserInfo()
onMounted(async ()=>{
  const id=window.location.pathname.slice(1)
  let res=await getUserInfo(id)
  setUserInfo(res.resultSet)
})

</script>
<style lang="scss">
  *{
    margin: 0px;
    padding: 0;
    box-sizing: border-box;
  }
</style>
