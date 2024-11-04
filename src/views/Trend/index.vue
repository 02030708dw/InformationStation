<template>
    <div class="trend-Page">


        <!-- <div class="card" > -->
        <template v-if="showTab">

            <CircleTab :list="gameList.filter(item => item.countryName != 'Mini-Game')" viewField="countryName"
                bindField="countryName" v-model="activeCountry" />

            <SquareTab
                :list="gameList.find(item => item.countryName == activeCountry).games.filter(i => i.vndArea != 'scratch')"
                viewField="vndArea" bindField="vndArea" v-model="activeKind" />

            <VndCity v-if="Regional.includes(activeKind)" v-model:city="activeKind" v-model:gameId="cityId"
                :time="time" />

            <SquareTab :list="GamePlayList.find(item => item.gameName == mapactiveKind)?.gamePlayAndTypeListRespList"
                viewField="gamePlayTypeName" bindField="gamePlayTypeCode" v-model="activeType"
                v-if="'thePhilippines' != activeCountry" />


            <SquareTab :list="GamePlayList.find(item => item.gameName == mapactiveKind)
                ?.gamePlayAndTypeListRespList.find(i => i.gamePlayTypeCode == activeType)
                .gamePlayList" viewField="gamePlayName" bindField="gamePlayCode" v-model="activeMethod" />
        </template>
        <!-- </div> -->





        <template v-if="showTrend">
            <!-- <div class="card"> -->
                <AwardNum 
                :awardNum="awardNum" 
                :countryName="activeCountry" 
                :name="mapactiveKind" />
            <!-- </div> -->

            <!-- <div class="card"> -->
                <TrendNum 
                :data="
                 corresponding[activeType][activeMethod].length == 2
                 ? trendData[corresponding[activeType][activeMethod][0]]
                 : trendData[corresponding[activeType][activeMethod][digitNum][0]]
                 " 
                 :digitData="corresponding[activeType][activeMethod]" :info="{ name: 'nums', type: activeType, method: activeMethod }"
                 :active="digitNum" @changeChart="(v) => digitNum = v" />
            <!-- </div> -->

                <GameTrend 
                v-for="(info, index) in infoAry" 
                :key="index" 
                :data="
                 corresponding[activeType][activeMethod].length == 2
                 ? trendData[corresponding[activeType][activeMethod][index]]
                 : trendData[corresponding[activeType][activeMethod][index == 0 ? digitSize : digitOE][index]]
                 " 
                 :info="{ name: info, type: activeType, method: activeMethod }" :digitData="corresponding[activeType][activeMethod]"
                 @digitSize="(v) => digitSize = v" 
                 @digitOE="(v) => digitOE = v" 
                 :active="digitAry[index].value" />

        </template>


        <van-Loading v-else/>


    </div>
</template>
<script setup>

import { ref, onBeforeMount, watch, computed, nextTick, reactive } from 'vue'
import { getGame, getGameTrend, getGameAward, getGamePlay,getTime } from "@/api/index.js";
import { vndCity } from './vndCity.js'

import CircleTab from "./CircleTab.vue"
import SquareTab from "./SquareTab.vue"
import VndCity from "./VndCity.vue"
import AwardNum from './AwardNum.vue'
import TrendNum from './TrendNum.vue'
import GameTrend from './GameTrend.vue'

