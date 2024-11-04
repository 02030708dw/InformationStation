<template>
  <div class="saham">
    <Title text="Saham" @changeMore="changeMore($router)" />
    <ul class="saham-list">
      
      <template v-if="data.length">
        <DrawLong :item="item" v-for="item in data"/>
      </template>

      <template v-for="item in 4" v-else>
        <van-skeleton title avatar :row="3" />
      </template>

    </ul>
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount, onUnmounted } from "vue";
import { getLongDraw } from "@/api/index.js";
import { getRegion } from "@/util/getRegion.js"
import Title from "./Title.vue";
import CountDown from "@/components/CountDown.vue";
import DrawLong from "@/components/DrawLong.vue";
import { usePageStore } from "@/stores/modules/pageState.js";
const pageState=usePageStore()
const data = reactive([]);
const getDraw = async () => {
  let { merchantCode } = getRegion()
  let { resultSet } = await getLongDraw({ merchantCode });
  Object.assign(
    data,
    resultSet.slice(0, 5).map((item) => item.awardNum)
  );
};


const changeMore=(router)=>{
  pageState.isBack=true
  router.push({name:'Draw',query:{type:'long'}})
}


let intervalT;
onBeforeMount(() => {
  getDraw();
  intervalT = setInterval(getDraw, 60 * 60 * 1000);
});

onUnmounted(() => {
  clearInterval(intervalT);
});
</script>
<style lang="scss" scoped>
.saham {
  background-color: $themebgColor;
  color: #fff;

  .saham-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>
