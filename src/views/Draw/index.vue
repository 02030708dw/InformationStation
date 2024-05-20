<template>
    <div class="draw">
        <GameTab :list="list" v-model="activeGame" />
        <Trend :data="arrList"/>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import GameTab from './GameTab.vue';
import Trend from './Trend.vue'
const list = ['泰国', '越南', '菲律宾', '马来西亚']
const activeGame = ref('泰国')
const arrList = [
    { nums: "S", xy: [1, -1] },
    { nums: "S", xy: [1, -2] },
    { nums: "S", xy: [1, -3] },
    { nums: "S", xy: [1, -4] },
    { nums: "S", xy: [1, -5] },
    { nums: "S", xy: [1, -6] },
    { nums: "S", xy: [2, -6] },
    { nums: "S", xy: [3, -6] },
    { nums: "B", xy: [2, -1] },
    { nums: "B", xy: [2, -2] },
    { nums: "B", xy: [2, -3] },
    { nums: "B", xy: [2, -4] },
    { nums: "S", xy: [3, -1] },
    { nums: "S", xy: [3, -2] },
    { nums: "S", xy: [3, -3] },
    { nums: "S", xy: [3, -4] },
    { nums: "S", xy: [3, -5] },
    { nums: "S", xy: [4, -5] },
    { nums: "B", xy: [4, -1] },
    { nums: "S", xy: [5, -1] },
    { nums: "S", xy: [5, -2] },
    { nums: "B", xy: [6, -1] },
    { nums: "S", xy: [7, -1] },
    { nums: "S", xy: [7, -2] },
    { nums: "S", xy: [7, -3] },
    { nums: "S", xy: [7, -4] },
    { nums: "S", xy: [7, -5] },
    { nums: "S", xy: [7, -6] },
    { nums: "B", xy: [8, -1] },
    { nums: "B", xy: [8, -2] },
    { nums: "B", xy: [8, -3] },
    { nums: "S", xy: [9, -1] },
    { nums: "S", xy: [9, -2] },
    { nums: "S", xy: [9, -3] },
    { nums: "S", xy: [9, -4] },
    { nums: "S", xy: [9, -5] },
    { nums: "S", xy: [9, -6] },
    { nums: "S", xy: [10, -6] },
    { nums: "S", xy: [11, -6] },
    { nums: "S", xy: [12, -6] },
    { nums: "S", xy: [13, -6] },
    { nums: "S", xy: [14, -6] },
    { nums: "S", xy: [15, -6] },
    { nums: "S", xy: [16, -6] },
];

</script>
<style scoped>
.draw {
    min-height: 100%;
    background-color: #fff;
}

</style>