const time=ref('')
const Regional = ['South', 'central', 'north']
const urlObj = {
    Vietnam: 'Vnd',
    Thailand: 'Th',
    thePhilippines: 'Ph',
    Singapore: 'Sg',
    Malaysia: 'My'
}
const corresponding = {
    vnd_2d: {
        vnd_head: ['eightSizeList', 'eightSingleAndDoubleList'],
        vnd_end: ['s2SizeList', 's3SingleAndDoubleList']
    },
    vnd_3d: {
        vnd_head: ['sevenSizeList', 'sevenSingleAndDoubleList'],
        vnd_end: ['s3SizeList', 's3SingleAndDoubleList']
    },
    th_1d: {
        th_1d_head: ['head3SizeList', 'head3SingleAndDoubleList'],
        th_1d_end: ['endSizeList', 'endSingleAndDoubleList'],
    },
    th_2d: {
        th_2d_head: ['head2SizeList', 'head2SingleAndDoubleList'],
        th_2d_end: ['endSizeList', 'endSingleAndDoubleList'],
        th_2d_head_prize: ['head3SizeList', 'head3SingleAndDoubleList']
    },
    th_3d: {
        th_3d_head: ['head3SizeList', 'head3SingleAndDoubleList'],
        th_3d_front3: {
            one: ['firstOneSizeList', 'firstOneSingleAndDoubleList'],
            two: ['firstTwoSizeList', 'firstTwoSingleAndDoubleList']
        },
        th_3d_after3: {
            one: ['afterOneSizeList', 'afterOneSingleAndDoubleList'],
            two: ['afterTwoSizeList', 'afterTwoSingleAndDoubleList']
        },
        th_3d_head_prize: ['head3SizeList', 'head3SingleAndDoubleList'],
    },
    ph_2d: {
        ph_2d_multiple_play1: ['twoSizeList', 'twoSingleAndDoubleList'],
        ph_2d_one_play1: ['oneSizeList', 'oneSingleAndDoubleList']
    },
    ph_3d: {
        ph_3d_multiple_play1: ['threeSizeList', 'threeSingleAndDoubleList'],
        ph_3d_two_play1: ['twoSizeList', 'twoSingleAndDoubleList'],
        ph_3d_one_play1: ['oneSizeList', 'oneSingleAndDoubleList']
    },
    ph_4d: {
        ph_4d_multiple_play1: ['fourSizeList', 'fourSingleAndDoubleList'],
        ph_4d_three_play1: ['threeSizeList', 'threeSingleAndDoubleList'],
        ph_4d_two_play1: ['twoSizeList', 'twoSingleAndDoubleList'],
        ph_4d_one_play1: ['oneSizeList', 'oneSingleAndDoubleList']
    },
    ph_6d: { 
        ph_6d_four_play1: ['fourSizeList', 'fourSingleAndDoubleList'],
        ph_6d_three_play1: ['threeSizeList', 'threeSingleAndDoubleList'],
        ph_6d_two_play1: ['twoSizeList', 'twoSingleAndDoubleList'],
        ph_6d_one_play1: ['oneSizeList', 'oneSingleAndDoubleList']
    },
    sg_4d: {
        sg_4d_regular: ['fourSizeList', 'fourSingleAndDoubleList']
    },
    sg_3d: {
        sg_3d_regular: ['threeSizeList', 'threeSingleAndDoubleList']
    },
    sg_2d: {
        sg_2d_regular: ['twoSizeList', 'twoSingleAndDoubleList']
    },
    sg_1d: {
        sg_1d_regular: ['oneSizeList', 'oneSingleAndDoubleList']
    },
    my_4d: {
        my_4d_regular: ['fourSizeList', 'fourSingleAndDoubleList']
    },
    my_3d: {
        my_3d_regular: ['threeSizeList', 'threeSingleAndDoubleList']
    },
    my_2d: {
        my_2d_regular: ['twoSizeList', 'twoSingleAndDoubleList']
    },
    my_1d: {
        my_1d_regular: ['oneSizeList', 'oneSingleAndDoubleList']
    },
}
const infoAry = ['big/small', 'even/odd']


const showTab = ref(false)//选项列表是否加载完毕
const showTrend = ref(false)//走势图是否加载完毕

const gameList = reactive([])//地区和游戏
const GamePlayList = reactive([])//所有游戏玩法数据
const activeCountry = ref('')//当前选中的地区
const activeKind = ref('')//当前选中的彩种
let mapactiveKind//映射所选彩种,用于越南地区
const activeType = ref('')//当前选中的玩法类型
const activeMethod = ref('')//当前选中的玩法
const cityId = ref('')//越南地区gameId也就是gameId
const awardNum = ref('')//开奖号码数据
const trendData = ref('')//走势图数据
const digitNum = ref('')//走势图上面选中的one,two......号码
const digitSize = ref('')//走势图上面选中的one,two......大小
const digitOE = ref('')//走势图上面选中的one,two......单双
const digitAry=[digitSize,digitOE]
const gameId = computed(() => {
    showTrend.value = false

    if (!GamePlayList.length||!activeKind.value) return
    // 计算出gameId 越南地区的和其他的
    if (Regional.includes(activeKind.value)) {
        return cityId.value
    } else {
        return GamePlayList.find(item => item.gameName == activeKind.value).gameId
    }
})

const gameCode = computed(() => {
    // 计算出gameId 越南地区的和其他的
    if (Regional.includes(activeKind.value)) {
        let gameCode = GamePlayList.find(item => item.gameId == cityId.value)?.gameCode
        return gameCode
    } else {
        return GamePlayList.find(item => item.gameName == activeKind.value).gameCode
    }
})
mapactiveKind = computed({
    get() {
        if (Regional.includes(activeKind.value)) {
            // 因为越南的gameName内不带vnd,只能使用gameName做find
            return vndCity[activeKind.value][0].code.replace('vnd', '')
        }
        return activeKind.value
    },
    set(value) {
        console.log(value)
    }
})


