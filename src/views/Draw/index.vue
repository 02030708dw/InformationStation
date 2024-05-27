<template>
    <div class="draw">
        <GameTab :list="Object.keys(TrendInfo)" v-model="activeGame" v-if="Object.keys(TrendInfo).length" />
        <van-loading size="44" v-else />
        <van-tree-select 
        v-model:active-id="activeId" 
        v-model:main-active-index="activeIndex" 
        :items="items"
        style="height:144px;" 
        v-if="activeGame=='vnd'&&Object.keys(TrendInfo).length"
        />
        <pre>
            {{ activeVnd }}
        </pre>
    </div>
</template>
<script setup>
import { ref, computed, onBeforeMount,watch } from 'vue'
import GameTab from './GameTab.vue';
import items from "./vndCityData.js"//越南地区数据
import { getGameInfo,getGameTrend } from "@/api/request.js"
const TrendInfo = ref({})//有几个走势图的游戏
const activeGame = ref('vnd')//当前选中的游戏
const TrendAry=ref({})//渲染所需走势图数据

// =============越南选择器
const activeId = ref(1);//越南右侧选择的地区名
const activeIndex = ref(0);//越南左侧选择的地区
const activeVnd=computed(()=>items[activeIndex.value].children.find(item=>item.id==activeId.value))//越南右侧选择的数据

// 越南以外选择器============

watch(activeGame, async (newvalue, oldvalue) => {
    if (newvalue == 'th') {
        let promises = TrendInfo.value[activeGame.value].map(async (item, index) => {
            let res = await getTrend(newvalue, item);
            TrendAry.value.th[item.name]=res
        });
        await Promise.all(promises)
        console.log(TrendAry.value);
    }

    else if (newvalue == 'ph') {
        let promises = TrendInfo.value[activeGame.value].map(async (item, index) => {
            let res = await getTrend(newvalue, item);
            TrendAry.value.ph[item.name] = removeFalseyValues(res);
        });
        await Promise.all(promises)
        console.log(TrendAry.value);
    }

    else if (newvalue == 'vnd') {
        let res=await getTrend(activeGame.value,activeVnd.value)
        TrendAry.value.vnd[activeVnd.value.code]=res
        console.log(TrendAry.value)
    }

})




onBeforeMount(async () => {
    var res = await getGameInfo()//获取有哪些游戏Tab数据
    TrendInfo.value = res.resultSet
    console.log(TrendInfo.value)
    Object.keys(TrendInfo.value).forEach(item=>{
        TrendAry.value[item]={}
    })
    console.log(TrendAry.value)
    // var res=await getTrend(activeGame.value,activeVnd.value)
    // console.log(res)
})



const getTrend=async (city,{code:gameCode,id:gameId})=>{
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