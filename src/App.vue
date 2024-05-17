<template>
  <router-view v-slot="{ Component }">
      <keep-alive :max="2">
        <component :is="Component" />
      </keep-alive>
    </router-view>
</template>
<script setup>
</script>
<style lang="scss">
  *{
    margin: 0px;
    padding: 0;
    box-sizing: border-box;
  }
  .van-loading{
    padding-top: 20px;
    display: flex;
    justify-content: center;
  }
</style>