watch(activeCountry, async (newvalue) => {
    // 所选地区发生变化,默认选中地区下的第一个
    updataActiveFirst(3);

})

watch(activeKind, (newvalue) => {
    if (newvalue == 'north') {
        corresponding.vnd_2d.vnd_head = {
            one: ['sevenOneSizeList', 'sevenOneSingleAndDoubleList'],
            two: ['sevenTwoSizeList', 'sevenTwoSingleAndDoubleList'],
            three: ['sevenThreeSizeList', 'sevenThreeSingleAndDoubleList'],
            four: ['sevenFourSizeList', 'sevenOneSingleAndDoubleList']
        }
        corresponding.vnd_3d.vnd_head = {
            one: ['sixOneSizeList', 'sixOneSingleAndDoubleList'],
            two: ['sixTwoSizeList', 'sixTwoSingleAndDoubleList'],
            three: ['sixThreeSizeList', 'sixThreeSingleAndDoubleList'],
        }
        let firstKey = Object.keys(corresponding[activeType.value][activeMethod.value])[0]
        digitNum.value = firstKey
        digitSize.value = firstKey
        digitOE.value = firstKey
    } else {
        corresponding.vnd_2d.vnd_head = ['eightSizeList', 'eightSingleAndDoubleList']
        corresponding.vnd_3d.vnd_head = ['sevenSizeList', 'sevenSingleAndDoubleList']
    }
})


watch(activeMethod, () => {
    // 针对泰国3d
    if (activeType.value == 'th_3d') {
        let firstKey = Object.keys(corresponding[activeType.value][activeMethod.value])[0]
        digitNum.value = firstKey
        digitSize.value = firstKey
        digitOE.value = firstKey
    }
})


watch(gameId, (newvalue) => {
    if (!newvalue) return
    updataActiveFirst(2);
    nextTick(async () => {
        const obj = { gameCode: gameCode.value, gameId: gameId.value };
        const [res1, res2] = await Promise.all([
        getGameTrend(obj, urlObj[activeCountry.value]),
        getGameAward(obj),
        ]);
        trendData.value = filterEmptyValues(res1.resultSet);
        awardNum.value = res2.resultSet.awardNum;
        showTrend.value = true;
    });

})


watch(activeType, (newvalue) => {
    // 更新activeMethod
    updataActiveFirst(1);
})


const updataActiveFirst = async (level) => {
    // 切换上方tab执行
    if (level >= 3)
        activeKind.value = gameList.find(item => item.countryName == activeCountry.value).games[0]['vndArea'];
    if (level >= 2)
        activeType.value = GamePlayList
            .find(item => item.gameName == mapactiveKind.value)?.gamePlayAndTypeListRespList[0].gamePlayTypeCode;
    if (level >= 1)
        activeMethod.value = GamePlayList.find(item => item.gameName == mapactiveKind.value)
            ?.gamePlayAndTypeListRespList.find(i => i.gamePlayTypeCode == activeType.value)
            .gamePlayList[0].gamePlayCode;
}



function filterEmptyValues(obj) {
    // 过滤空数据的键
    return Object.fromEntries(
        Object.entries(obj).filter(([key, value]) => value)
    );
}


onBeforeMount(async () => {

    let res1 = await getGame()
    Object.assign(gameList, res1.resultSet)

    let res2 = await getGamePlay()
    Object.assign(GamePlayList, res2.resultSet)

    let { resultSet } = await getTime()
    time.value = resultSet


    let obj = gameList.find(item=>item.countryName === "Vietnam");
    let sortOrder = ["VN5mins", "VN30s", "South", "central", "north"];
    obj?.games.sort(
        (a, b) =>
            sortOrder.indexOf(a.vndArea) - sortOrder.indexOf(b.vndArea)
    );
    gameList[0]=obj



    Object.assign(gameList,gameList.filter(item=>item.games.length))
    activeCountry.value = gameList[0].countryName//默认选择一个地区
    updataActiveFirst(3)


    showTab.value = true
})
</script>
<style lang="scss" scoped>
.trend-Page {
    padding: 16px;
    padding-bottom: 20px;
    height: calc(100% - 44px);
    overflow: auto;
    // .card {
    //     box-sizing: border-box;
    //     padding: 10px;
    //     width: 343px;
    //     margin: 10px auto;
    //     background-color: $themebgColor;
    //     border-radius: 7px;
    // }
}

.van-loading {
    background-color: #333;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>