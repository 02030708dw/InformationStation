<template>
    <div class="title-trend">
        {{ info.type.replace(/^.*?_/, '') }}-{{ info.method.replace(/^.*?_/, '') }}
        {{ info.name }}
    </div>
    <div class="box-num" v-if="data">
        <ul class="chartbox" v-if="digitData.length != 2">
            <li 
                v-for="(item, index) in digitData" 
                class="chartbox-item" 
                :class="{active:active==index}"
                @click="emits('changeChart',index)"
                >
                {{ index }}
            </li>
        </ul>
        <ul class="trend-num">
            <li class="num-item" v-for="item in data.trendRespList.slice(0,30)">{{ item.nums }}</li>
        </ul>
    </div>

</template>
<script setup>
const props = defineProps(['data', 'info','digitData','active'])
const emits=defineEmits(['changeChart'])

</script>
<style lang="scss" scoped>
.title-trend {
    padding-left: 10px;
    color: #000;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 16px;
}
.box-num{
    padding: 0 10px;
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
    }

    .num-item:nth-child(2n) {
        color: #333;
        background-color: #e2e9fa;
    }

    .num-item:nth-child(2n-1) {
        color: #333;
        background-color: #D6DEED;
    }
}
</style>