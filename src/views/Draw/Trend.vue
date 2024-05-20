<template>
    <div class="trend" ref="trend">
        <table ref="tableGrid"></table>
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
const propd=defineProps(['data'])
const trend=ref(null)
const tableGrid=ref(null)
onMounted(()=>createGrid())
function createGrid() {
        const minColumns = 14;
        let maxRows = 0;
        let maxCols = 0;
        propd.data.forEach((item) => {
          const x = item.xy[0];
          const y = Math.abs(item.xy[1]);
          if (x > maxRows) maxRows = x;
          if (y > maxCols) maxCols = y;
        });
        const totalColumns = Math.max(minColumns, maxRows) + 1;
        for (let i = 0; i < maxCols; i++) {
          const row = tableGrid.value.insertRow();
          for (let j = 0; j < totalColumns; j++) {
            row.insertCell().classList.add("empty");
          }
        }
        propd.data.forEach((item) => {
          const x = item.xy[0] - 1;
          const y = maxCols + item.xy[1];
          const rowIndex = maxCols - 1 - y;
          const colIndex = x + (totalColumns - maxRows - 1);
          const cell = tableGrid.value.rows[rowIndex].cells[colIndex];
          cell.textContent = item.nums;
          cell.className = item.nums;
          cell.classList.remove("empty");
        });
        trend.value.scrollLeft=trend.value.clientWidth
      }
</script>
<style lang="scss">

     .trend {
        width:100%;
        height: 180px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        border: 1px solid black;
      }
      .table-container::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      table {
        border-collapse: collapse;
        background: #34373d;
        min-width: max-content;
      }
      tbody {
        width: max-content;
      }
      td {
        width: 30px;
        height: 30px;
        border: 1px solid white;
        text-align: center;
        border-radius: 50%;
        color: white;
      }
      .S {
        background-color: #ebae43;
      }
      .B {
        background-color: red;
      }
</style>