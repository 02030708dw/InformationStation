<template>
    <div class="draw">
        <GameTab :list="Object.keys(TrendInfo)" v-model="activeGame" v-if="Object.keys(TrendInfo).length" />
        <van-loading size="44" v-else />
        <van-tree-select 
        v-model:active-id="activeId" 
        v-model:main-active-index="activeIndex" 
        :items="items"
        height="3.84rem"
        v-if="activeGame=='vnd'&&Object.keys(TrendInfo).length"
        />

        <template v-if="activeGame=='vnd'">
            <div class="trend-box" v-for="(item,index) in TrendData[activeGame]">
                <Trend :data="item" />
            </div>
        </template>

        <template v-if="activeGame=='th'">
            <div class="trend-box" v-for="(item,index) in TrendData[activeGame]">
                <Trend :data="item" />
            </div>
        </template>

        <template v-if="activeGame=='ph'">
            <div class="trend-box" v-for="(item,index) in TrendData[activeGame]">
                <TrendPh :data="item" />
            </div>
        </template>

    </div>
</template>
<script setup>
import { ref, computed, onBeforeMount,watch,reactive } from 'vue';
import GameTab from './GameTab.vue';
import items from "./vndCityData.js";//越南地区数据
import Trend from "./Trend.vue";
import TrendPh from './TrendPh.vue';
import { getGameInfo,getGameTrend } from "@/api/request.js";
const TrendInfo = reactive({})//有几个走势图的游戏
const activeGame = ref('vnd')//当前选中的游戏
const TrendData=reactive({})//渲染所需走势图数据

const activeId = ref(1);//越南右侧选择的地区名
const activeIndex = ref(0);//越南左侧选择的地区
const activeVnd=computed(()=>items[activeIndex.value].children.find(item=>item.id==activeId.value))//越南右侧选择的数据




// 切换越南泰国菲律宾触发
watch(activeGame, async (newvalue, oldvalue) => {
    if (newvalue == 'th') {
        let promises = TrendInfo[newvalue].map(async (item, index) => {
            let res = await getTrend(newvalue, {gameId:item.id,code:item.code});
            TrendData.th[item.name]=res
        });
        await Promise.all(promises)
    }
 
    else if (newvalue == 'ph') {
        let promises = TrendInfo[newvalue].map(async (item, index) => {
            let res = await getTrend(newvalue, {gameId:item.id,code:item.code});
            TrendData.ph[item.name] = removeFalseyValues(res);
        });
        await Promise.all(promises)
    }

    else if (newvalue == 'vnd') {
        let res=await getTrend(activeGame.value,activeVnd.value)
        TrendData.vnd[activeVnd.value.code]=res
    }
    console.log(TrendData)
})

// 切换越南地区触发
watch(activeVnd,async (newvalue)=>{
    if(!newvalue) return
    let res=await getTrend('vnd',newvalue)
    TrendData.vnd[newvalue.code]=res
})



onBeforeMount(async () => {
    var res = await getGameInfo()//获取有哪些游戏Tab数据
    Object.assign(TrendInfo,res.resultSet)
    Object.keys(TrendInfo).forEach(item=>{
        TrendData[item]={}
    }) 
    var res=await getTrend(activeGame.value,activeVnd.value)
    TrendData.vnd[activeVnd.value.code]=res
})


// 请求走势图
const getTrend=async (city,{code:gameCode,gameId})=>{
    let str= city.charAt(0).toUpperCase() + city.slice(1);
    let res=await getGameTrend(str,{gameCode,gameId})
    return res.resultSet
}



// 菲律宾走势图处理
function removeFalseyValues(obj) {
    let data = Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value)
    );
    function transformObject(input) {
        return Object.entries(input).reduce((acc, [key, value]) => {
            const prefixMatch = key.match(/^(one|two|three|four|five|six)/);
            if (prefixMatch) {
                const prefix = prefixMatch[0];
                const newKey = key.replace(prefix, '');
                if (!acc[prefix]) {
                    acc[prefix] = {};
                }
                acc[prefix][newKey] = value;
            }
            return acc;
        }, {});
    }
    return transformObject(data)
}
</script>
<style scoped>
.draw {
    min-height: 100%;
    background-color: #fff;
}
</style>