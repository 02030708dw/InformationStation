<template>
  <Menu />
  <router-view v-slot="{ Component }">
    <transition :name="randomTransition()" >
      <KeepAlive :include="['Information', 'Home']">
        <component :is="Component" />
      </KeepAlive>
    </transition>
  </router-view>
</template>
<script setup>
import Menu from './Menu.vue';
const randomTransition = () => {
  const ary = ['scale', 'fade']
  const random = Math.floor(Math.random() * ary.length)
  return ary[random]
}
</script>
<style lang="scss">
//缩放
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

// 淡出淡入
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>