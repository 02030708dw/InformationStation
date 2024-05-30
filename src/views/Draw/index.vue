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
        <!-- {{ Object.keys(awardNum).length }}
        <pre style="font-size: 16px;">
        {{   }}
        </pre> -->
        <template v-if="activeGame=='vnd'&&loadingFlag">
            <div class="trend-box" v-for="(item,index) in TrendData[activeGame]">
                <GameAward :awardNum="awardNum[activeGame][index] " :timeRemaining="timeRemaining[activeGame][index]" @timeOut="timeOut"/>
                <Trend :data="item" />
            </div>
        </template>

        <template v-else-if="activeGame=='th'&&loadingFlag">
            <div class="trend-box" v-for="(item,index) in TrendData[activeGame]">
                <GameAward :awardNum="awardNum[activeGame][index] " :timeRemaining="timeRemaining[activeGame][index]" @timeOut="timeOut"/>
                <Trend :data="item" />
            </div>
        </template>

        <template v-else-if="activeGame=='ph'&&loadingFlag">
            <div class="trend-box" v-for="(item,index) in TrendData[activeGame]">
                <GameAward :awardNum="awardNum[activeGame][index] " :timeRemaining="timeRemaining[activeGame][index]" @timeOut="timeOut"/>
                <TrendPh :data="item" />
            </div>
        </template>

        <template v-if="Object.keys(TrendInfo).length&&!loadingFlag">
            <van-loading size="44"/>
        </template>
    </div>
</template>
<script setup>
import { ref, computed, onBeforeMount,watch,reactive } from 'vue';
import GameTab from './GameTab.vue';
import GameAward from "./GameAward.vue"
import Trend from "./Trend.vue";
import TrendPh from './TrendPh.vue';
import items from "./vndCityData.js";//越南地区数据
import {countdown} from "./getCountDown.js"
import { getGameInfo,getGameTrend,getGameAward } from "@/api/request.js";
const TrendInfo = reactive({})//有几个走势图的游戏
const activeGame = ref('vnd')//当前选中的游戏

const activeId = ref(1);//越南右侧选择的地区名
const activeIndex = ref(0);//越南左侧选择的地区
const activeVnd=computed(()=>items[activeIndex.value].children.find(item=>item.id==activeId.value))//越南右侧选择的数据

const awardNum=reactive({})//奖期信息
const timeRemaining=reactive({})//倒计时信息
const TrendData=reactive({})//走势图信息

const loadingFlag=ref(false)//记录是否加载完毕


//请求越南的方法
const getVnd = async () => {
    var resA=await getGameAward({gameCode:activeVnd.value.code})
    var resT = await getTrend(activeGame.value, activeVnd.value)
    awardNum.vnd[activeVnd.value.code]=resA.resultSet.awardNum
    TrendData.vnd[activeVnd.value.code] = resT
    timeRemaining.vnd[activeVnd.value.code]=countdown(activeVnd.value.code,awardNum.vnd[activeVnd.value.code].lastAwardPeriod)
}
const getTh = async (newvalue) => {
    for (const item of TrendInfo[newvalue]) {
        let resA = await getGameAward({ gameCode: item.code })
        let resT = await getTrend(newvalue, { gameId: item.id, code: item.code });
        awardNum.th[item.name] = resA.resultSet.awardNum
        TrendData.th[item.name] = resT;
        timeRemaining.th[item.name] = countdown(item.code, resA.resultSet.awardNum.lastAwardPeriod)
    }
}
// const getPh = async (newvalue) => {
//     for (const item of TrendInfo[newvalue]) {
//         let resA = await getGameAward({ gameCode: item.code })
//         let resT = await getTrend(newvalue, { gameId: item.id, code: item.code });
//         awardNum.ph[item.name] = resA.resultSet.awardNum
//         TrendData.ph[item.name] = removeFalseyValues(resT);
//         timeRemaining.ph[item.name] = countdown(item.code, resA.resultSet.awardNum.lastAwardPeriod)
//         timeRemaining.ph[item.name] = ''//为了使每个倒计时保持一致
//     }
//     // 使每个倒计时都为最后一个
//     let lastCode = TrendInfo['ph'][TrendInfo['ph'].length - 1].code
//     let lastAward = awardNum['ph'][Object.keys(awardNum['ph'])[Object.keys(awardNum['ph']).length - 1]].lastAwardPeriod
//     for (let i in timeRemaining.ph) {
//         timeRemaining.ph[i] = countdown(lastCode, lastAward)
//     }
// }
const getPh = async (newvalue) => {
    // 定义空数据,请求完毕后再赋值
    const tempAwardNum = {};
    const tempTrendData = {};
    const tempTimeRemaining = {};

    for (const item of TrendInfo[newvalue]) {
        let resA = await getGameAward({ gameCode: item.code });
        let resT = await getTrend(newvalue, { gameId: item.id, code: item.code });
        tempAwardNum[item.name] = resA.resultSet.awardNum;
        tempTrendData[item.name] = removeFalseyValues(resT);
        tempTimeRemaining[item.name] = countdown(item.code, resA.resultSet.awardNum.lastAwardPeriod);
        tempTimeRemaining[item.name] = ''; // 为了使每个倒计时保持一致
    }

    // 使每个倒计时都为最后一个
    const lastCode = TrendInfo['ph'][TrendInfo['ph'].length - 1].code;
    const lastAward = tempAwardNum[Object.keys(tempAwardNum)[Object.keys(tempAwardNum).length - 1]].lastAwardPeriod;
    for (let i in tempTimeRemaining) {
        tempTimeRemaining[i] = countdown(lastCode, lastAward);
    }

    // 赋值给正式的变量
    awardNum.ph = tempAwardNum;
    TrendData.ph = tempTrendData;
    timeRemaining.ph = tempTimeRemaining;
}
const getInfofun = {
    th: getTh,
    ph: getPh,
    vnd: getVnd
}

