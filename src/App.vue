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
import { getRegion,DomainMappings } from './util/getRegion';
const userStore = useUserState()
onBeforeMount(async () => {
  let search = new URLSearchParams(window.location.search)
  userStore.memberId = search.get('u')||userStore.memberId
  if (userStore.memberId) {
    let { resultSet } = await getTransferInfo({ memberId: userStore.memberId })
    userStore.registerUrl=resultSet.url//分享注册地址
    userStore.freeGameList=resultSet.memberShareLinksResp//游戏列表
    userStore.currency=resultSet.currency//地区
    userStore.country=DomainMappings.find(i=>i.currency==resultSet.currency).country//地区
  }else{
    //域名 设置地区
    const { country, currency,merchantCode,trialMerchantCode }=getRegion()
    userStore.currency=currency//地区
    userStore.country=country//地区
    userStore.merchantCode=merchantCode//商户code
    userStore.trialMerchantCode=trialMerchantCode//商户code
  }
})
</script>
<style lang="scss">

</style>
