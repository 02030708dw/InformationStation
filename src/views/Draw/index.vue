<template>
    <div class="draw">
        <GameTab :list="gameList" v-model="activeGame"></GameTab>
        <div class="draw-list">
            <DrawItem v-for="item in longDrawList.filter(item=>item.area==activeGame)" :data="item"></DrawItem>
        </div>
    </div>
</template>
<script setup>
import { ref,reactive,onBeforeMount } from 'vue';
import {getLongDraw} from "@/api/index.js"
import GameTab from './GameTab.vue';
import DrawItem from './DrawItem.vue'
const gameList=reactive([])
const activeGame=ref('vnd')
const longDrawList=reactive([])
onBeforeMount(async()=>{
    let {resultSet}=await getLongDraw()
    let arr=resultSet.map(item=>item.awardNum)
    Object.assign(longDrawList,arr)
    Object.assign(gameList,[...new Set(arr.map(item => item.area))])
    console.log(longDrawList)
})
</script>
<style scoped lang="scss">
.draw{
    padding: 16px;
    .draw-list{
        margin-top: 20px;
        display: flex;
        flex-direction:column;
        gap: 10px;
    }
}
</style>