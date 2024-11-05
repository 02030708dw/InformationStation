<template>
  <div class="tirbo">
    <Title text="Tirbo" @changeMore="changeMore($router)" />
    <ul class="lotter-list">

      <template v-if="data.length">
        <DrawShort :item="item" v-for="item in data"/>
      </template>

      <template v-else>
        <van-skeleton title :row="1" class="list-item" v-for="item in 4"/>
      </template>
      
    </ul>
  </div>
</template>
<script setup>
import {  reactive, onBeforeMount, onUnmounted } from "vue";
import { getShortDraw } from "@/api/index.js";
import Title from "./Title.vue";
import DrawShort from "@/components/DrawShort.vue";
import { usePageStore } from "@/stores/modules/pageState.js";
import {getRegion} from "@/util/getRegion.js"
const pageState=usePageStore()
const data = reactive([]);

const getDraw = async () => {
  let {merchantCode}=getRegion()
  let { resultSet } = await getShortDraw({merchantCode});
  Object.assign(data,resultSet.slice(0,4).map((item) => item.awardNum));
};

const changeMore=(router)=>{
  pageState.isBack=true
  router.push({ name: 'Draw',params:{type:'short'} })
}

let intervalT;
onBeforeMount(() => {
  getDraw();
  intervalT = setInterval(getDraw,  60 * 1000);
});

onUnmounted(() => {
  clearInterval(intervalT);
});
</script>
<style scoped lang="scss">
.tirbo {
    background-color: $themebgColor;
    color:#fff;
    border-radius: 7px;
  .lotter-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
