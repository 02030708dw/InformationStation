<template>
  <router-view v-slot="{ Component }">
    <KeepAlive :include="['index']">
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useUserState } from './stores/modules/userinfo';
import { getTransferInfo } from '@/api/index.js'
import { getRegion } from './util/getRegion';
const userStore = useUserState()
onBeforeMount(async () => {
  let search = new URLSearchParams(window.location.search)
  userStore.memberId = search.get('u')||userStore.memberId
  if (userStore.memberId) {
    let { resultSet } = await getTransferInfo({ memberId: userStore.memberId })
    userStore.registerUrl=resultSet.url//分享注册地址
    userStore.currency=resultSet.currency
    userStore.freeGameList=resultSet.memberShareLinksResp
  }else{
    //域名 设置地区
    const { country, currency,merchantCode,trialMerchantCode }=getRegion()
    console.log(country, currency,merchantCode,trialMerchantCode)
  }
})
</script>
<style lang="scss">

</style>
