<template>
    <div class="home">
        <!-- <FreePlay></FreePlay> -->
        <!-- <Tirbo></Tirbo> -->
        <Trend></Trend>
        <!-- <InforMation></InforMation> -->
        <!-- <Saham></Saham> -->
    </div>
</template>
<script setup>
import FreePlay from "./components/FreePlay.vue"
import Tirbo from './components/Tirbo.vue';
import Trend from './components/Trend.vue';
import InforMation from './components/InforMation.vue';
import Saham from './components/Saham.vue';
</script>
<style scoped lang="scss">
.home{
    padding:0 16px 10px;
    display: flex;
    flex-direction:column;
    // gap: 10px;
}
</style>