<template>
  <div class="menu">
    <div class="back" v-if="pageState.isBack" @click="changeBack($router)">
        <img src="../../assets/image/icon/back.png">
    </div>
    
    <ul class="menu-list" v-else>
      <li v-for="(item, i) in page" :key="i" :class="{ 'menu-item': true, active: item.name == $route.name }"
        @click="$router.push({ name: item.name })">
        {{ item.label }}
      </li>
    </ul>

    <div class="line"></div>
  </div>
</template>
<script setup>
import { onBeforeMount } from "vue";
import {useUserStore} from "@/stores/modules/userinfo.js"
import { usePageStore } from "@/stores/modules/pageState.js";
const pageState=usePageStore()
const userState =useUserStore()
const page = [
  { label: "Home", name: "Home" },
  { label: "Information", name: "Information" },
  { label: "Trend", name: "Trend" },
  { label: "Forecast", name: "Forecast" },
];

const changeBack=(router)=>{
  router.back()
  pageState.isBack=false
}


onBeforeMount(()=>{
  if(userState.memberId) page.unshift({label: "Game", name: "Game"})
})
</script>
<style scoped lang="scss">
.menu {
  position: sticky;
  top: 0;
  z-index: 999;
  &::before {
    z-index: 10;
    content: '';
    width: 100%;
    position: absolute;
    top: 0;
    height:50%;
    background-color: #333;
  }

  &::after {
    z-index: 10;
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 50%;
    background-color: #222;
  }
  .back{
    height: 40px;
    position: relative;
    z-index: 999;
    display: flex;
    align-items: center;
    padding-left: 10px;
    img{
      width: 20px;
      height: 20px;
    }
  }
  .menu-list {
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 20px;
    padding: 0 16px;
    z-index: 999;
    position: sticky;
    top: 0;
    content: '';

    .menu-item {
      cursor: pointer;
      line-height: 40px;
      color: #ffffff80;
    }

    .active {
      position: relative;
      color: #FF9500;

      &::after {
        content: "";
        width: 22px;
        height: 4px;
        background-color: #FF9500;
        position: absolute;
        left: calc(50% - 11px);
        bottom: 6px;
        border-radius: 10px;
      }
    }
  }
  .line{
    position: relative;
    z-index: 12;
    height: 4px;
    background-image: linear-gradient(to right, #be965d 0, #976f40 28%, #ffcb85 63%, #976f40);
  }
}
</style>
