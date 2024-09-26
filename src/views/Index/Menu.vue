<template>
  <div class="menu">
    <ul class="menu-list">
      <li v-for="(item, i) in page" :key="i" :class="{ 'menu-item': true, active: item.name == $route.name }"
        @click="$router.push({ name: item.name })">
        {{ item.label }}
      </li>
    </ul>
  </div>
</template>
<script setup>
const page = [
  { label: "Home", name: "Home" },
  { label: "Information", name: "Information" },
  { label: "Trend", name: "Trend" },
  { label: "Draw", name: "Draw" },
  { label: "Forecast", name: "Forecast" },
];
</script>
<style scoped lang="scss">
.menu {
  position: relative;
  &::before {
    content: '';
    width: 375px;
    position: absolute;
    top: 0;
    height: 50%;
    background-color: #333;
  }

  &::after {
    content: '';
    width: 375px;
    position: absolute;
    bottom: 0;
    height: 50%;
    background-color: #222;
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
      line-height: 44px;
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
}
</style>
