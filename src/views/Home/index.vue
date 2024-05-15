<template>
  <div class="home">
    <NavBar/>
    <router-view></router-view>
    <ul class="tab-bar">
      <li>首页</li>
      <li>开奖</li>
      <li>体育</li>
      <li>分析</li>
    </ul>
  </div>
</template>
<script setup>
import NavBar from "@/components/NavBar/index.vue";

</script>
<style lang="scss" scoped>
.home{
  padding-top: 50px;
  .tab-bar{
  display: flex;
  li{
    flex: 1;
  }
}
}

</style>