// 切换越南泰国菲律宾触发
watch(activeGame, async (newvalue) => {
    loadingFlag.value=false
    await getInfofun[newvalue](newvalue)
    loadingFlag.value=true
    // console.log(timeRemaining)
    // console.log(TrendData)
    // console.log(awardNum)
})

// 切换越南地区触发
watch(activeVnd,async (newvalue)=>{
    if(!newvalue) return
    loadingFlag.value=false

    var res=await getTrend('vnd',newvalue)//初始化越南走势图
    TrendData.vnd={}
    TrendData.vnd[newvalue.code]=res

    var res=await getGameAward({gameCode:activeVnd.value.code})//初始化请求越南奖期
    awardNum.vnd[activeVnd.value.code]=res.resultSet.awardNum
    timeRemaining.vnd[activeVnd.value.code]=countdown(activeVnd.value.code,awardNum.vnd[activeVnd.value.code].lastAwardPeriod)

    loadingFlag.value=true
})



let flagNum=0
const timeOut = (code) => {
    let act = Object.values(TrendInfo).find(item=>item.find(i => i.code == code))
    let sum = act.length == 36 ? 1 : act.length
    flagNum++
    if (sum == flagNum) {
        setTimeout(()=>{flagNum = 0},10000)//10秒只能请求一次
        const act = Object.keys(TrendInfo).find(key => TrendInfo[key].some(v => v.code === code));
        getInfofun[act](act)
    }
}


onBeforeMount(async () => {
    //获取有哪些游戏Tab数据=============
    var res = await getGameInfo()
    Object.assign(TrendInfo,res.resultSet)
    Object.keys(TrendInfo).forEach(item=>{
        TrendData[item]={}
        awardNum[item]={}
        timeRemaining[item]={}
    }) 

    // 获取走势图================
    var res=await getTrend(activeGame.value,activeVnd.value)//初始请求越南走势图
    TrendData.vnd[activeVnd.value.code]=res

    // 获取倒计时===================
    var res=await getGameAward({gameCode:activeVnd.value.code})//初始化请求越南走势图
    awardNum.vnd[activeVnd.value.code]=res.resultSet.awardNum
    timeRemaining.vnd[activeVnd.value.code]=countdown(activeVnd.value.code,awardNum.vnd[activeVnd.value.code].lastAwardPeriod)

    // 数据获取完毕加载完毕为true
    loadingFlag.value=true
})


// 请求走势图
const getTrend=async (city,{code:gameCode,gameId})=>{
    let str= city.charAt(0).toUpperCase() + city.slice(1);
    let res=await getGameTrend(str,{gameCode,gameId})
    return res.resultSet
}

// 菲律宾走势图数据处理
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