<template>
  <router-view v-slot="{ Component }">
    <KeepAlive :include="['index']">
      <component :is="Component" />
    </KeepAlive>
  </router-view>
</template>
<style lang="scss">
* {
  font-family: NotoSans-Regular, -apple-system, BlinkMacSystemFont, Roboto,
    Helvetica Neue, Helvetica, Tahoma, Arial, PingFang SC, Microsoft YaHei,
    sans-serif;

  /* 全局滚动条样式 */
  ::-webkit-scrollbar {
    width: 3px;
    /* 设置滚动条宽度 */
    height: 3px;
    /* 如果是水平滚动条，设置高度 */
  }

  /* 滚动条轨道 */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    /* 设置滚动条轨道的背景颜色 */
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background: #888;
    /* 设置滚动条滑块的颜色 */
    border-radius: 4px;
    /* 设置滑块的圆角 */
  }

  /* 滚动条滑块在悬停时 */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
    /* 悬停时改变滑块颜色 */
  }
}
</style>
