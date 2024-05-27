<template>
    <div class="draw">
        <GameTab :list="list" v-model="activeGame" />
        <Trend :data="TrendAry[activeGame]"/>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import GameTab from './GameTab.vue';
import Trend from './Trend.vue'
import {TrendAry} from './data.js'
import {getGameInfo} from "@/api/request.js"
const list = ['Vietnam', 'Thailand', '菲律宾', '马来西亚']
const activeGame = ref('Vietnam')

getGameInfo().then(res=>{
    console.log(res.resultSet)
})
</script>
<style scoped>
.draw {
    min-height: 100%;
    background-color: #fff;
}

</style>