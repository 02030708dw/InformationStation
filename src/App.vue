<template>
  <router-view v-slot="{ Component }">
    <KeepAlive :include="['index']">
      <component :is="Component" />
    </KeepAlive>
  </router-view>
  <div class="lang">
    <button @click="locale='cn'">中文</button>
    <button @click="locale='th'">泰文</button>
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import { useUserStore } from './stores/modules/userinfo';
import { getTransferInfo } from '@/api/index.js'
import { getRegion,DomainMappings } from './util/getRegion';
import { useI18n } from 'vue-i18n';
const {locale} =useI18n()
const userState = useUserStore()
onBeforeMount(async () => {
  let search = new URLSearchParams(window.location.search)
  userState.memberId = search.get('u')||userState.memberId
  if (userState.memberId) {
    let { resultSet } = await getTransferInfo({ memberId: userState.memberId })
    userState.registerUrl=resultSet.url//分享注册地址
    userState.freeGameList=resultSet.memberShareLinksResp//游戏列表
    userState.currency=resultSet.currency//地区
    userState.country=DomainMappings.find(i=>i.currency==resultSet.currency).country//地区
  }else{
    //域名 设置地区
    const { country, currency,merchantCode,trialMerchantCode }=getRegion()
    userState.currency=currency//地区
    userState.country=country//地区
    userState.merchantCode=merchantCode//商户code
    userState.trialMerchantCode=trialMerchantCode//商户code
  }
})
</script>
<style lang="scss">
.lang{
  position: fixed;
  z-index: 999999;
  top: 0;
  right:0;
}
</style>
