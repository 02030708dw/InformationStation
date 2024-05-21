<template>
    <div class="trend">
        <ul class="select">
            <li 
            v-for="item in Object.keys(data)"
            @click="changeSelect(item)"
            :class="{active:active==item}"
            class="select-item">
            {{ mapKeyObj[item] }}
            </li>
        </ul>

        <div class="trendBox" ref="trendBox">
            <table ref="tableGrid"></table>
        </div>
    </div>


</template>
<script setup>
import { ref, onMounted,watch } from 'vue'
const props = defineProps(['data'])
const trendBox = ref(null)
const tableGrid = ref(null)
const active=ref()
const mapKeyObj={
    specialList:'SP',
    eightList:'eight',
    sizeList:'B/S',
    singleAndDoubleList:'E/O'
}
const changeSelect=(item)=>{
    active.value=item
    createGrid()
}
watch(props,()=>{
    createGrid()
})
onMounted(()=>{
    active.value='sizeList'
    createGrid()
})


function createGrid() {
    tableGrid.value.innerHTML = ''
    const minColumns = 14;
    const minRows = 6;  // 最小行数
    let maxRows = 0;
    let maxCols = 0;
    props.data[active.value].forEach((item) => {
        const x = item.xy[0];
        const y = Math.abs(item.xy[1]);
        if (x > maxRows) maxRows = x;
        if (y > maxCols) maxCols = y;
    });
    // 确保 maxCols 至少为 minRows
    maxCols = Math.max(maxCols, minRows);
    const totalColumns = Math.max(minColumns, maxRows) + 1;
    for (let i = 0; i < maxCols; i++) {
        const row = tableGrid.value.insertRow();
        for (let j = 0; j < totalColumns; j++) {
            row.insertCell().classList.add("empty");
        }
    }
    props.data[active.value].forEach((item) => {
        const x = item.xy[0] - 1;
        const y = maxCols + item.xy[1];
        const rowIndex = maxCols - 1 - y;
        const colIndex = x + (totalColumns - maxRows - 1);
        const cell = tableGrid.value.rows[rowIndex].cells[colIndex];
        cell.className = item.nums;
        cell.setAttribute("data-content", item.nums);
    });
    trendBox.value.scrollLeft = trendBox.value.clientWidth
}

</script>
<style lang="scss" >
.trend{
    display: flex;
    padding: 5px;
}
.select{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 63px;
    margin-right: 5px;
}
.select-item{
    height: 20%;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
}
.active{
    color: #fff;
    background-color: #F19C73;
}
.trendBox {
    border-radius: 4px;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
}
.table-container::-webkit-scrollbar {
    display: none;
}
table {
    border: 1px solid #fff;
    border-collapse: collapse;
    background: #34373d;
    min-width: max-content;
}

tbody {
    width: max-content;
}

td {
    font-size: 12px;
    width: 19.2px;
    height: 19.2px;
    border: 1px solid white;
    color: white;
    position: relative;
}

.common-circle {
    content: attr(data-content);
    position: absolute;
    border-radius: 50%;
    inset: 0;
    margin: auto;
    width: 80%;
    height: 80%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.S::before {
    @extend .common-circle;
    background: #ebae43;
}

.B::before {
    @extend .common-circle;
    background: red;
}

.O::before{
    @extend .common-circle;
    background: #ebae43;
}
.E::before{
    @extend .common-circle;
    background: red;
}
</style>