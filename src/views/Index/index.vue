<template>
  <div class="page-main">
    <Menu/>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import Menu from './Menu.vue';
</script>
<style scoped lang="scss">
.page-main{
  height: 100%;
  .router-view{
    height: calc(100% - 44px);
    overflow: auto;
  }
}
</style>