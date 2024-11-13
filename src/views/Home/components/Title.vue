<template>
  <div class="title">
    <div class="left">
      <!-- <div class="left-icon"></div> -->
      <span>{{ text }}</span>
    </div>
    <div class="right" @click="emits('changeMore')">
      <span class="more">{{ $t('更多') }}</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>
<script setup>
const props = defineProps(["text"]);
const emits = defineEmits(["changeMore"]);
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    font-size: 18px;
    display: flex;
    gap: 10px;
    align-items: center;

    .left-icon {
      width: 4px;
      height: 16px;
      background-color: #f7931e;
      border-radius: 0 16px 16px 0;
    }
  }

  .right {
    cursor: pointer;
    display: flex;
    align-items: center;
    .more{
      color: #838383;
    }
    span {
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
