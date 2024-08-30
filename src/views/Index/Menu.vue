<template>
  <ul class="menu">
    <li
      v-for="(item,i) in page"
      :key="i"
      :class="{ 'menu-item': true, active: item.name == $route.name }"
      @click="$router.push({ name: item.name })"
    >
      {{ item.label }}
    </li>
  </ul>
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
//   height: 44px;
  background-color: #333333;
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 20px;
  padding: 0 16px;
  position: sticky;
  top: 0;

  ::before {
    // height: 20px;
    background-color: #484848;
  }

  .menu-item {
    cursor: pointer;
    line-height: 44px;
    color: #ffffff80;
  }
  .active {
    position: relative;
    color: #fff;
    &::after {
      content: "";
      width: 22px;
      height: 4px;
      background-color: #fff;
      position: absolute;
      left: calc(50% - 11px);
      bottom: 6px;
      border-radius: 10px;
    }
  }
}
</style>
