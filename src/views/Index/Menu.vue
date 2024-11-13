<template>
  <div class="menu">

    <transition>
      <div class="back" v-if="pageState.isBack">
        <img src="../../assets/image/icon/back.png" @click="changeBack($router)">
        {{ $t(pageState.MenuTitle) }}
      </div>

      <div class="menu-list" v-else>
        <router-link class="menu-item" :to="{ name: item.name }" v-for="(item, i) in page" :key="i">
          {{ $t(item.label) }}
        </router-link>
      </div>
    </transition>


    <div class="line"></div>
  </div>
</template>
<script setup>
import { onBeforeMount } from "vue";
import { useUserStore } from "@/stores/modules/userinfo.js"
import { usePageStore } from "@/stores/modules/pageState.js";
const pageState = usePageStore()
const userState = useUserStore()
const page = [
  { label: "首页", name: "Home" },
  { label: "资讯", name: "Information" },
  { label: "走势", name: "Trend" },
  { label: "预测", name: "Forecast" },
];

const changeBack = (router) => {
  router.back()
  pageState.isBack = false
}


onBeforeMount(() => {
  if (userState.memberId) page.unshift({ label: "游戏", name: "Game" })
})
</script>
<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.menu {
  height: 44px;
  position: sticky;
  top: 0;
  z-index: 999;

  &::before {
    z-index: 10;
    content: '';
    width: 100%;
    position: absolute;
    top: 0;
    height: 50%;
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

  .back {
    width: 100%;
    text-align: center;
    color: #fff;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      position: absolute;
      left: 10px;
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
    position: absolute;
    top: 0;
    left: 0;
    content: '';

    .menu-item {
      cursor: pointer;
      line-height: 40px;
      color: #ffffff80;
    }

    .router-link-exact-active {
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

  .line {
    position: absolute;
    bottom: 0;
    z-index:999;
    width: 100%;
    height: 4px;
    background-image: linear-gradient(to right, #be965d 0, #976f40 28%, #ffcb85 63%, #976f40);
  }
}
</style>
