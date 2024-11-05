<template>
    <div class="draw">
        <ul class="draw-list" v-if="DrawList.length">
            <component :is="view[type].component" :item="item" v-for="item in DrawList"/>
        </ul>
        <van-loading v-else />
    </div>
</template>
<script setup>
import { reactive, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { getLongDraw,getShortDraw } from "@/api/index.js"
import { getRegion } from "@/util/getRegion.js"
import DrawLong from "@/components/DrawLong.vue"
import DrawShort from "@/components/DrawShort.vue"
const route = useRoute();
const type = route.params.type;
const { merchantCode } = getRegion();
const DrawList = reactive([]);
const view = {
    long: {
        component: DrawLong,
        getData: () => getLongDraw({ merchantCode })
    },
    short: {
        component: DrawShort,
        getData: () => getShortDraw({ merchantCode })
    }
};

onBeforeMount(async () => {
    const { resultSet } = await view[type].getData();
    Object.assign(DrawList, resultSet.map((i) => i.awardNum));
});
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
    .van-loading{
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>