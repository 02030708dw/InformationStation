<template>
  <div class="trend">
    <Title :text="$t('走势')" @changeMore="$router.push({ name: 'Trend' })" />
    <div class="trend-title">{{ $t(ViewGameCode) }}</div>
    <div class="trendbox" ref="trend" v-if="trendData.length">
      <table ref="table" class="table"></table>
    </div>
    <van-skeleton title :row="3" v-else/>
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
const ViewGameCode=ref('')
onMounted(() => {
  getTrend()
});
function createGrid(Data) {
  if(!table.value) return
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


const trendData = ref([]);
const areaLottery = reactive([
  {
    gameCode: "vndOneMinute",
    gameId: "44",
    country: "Vnd",
    currency:['VND'],
    lottery: "eightSingleAndDoubleList",
  }, //越南1分彩2D头
  {
    gameCode: "thOneMinute",
    gameId: "73",
    country: "Th",
    currency:['THB'],
    lottery: "head2SingleAndDoubleList",
  }, //泰国1分彩
  {
    gameCode: "phOneMinute_2d",
    gameId: "47",
    country: "Ph",
    currency:['PHP'],
    lottery: "twoSizeList",
  }, //菲律宾1分彩2D
  {
    gameCode: "myOneMinute",
    gameId: "80",
    country: "My",
    currency:['IDR'],
    lottery: "twoSizeList",
  }, //印尼1分彩
]);

// const AreaOfFire = [{ TH: "Th" }, { VND: "Vnd" }, { INA: "My" }, { PH: "Ph" }];
// const foundArea = AreaOfFire.find((area) => area[region.country]);
// const areaValue = foundArea ? foundArea[region.country] : null;
// const matchingLottery = areaLottery.find((item) => item.country === areaValue);


async function getTrend() {
  const {currency}=region
  const {gameCode,gameId,country,lottery}=areaLottery.find(item=>item.currency.some(i=>i==currency))
  const {resultSet} = await getGameTrend({gameCode,gameId}, country);
  ViewGameCode.value=gameCode
  trendData.value = resultSet[lottery].trendRespList;
  await nextTick();
  createGrid(trendData.value);




  // const data = {
  //   gameCode: matchingLottery.gameCode,
  //   gameId: matchingLottery.gameId,
  // };
  // const lottery = matchingLottery.lottery;
  // const {resultSet} = await getGameTrend(data, areaValue);
  // trendData.value = resultSet[lottery].trendRespList;
  // await nextTick();
  // createGrid(trendData.value);
}
</script>
<style lang="scss">
.trend {
  background-color: $themebgColor;
  color: #fff;
  border-radius: 7px;
  // padding: 5px;
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
