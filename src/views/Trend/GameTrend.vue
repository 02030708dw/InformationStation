<template>
  <div class="card">

    <div class="title-trend">
      <p>
        {{ info.type.replace(/^.*?_/, '') }}-{{ info.method.replace(/^.*?_/, '') }}
        {{ info.name }}
      </p>
      <!-- <p class="continuous" v-if="data?.combo > 3 && data">{{ data.combo }}连</p> -->
      <div class="continuous" v-if="data?.combo > 3 && data">
        <span :class="currentColour">{{ currentColour }}</span> x {{ data.combo }}
      </div>
    </div>

    <div class="GameTrend">

      <ul class="chartbox" v-if="digitData.length != 2">
        <li v-for="(item, index) in digitData" class="chartbox-item" :class="{ active: active == index }"
          @click="changeChart(index)">
          {{ index }}
        </li>
      </ul>

      <div class="trendbox" ref="trend">
        <table ref="table" class="table"></table>
      </div>

    </div>
  </div>


</template>
<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
const props = defineProps({
  data: { required: true },
  info: { type: Object, required: true },
  digitData: { type: Object, required: false },
  active: { type: [String, Number] }
});
const emits = defineEmits(['digitSize', 'digitOE'])
const trend = ref(null)//走势图容器
const table = ref(null)//走势图
const currentColour = ref("");

onMounted(() => {
  createGrid()
})
watch(props, () => {
  createGrid()
})
function createGrid() {
  if (!props.data) return
  table.value.innerHTML = ""
  const minColumns = 20;
  const minRows = 6;  // 最小行数
  let maxRows = 0;
  let maxCols = 0;
  props.data.trendRespList.forEach((item) => {
    const x = item.xy[0];
    const y = Math.abs(item.xy[1]);
    if (x > maxRows) maxRows = x;
    if (y > maxCols) maxCols = y;
  });
  // 确保 maxCols 至少为 minRows
  maxCols = Math.max(maxCols, minRows);
  const totalColumns = Math.max(minColumns, maxRows) + 1;
  for (let i = 0; i < maxCols; i++) {
    const row = table.value.insertRow();
    for (let j = 0; j < totalColumns; j++) {
      row.insertCell().classList.add("empty");
    }
  }
  props.data.trendRespList.forEach((item) => {
    const x = item.xy[0] - 1;
    const y = maxCols + item.xy[1];
    const rowIndex = maxCols - 1 - y;
    const colIndex = x + (totalColumns - maxRows - 1);
    const cell = table.value.rows[rowIndex].cells[colIndex];
    cell.className = item.colour;
    cell.setAttribute("data-content", item.colour);
    currentColour.value = item.colour;
  });
  nextTick(() => { trend.value.scrollLeft = trend.value.scrollWidth; });
}
const changeChart = (index) => {
  if (props.info.name == 'big/small') {
    emits('digitSize', index)
  }
  else {
    emits('digitOE', index)
  }
}
</script>
<style lang="scss">
  @keyframes flashText {
    0% {
      text-shadow:
        1px 1px 2px black,
        0 0 5px red,
        0 0 5px orange,
        0 0 5px yellow;
      color: red;
    }
    50% {
      text-shadow:
        1px 1px 2px black,
        0 0 5px orange,
        0 0 5px yellow,
        0 0 5px green;
      color: orange;
    }
    100% {
      text-shadow:
        1px 1px 2px black,
        0 0 5px yellow,
        0 0 5px green,
        0 0 5px blue;
      color: yellow;
    }
  }
.card {
  box-sizing: border-box;
  padding: 10px;
  width: 343px;
  margin: 10px auto;
  background-color: $themebgColor;
  border-radius: 7px;

  .title-trend {
    color: #fff;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;

    .continuous {
    margin-right: 20px;
    font-size: 17px;
    text-align: center;
    color: red;
    line-height: 30px;
    text-shadow: 1px 1px 2px black;
    animation: flashText 1.5s infinite alternate; /* 添加动画 */

    span {
      display: inline-block;
      width: 16.5px;
      height: 16.5px;
      line-height: 17px;
      font-size: 13px;
      border-radius: 50px;
      color: #fff;
      font-weight: 300;
      text-shadow: none;
      text-align: center;
      vertical-align: middle;
    }
    .A {
      background-color: #1173eb;
    }

    .S {
      background-color: #ebae43;
    }

    .B {
      background-color: red;
    }

    .O {
      background-color: #ebae43;
    }

    .E {
      background-color: red;
    }
  }
  }

  .GameTrend {
    // padding: 0 10px;
    display: flex;

    .chartbox {
      width: 40px;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      gap: 10px;

      .chartbox-item {
        border-radius: 4px;
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
        background-color: #f97f32;
      }
    }

    .trendbox {
      border-left: 1px solid #aaa;
      border-right: 1px solid #aaa;
      font-size: 16px;
      border-radius: 2px;
      overflow-x: auto;
      scrollbar-width: none;
      flex: 1;

      .table {
        border-spacing: 0;
        background: #34373d;
        // background-color: #e2e9fa;
        min-width: max-content;
      }

      tbody {
        width: max-content;
      }

      tr {
        border-collapse: collapse;
      }

      td {
        font-size: 14px;
        width: 18.5px;
        height: 18.5px;
        border: 1px solid #aaa;
        color: white;
        position: relative;
      }

      .common-circle {
        content: attr(data-content);
        position: absolute;
        border-radius: 50%;
        inset: 0;
        margin: auto;
        width: 16.5px;
        line-height: 16.5px;
        text-align: center;
        height: 16.5px;
        z-index: 1;
        transform: translate(0.25px, 0.25px);
      }

      .A::before {
        @extend .common-circle;
        background: #1173eb;
      }

      .S::before {
        @extend .common-circle;
        background: #ebae43;
      }

      .B::before {
        @extend .common-circle;
        background: red;
      }

      .O::before {
        @extend .common-circle;
        background: #ebae43;
      }

      .E::before {
        @extend .common-circle;
        background: red;
      }
    }
  }
}
</style>
