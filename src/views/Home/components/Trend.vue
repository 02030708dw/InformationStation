<template>
  <div class="trend">
    <Title text="Trend" @changeMore="$router.push({ name: 'Trend' })" />
    <div class="trend-title">{{ matchingLottery.gameCode }}</div>
    <div class="trendbox" ref="trend">
      <table ref="table" class="table"></table>
    </div>
  </div>
</template>
<script setup>
import { ref,reactive, onMounted, nextTick } from "vue";
import Title from "./Title.vue";
import { getGameTrend } from "@/api/index.js"
import { getRegion } from "@/util/getRegion.js"; // 引入获取地区信息的函数
const region = getRegion();
const table = ref(null);
const trend = ref(null);
onMounted(() => {
  getTrend()
});
function createGrid(Data) {
  table.value.innerHTML = "";
  const minColumns = 20;
  const minRows = 6; // 最小行数
  let maxRows = 0;
  let maxCols = 0;
  Data.forEach((item) => {
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
  Data.forEach((item) => {
    const x = item.xy[0] - 1;
    const y = maxCols + item.xy[1];
    const rowIndex = maxCols - 1 - y;
    const colIndex = x + (totalColumns - maxRows - 1);
    const cell = table.value.rows[rowIndex].cells[colIndex];
    cell.className = item.colour;
    cell.setAttribute("data-content", item.colour);
  });
  nextTick(() => {
    trend.value.scrollLeft = trend.value.scrollWidth;
  });
}
function resetCoordinates(Data) {
  Data.forEach((entry) => {
    // Generate random x between 1 and 14 (inclusive)
    const newX = Math.floor(Math.random() * 14) + 1;
    // Generate random y between -1 and -6 (inclusive)
    const newY = -(Math.floor(Math.random() * 6) + 1);
    entry.xy = [newX, newY];
  });
}
const AreaOfFire = [{ TH: "Th" }, { VND: "Vnd" }, { INA: "My" }, { PH: "Ph" }];

const foundArea = AreaOfFire.find((area) => area[region.country]);

// 获取对应的值
const areaValue = foundArea ? foundArea[region.country] : null;

const trendData = ref([]);

const areaLottery = reactive([
  {
    gameCode: "vndOneMinute",
    gameId: "44",
    country: "Vnd",
    lottery: "eightSingleAndDoubleList",
  }, //越南1分彩2D头
  {
    gameCode: "thOneMinute",
    gameId: "73",
    country: "Th",
    lottery: "head2SingleAndDoubleList",
  }, //泰国1分彩
  {
    gameCode: "phOneMinute_2d",
    gameId: "47",
    country: "Ph",
    lottery: "twoSizeList",
  }, //菲律宾1分彩2D
  {
    gameCode: "myOneMinute",
    gameId: "80",
    country: "My",
    lottery: "twoSizeList",
  }, //印尼1分彩
]);
const matchingLottery = areaLottery.find((item) => item.country === areaValue);
async function getTrend() {
  // 获取走势图
  const data = {
    gameCode: matchingLottery.gameCode,
    gameId: matchingLottery.gameId,
  };
  const lottery = matchingLottery.lottery;
  const res = await getGameTrend(data, areaValue);
  trendData.value = res.resultSet[lottery].trendRespList;
  await nextTick();
  createGrid(trendData.value);
  resetCoordinates(trendData.value);
}
</script>
<style lang="scss">
.trend {
  background-color: #333333;
  color: #fff;
  border-radius: 7px;
  padding: 5px;
  .trend-title{
    font-size: 12px;
    margin-bottom: 5px;
  }
  .trendbox {
    border-left: 1px solid #ededed;
    border-right: 1px solid #ededed;
    font-size: 16px;
    border-radius: 2px;
    overflow-x: auto;
    scrollbar-width: none;
    flex: 1;

    .table {
      border-spacing: 0;
      background: #34373d;
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
      width: 23px;
      height: 23px;
      border: 0.5px solid #dedede;
      color: white;
      position: relative;
    }

    .common-circle {
      content: attr(data-content);
      position: absolute;
      border-radius: 50%;
      inset: 0;
      margin: auto;
      width: 21px;
      height: 21px;
      line-height: 21px;
      text-align: center;
      z-index: 1;
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
</style>
