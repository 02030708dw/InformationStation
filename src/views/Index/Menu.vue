<template>
  <div class="menu">
    <ul class="menu-list">
      <li v-for="(item, i) in page" :key="i" :class="{ 'menu-item': true, active: item.name == $route.name }"
        @click="$router.push({ name: item.name })">
        {{ item.label }}
      </li>
    </ul>
    <div class="line"></div>
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
    width: 100%;
    position: absolute;
    top: 0;
    height: 20px;
    background-color: #333;
  }

  &::after {
    content: '';
    width: 100%;
    position: absolute;
    bottom: 0;
    height: 20px;
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
    z-index: 2;
    height: 4px;
    background-image: linear-gradient(to right, #be965d 0, #976f40 28%, #ffcb85 63%, #976f40);
  }
}
</style>
