<template>
  <div class="tirbo">
    <Title text="Tirbo" @changeMore="$router.push({ name: 'Draw' })" />
    <ul class="lotter-list">
      <template v-if="data.length">
        <li class="list-item" v-for="item in data.slice(0, 4)">
          <p class="top">
             <span>{{ item.gameCode }}</span> 
             <span>{{ item.lastAwardPeriod }}</span> 
            </p>

          <p class="bottom"> 
            <CountDown :awardNum="item"/>
            <span class="globe" v-if="item.num"> 
              <span v-for="i in item.num.replaceAll(',', '')">{{ i }}</span> 
            </span> 

            <span class="globe" v-else-if="item.area=='vnd'"> 
              <span v-for="i in item['0']">{{ i }}</span> 
            </span> 

            <span class="globe" v-else="item.area=='th'"> 
              <span v-for="i in item['head']">{{ i }}</span> 
            </span> 
          </p>


        </li>
      </template>

      <template v-else>
        <van-skeleton title :row="1" class="list-item" v-for="item in 4"/>
      </template>
    </ul>
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount, onUnmounted } from "vue";
import { getShortDraw } from "@/api/index.js";
import Title from "./Title.vue";
// import BonusPeriod from "@/components/BonusPeriod.vue";//修改样式已弃用
import CountDown from "@/components/CountDown.vue";
import {getRegion} from "@/util/getRegion.js"
const data = reactive([]);

const getDraw = async () => {
  let {merchantCode}=getRegion()
  let { resultSet } = await getShortDraw({merchantCode});
  Object.assign(data,resultSet.map((item) => item.awardNum));
};

let intervalT;
onBeforeMount(() => {
  getDraw();
  intervalT = setInterval(getDraw, 10000);
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
    font-size: 12px;
    gap: 10px;
    .list-item{
      display: flex;
      flex-direction: column;
      height: 70px;
      border-bottom: 1px solid #717171;
      p{
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex: 1;
        .globe{
          display: flex;
          gap: 4px;
          span{
            font-size: 14px;
            background: linear-gradient(to bottom, #4b4b4b, #626262);
            border-radius: 24px;
            line-height: 24px;
            text-align: center;
            width:24px;
            height: 24px;
          }
        }
      }
    }

  }
}
</style>
