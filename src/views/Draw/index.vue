<template>
    <div class="draw">
        <ul class="draw-list">
            <component :is="viewComponent[$route.query.type]" :item="item" v-for="item in DrawList"/>
        </ul>
    </div>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { getLongDraw,getShortDraw } from "@/api/index.js"
import { getRegion } from "@/util/getRegion.js"
import DrawLong from "@/components/DrawLong.vue"
import DrawShort from "@/components/DrawShort.vue"
const route=useRoute()
const viewComponent= {
    long:DrawLong,
    short:DrawShort
}
const { merchantCode } = getRegion()
const DrawList = reactive([])
onBeforeMount(async () => {
    if(route.query.type=='long'){
        const { resultSet } = await getLongDraw({ merchantCode })
        Object.assign(DrawList,resultSet.map((i)=>i.awardNum))
    }else{
        const { resultSet } = await getShortDraw({merchantCode})
        Object.assign(DrawList,resultSet.map((i)=>i.awardNum))
    }
})
</script>
<style scoped lang="scss">
.draw {
    height: calc(100% - 44px);
    overflow: auto;
    padding:10px 16px;
    color: #fff;
    scrollbar-width: none;
    .draw-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
}
</style>