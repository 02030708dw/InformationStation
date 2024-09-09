<template>
  <div class="bottom">
    <div class="control">
      <div class="int-box">
        <input type="text" class="int" v-model="intValue" />
        <van-icon name="smile-o" size="24px" @click="showSmile = !showSmile" />
      </div>

      <div class="unfold">
        <van-icon name="guide-o" v-if="intValue" @click="send" />
        <van-icon name="add-o" v-else />
      </div>
    </div>

    <ul class="smile-box" v-if="showSmile">
      <li v-for="(item, i) in smileData" :key="i" class="smile-item" @click="changeSmile(item)">
        {{ item }}
      </li>
    </ul>
  </div>

</template>

<script setup>
import { ref } from "vue";
import smileData from "@/util/Smile.js";

const intValue = ref(""); //输入框内值

const showSmile = defineModel('showSmile')
const emit = defineEmits(['send'])
const send = () => {
  emit('send', {
    name: 'my',
    title: intValue.value,
    status: true,
  })
  intValue.value = ''
};

const changeSmile = (value) => {
  intValue.value += value;
};
</script>

<style lang="scss" scoped>
.h60 {
  height: 60px;
}

.h120 {
  height: 120px;
}

.bottom {
  width: 375px;
  position: fixed;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 1002;

  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    min-height: 60px;
  }

  .int-box {
    height: 36px;
    position: relative;

    .int {
      box-sizing: border-box;
      padding: 0 40px 0 20px;

      width: 320px;
      height: 36px;
      border-radius: 32px;
      outline: none;
      border: none;
      font-size: 14px;
    }

    .van-icon {
      top: 6px;
      right: 10px;
      position: absolute;
    }
  }

  .unfold {
    .van-icon {
      scale: 1.4;
    }
  }

  .smile-box {
    display: flex;
    flex-wrap: wrap;
    height: 120px;
    overflow: auto;

    .smile-item {
      font-size: 24px;
      text-align: center;
      box-sizing: border-box;
      width: 10%;
    }
  }
}
</style>
