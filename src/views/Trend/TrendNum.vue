<template>
  <div class="title-trend">
    {{ info.type.replace(/^.*?_/, "") }}-{{ info.method.replace(/^.*?_/, "") }}
    {{ info.name }}
  </div>
  <div class="box-num" v-if="data">
    <ul class="chartbox" v-if="digitData.length != 2">
      <li
        v-for="(item, index) in digitData"
        :key="index"
        class="chartbox-item"
        :class="{ active: active == index }"
        @click="emits('changeChart', index)"
      >
        {{ index }}
      </li>
    </ul>

    <ul class="trend-num">
      <li class="num-item" v-for="(item, i) in truncatedTrendList" :key="i">
        {{ item.nums }}
      </li>
      <li class="num-item loading">
        <span class="dot-anim">.</span>
      </li>
      <li class="num-item" v-for="item in  29-data.trendRespList.slice(-28).length" ></li>
    </ul>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps(["data", "info", "digitData", "active"]);
const emits = defineEmits(["changeChart"]);
// 只保留最后29项数据
const truncatedTrendList = computed(() => {
  return props.data.trendRespList.slice(-28);
});
console.log(props.data)
</script>
<style lang="scss" scoped>
.title-trend {
  color: #fff;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
}
.box-num {
  display: flex;
}
.chartbox {
  width: 40px;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;

  .chartbox-item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #000;
    background-color: #e2e9fa;
  }

  .active {
    color: #fff;
    background-color: #0256ff;
  }
}
.trend-num {
  flex: 1;
  font-size: 12px;
  color: #fff;
  height: 130px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  border-radius: 2px;
  border: 1px solid #ccc;

  .num-item {
    text-align: center;
    height: 20%;
    line-height: 26px;
    min-width: 20px;
  }

  .num-item:nth-child(2n) {
    color: #333;
    background-color: #e2e9fa;
  }

  .num-item:nth-child(2n-1) {
    color: #333;
    background-color: #d6deed;
  }

  .loading {
    font-size: 14px;
    font-weight: bold;
  }

  .dot-anim::after {
    content: "";
    animation: dots 1s steps(3, end) infinite;
  }

  @keyframes dots {
    0% {
      content: ".";
    }
    50% {
      content: "..";
    }
    100% {
      content: "";
    }
  }
}
</style>
