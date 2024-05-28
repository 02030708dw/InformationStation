<template>
    <div class="game-trend">
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
            <div class="hint"><span class="red">Big</span> / <span class="yellow">Small</span> </div>
            <div class="hint"><span class="red">Even</span> / <span class="yellow">Odd</span></div>
        </div>
        <!-- <van-loading v-show="!Object.keys(data).length" /> -->
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
<style lang="scss">
.game-trend {
    display: flex;
    padding: 5px;

    .select {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 5px;
        gap: 5px;
        .select-item {
            width: 53px;
            flex: 1;
            border-radius: 4px;
            font-size: 14px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid #ccc;
        }

        .active {
            color: #fff;
            background-color: #F19C73;
        }
    }



    .trend-content {
        display: flex;
        flex-wrap: wrap;
        min-height: 110.76px;
        gap: 4px;

        .trendBox {
            border-radius: 4px;
            overflow-x: auto;
            scrollbar-width: none;
            width: 150px;

            // flex: 1;
            table {
                border-collapse: collapse;
                background: #34373d;
                min-width: max-content;
            }

            tbody {
                width: max-content;
            }

            td {
                font-size: 10px;
                width: 18.75px;
                height: 18.75px;
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

        .hint {
            width: 150px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border: 1px solid #aaa;
            font-size: 16px;

            .red {
                color: red;
            }

            .yellow {
                color: #ebae43;
            }
        }
    }

    .trendBox::-webkit-scrollbar {
        display: none;
    }

    .van-loading {
        width: 100%;
        height: 141.41px;
        display: flex;
        justify-content: center;
        align-items: center;
        // border: 1px solid rgb(244, 208, 134);
        padding-right: 60pxpx;
    }
}
</style>