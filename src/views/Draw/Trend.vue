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

        <div class="trendBox" ref="trendBox" v-if="TrendFlagAry.includes(active)">
            <table ref="tableGrid"></table>
        </div>

        <ul class="num-box" v-else>
            <li class="num-item animate"></li>
            <li v-for="(item,index) in data[active]" class="num-item">
                {{ item.nums }}
            </li>
            <li class="num-item" v-for="item in 19-data[active].length"></li>
        </ul>
    </div>


</template>
<script setup>
import { ref, onMounted,watch,onActivated,onBeforeMount,nextTick } from 'vue'
const props = defineProps({
    data:{required:true}
})
const TrendFlagAry=['sizeList','singleAndDoubleList']
const trendBox = ref(null)
const tableGrid = ref(null)
const active=ref()
const mapKeyObj={
    specialList:'SP',
    eightList:'Eight',
    sizeList:'B/S',
    singleAndDoubleList:'E/O',
    endList:'End',
    headList:'Head'

}
const changeSelect=(item)=>{
    active.value=item
    if(TrendFlagAry.includes(item)) {
        nextTick(()=>createGrid())
        
    } 
}
watch(props,()=>{
    createGrid()
    console.log('监听到data发生改变')
})
onBeforeMount(()=>{
    active.value='sizeList'
})
onMounted(()=>{
    if(Object.keys(props.data).length) createGrid()
}) 
onActivated(()=>{
    trendBox.value.scrollLeft = trendBox.value.clientWidth
})

function createGrid() {
    tableGrid.value.innerHTML = ''
    const minColumns = 15;
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
.num-box{
    width: 100%;
    height: calc(23.04px * 5);//一列为5个,一个为23.04
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    box-sizing: content-box;
    border: 1px solid #ebae43;
}
.animate{
    position: relative;
}
.animate::after{
    color: #666;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    content: '...';
    animation: dots 2s steps(4, end) infinite;
}
.num-item{
    font-size: 16px;
    text-align: center;
    width: 25%;
    line-height: 23.04px;
    height: 23.04px;
}
.num-item:nth-child(odd){
    background-color: #fef0e0;
}
.num-item:nth-child(even){
    background-color: #fff;
}
.trendBox {
    border-radius: 4px;
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
}
.trendBox::-webkit-scrollbar {
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
@keyframes dots {

    0%,
    100% {
        content: '';
    }

    25% {
        content: '.';
    }

    50% {
        content: '..';
    }

    75% {
        content: '...';
    }
}
</style>