<template>
    <div class="trend">
        <ul class="select">
            <li v-for="item in Object.keys(data)" @click="changeSelect(item)" :class="{ active: active == item }"
                class="select-item">
                {{ item }}
            </li>
        </ul>

        <div class="trend-content" v-show="Object.keys(data).length">
            <div class="trendBox" ref="TBSize">
                <table ref="tableSize" class="table"></table>
            </div>
            <div class="trendBox" ref="TBParity">
                <table ref="tableParity" class="table"></table>
            </div>

            <div class="hint-box">
                <div class="hint"><span class="red">Big</span> / <span class="yellow">Small</span> </div>
                <div class="hint"><span class="red">Even</span> / <span class="yellow">Odd</span></div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, computed, nextTick, onMounted } from 'vue'
const props = defineProps({
    data: { type: Object, required: true }
})
const TBSize = ref(null)//左边走势图容器
const TBParity = ref(null)//右边走势图容器
const tableSize = ref(null)//大小走势图dom 左
const tableParity = ref(null)//单双走势图dom 右
const active = ref('one')//当前选中走势图的号码
const trendBox = [TBSize, TBParity]//走势图的两个容器
const table = [tableSize, tableParity]//两个走势图
const activeData = computed(() => props.data[active.value])
const changeSelect = (item) => {
    active.value = item
    createGrid()
}

watch(props, (newvalue) => {
    createGrid()
})
onMounted(() => {
    createGrid()
})
function createGrid() {
    console.log(props.data)
    table.forEach(item => item.value.innerHTML = '')
    Object.values(activeData.value).forEach((value, index) => {
        const minColumns = 7;
        const minRows = 6;  // 最小行数
        let maxRows = 0;
        let maxCols = 0;
        value.forEach((item) => {
            const x = item.xy[0];
            const y = Math.abs(item.xy[1]);
            if (x > maxRows) maxRows = x;
            if (y > maxCols) maxCols = y;
        });
        // 确保 maxCols 至少为 minRows
        maxCols = Math.max(maxCols, minRows);
        const totalColumns = Math.max(minColumns, maxRows) + 1;
        for (let i = 0; i < maxCols; i++) {
            const row = table[index].value.insertRow();
            for (let j = 0; j < totalColumns; j++) {
                row.insertCell().classList.add("empty");
            }
        }
        value.forEach((item) => {
            const x = item.xy[0] - 1;
            const y = maxCols + item.xy[1];
            const rowIndex = maxCols - 1 - y;
            const colIndex = x + (totalColumns - maxRows - 1);
            const cell = table[index].value.rows[rowIndex].cells[colIndex];
            cell.className = item.colour;
            cell.setAttribute("data-content", item.nums);
        });
    })
    nextTick(() => {
        trendBox.forEach(item => {
            item.value.scrollLeft = item.value.scrollWidth
        })
    })

}
</script>
<style scoped>
.select {
    /* flex-shrink: 0; */
    width: 60px;
}

.trend-content {
    /* flex-shrink: 0; */
    width: 300px;
    display: flex;
    /* gap: 10px; */
    gap: 10px;
    flex-wrap: wrap;
}

.trendBox {
    width: 145px;
    /* flex-shrink: 0; */
    /* flex: 1; */
}
.hint-box{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.hint {
    text-align: center;
    width: 145px;
    line-height: 25px;
    font-size: 16px;
    border: 1px solid #000;
}
.yellow{
    color: #ebae43;
}
.red{
    color: red;
}
</style>