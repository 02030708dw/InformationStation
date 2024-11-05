<template>
    <Menu />
      <router-view v-slot="{ Component }">
        <KeepAlive :include="['Information','Home']">
          <component :is="Component" />
        </KeepAlive>
      </router-view>
</template>
<script setup>
import Menu from './Menu.vue';
</script>