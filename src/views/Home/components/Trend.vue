<template>
  <div class="trend">
    <Title text="Trend" @changeMore="$router.push({ name: 'Trend' })" />
    <div class="trendbox" ref="trend">
      <table ref="table" class="table"></table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick } from "vue";
import Title from "./Title.vue";
const table = ref(null);
const trend = ref(null);
onMounted(() => {
  resetCoordinates();
  createGrid();
});
function createGrid() {
  table.value.innerHTML = "";
  const minColumns = 20;
  const minRows = 6; // 最小行数
  let maxRows = 0;
  let maxCols = 0;
  trendData.forEach((item) => {
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
  trendData.forEach((item) => {
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
function resetCoordinates() {
  trendData.forEach((entry) => {
    // Generate random x between 1 and 14 (inclusive)
    const newX = Math.floor(Math.random() * 14) + 1;
    // Generate random y between -1 and -6 (inclusive)
    const newY = -(Math.floor(Math.random() * 6) + 1);
    entry.xy = [newX, newY];
  });
}

const trendData = [
  {
    awardPeriod: "20240719-188",
    nums: "45",
    xy: [1, -1],
    colour: "S",
  },
  {
    awardPeriod: "20240719-189",
    nums: "51",
    xy: [2, -1],
    colour: "B",
  },
  {
    awardPeriod: "20240719-190",
    nums: "74",
    xy: [2, -2],
    colour: "B",
  },
  {
    awardPeriod: "20240719-191",
    nums: "88",
    xy: [2, -3],
    colour: "B",
  },
  {
    awardPeriod: "20240719-192",
    nums: "17",
    xy: [3, -1],
    colour: "S",
  },
  {
    awardPeriod: "20240719-193",
    nums: "99",
    xy: [4, -1],
    colour: "B",
  },
  {
    awardPeriod: "20240719-194",
    nums: "91",
    xy: [4, -2],
    colour: "B",
  },
  {
    awardPeriod: "20240719-195",
    nums: "85",
    xy: [4, -3],
    colour: "B",
  },
  {
    awardPeriod: "20240719-196",
    nums: "88",
    xy: [4, -4],
    colour: "B",
  },
  {
    awardPeriod: "20240719-197",
    nums: "01",
    xy: [5, -1],
    colour: "S",
  },
  {
    awardPeriod: "20240719-198",
    nums: "24",
    xy: [5, -2],
    colour: "S",
  },
  {
    awardPeriod: "20240719-199",
    nums: "59",
    xy: [6, -1],
    colour: "B",
  },
  {
    awardPeriod: "20240719-200",
    nums: "50",
    xy: [6, -2],
    colour: "B",
  },
  {
    awardPeriod: "20240719-201",
    nums: "87",
    xy: [6, -3],
    colour: "B",
  },
  {
    awardPeriod: "20240719-202",
    nums: "52",
    xy: [6, -4],
    colour: "B",
  },
  {
    awardPeriod: "20240719-203",
    nums: "46",
    xy: [7, -1],
    colour: "S",
  },
  {
    awardPeriod: "20240719-204",
    nums: "26",
    xy: [7, -2],
    colour: "S",
  },
  {
    awardPeriod: "20240719-205",
    nums: "11",
    xy: [7, -3],
    colour: "S",
  },
  {
    awardPeriod: "20240719-206",
    nums: "89",
    xy: [8, -1],
    colour: "B",
  },
  {
    awardPeriod: "20240719-207",
    nums: "87",
    xy: [8, -2],
    colour: "B",
  },
  {
    awardPeriod: "20240719-208",
    nums: "62",
    xy: [8, -3],
    colour: "B",
  },
  {
    awardPeriod: "20240719-209",
    nums: "30",
    xy: [9, -1],
    colour: "S",
  },
  {
    awardPeriod: "20240719-210",
    nums: "75",
    xy: [10, -1],
    colour: "B",
  },
  {
    awardPeriod: "20240719-211",
    nums: "54",
    xy: [10, -2],
    colour: "B",
  },
  {
    awardPeriod: "20240719-212",
    nums: "24",
    xy: [11, -1],
    colour: "S",
  },
  {
    awardPeriod: "20240719-213",
    nums: "82",
    xy: [12, -1],
    colour: "B",
  },
  {
    awardPeriod: "20240719-214",
    nums: "46",
    xy: [13, -1],
    colour: "S",
  },
  {
    awardPeriod: "20240719-215",
    nums: "15",
    xy: [13, -2],
    colour: "S",
  },
  {
    awardPeriod: "20240719-216",
    nums: "66",
    xy: [14, -1],
    colour: "B",
  },
  {
    awardPeriod: "20240719-217",
    nums: "52",
    xy: [14, -2],
    colour: "B",
  },
];
</script>
<style lang="scss">
.trend {
    background-color: #333333;
    color:#fff;
    border-radius: 7px;
    padding: 5px;
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
