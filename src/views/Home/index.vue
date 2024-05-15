<template>
  <div class="home">
    <NavBar/>
    <TabBar :list="TabBarList"/>
    <router-view></router-view>
  </div>
</template>
<script setup>
import NavBar from "@/components/NavBar/index.vue";
import TabBar from "./TabBar.vue"
import {ref,reactive} from 'vue'
const TabBarList=reactive([
  {label:'赛事',name:'Match'},
  {label:'开奖',name:'Draw'},
  {label:'体育',name:'Sports'},
  {label:'分析',name:'Analysis'},
])
</script>
<style lang="scss" scoped>
.home{
  padding-top: 50px;
}
</style>
