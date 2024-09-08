<template>
  <div class="vnd-city">
    <ul v-for="(item, index) in vndCity[city]" class="week-item">
      <li class="item week">{{ obj[index] }} ({{ index }})</li>
      <li class="item" v-for="i, n in item" @click="changeCity(i)"
        :class="{ active: i.id == activeId, itemb: maxNum == n + 1 }">
        {{ i.code }}
      </li>
      <li v-for="i in maxNum-item.length" class="item"></li>
    </ul>
  </div>
</template>
<script setup>
import { ref, computed, watch, onBeforeMount } from "vue";
import { vndCity as zones } from "./vndCity.js";
const props=defineProps(['time'])
const city = defineModel('city')
const code = defineModel('gameCode')
const gameId=defineModel('gameId')

const activeId = ref('') //用于动态样式
const vndCity = computed(() => mapByWeek(zones));

const changeCity = (i) => {
  code.value = i.code
  gameId.value=i.gameId
  activeId.value = i.id
}
const maxNum = computed(() => {
  let data = vndCity.value[city.value]
  let arr = []
  for (let i in data)
    arr.push(data[i].length)
  return Math.max(...arr);
})
onBeforeMount(() => {
  code.value = vndCity.value[city.value][sortedDays[0]][0].code
  activeId.value = vndCity.value[city.value][sortedDays[0]][0].id
  gameId.value=vndCity.value[city.value][sortedDays[0]][0].gameId
})
watch(city, (newvalue) => {
  code.value = vndCity.value[newvalue][sortedDays[0]][0].code
  activeId.value = vndCity.value[newvalue][sortedDays[0]][0].id
  gameId.value=vndCity.value[city.value][sortedDays[0]][0].gameId
})
let obj = {};//星期几对应的日期
let sortedDays;//排序星期几的数组
function mapByWeek(data) {
  const time=+props.time
  let currentDate = new Date(time); // 使用外部的时间戳变量
  let dayOfWeek = currentDate.getDay(); // 获取今天是星期几，0（星期日）到6（星期六）
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // let days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  sortedDays = days.slice(dayOfWeek).concat(days.slice(0, dayOfWeek));

  let result = { central: {}, South: {}, north: {} };

  // 创建一个对象，来对应日期与星期的关系
  sortedDays.forEach((day, index) => {
    let date = new Date(time);
    date.setDate(currentDate.getDate() + index);
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let dayOfMonth = date.getDate().toString().padStart(2, "0");
    let formattedDate = `${month}-${dayOfMonth}`;
    obj[day] = formattedDate;
  });
  for (let region in result) {
    sortedDays.forEach((day) => {
      result[region][day] = [];
    });
  }

  for (let region in data) {
    data[region].forEach((item) => {
      let day = sortedDays[item.week - 1];
      result[region][day].push(item);
    });
  }

  return result;
}

</script>
<style scoped lang="scss">
.vnd-city {
  background-color: #fff;
  font-size: 16px;
  display: flex;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  .week-item {
    background-color: #fff;
    flex-shrink: 0;
    width: 33.33%;

    .item {
      color: #000;
      text-align: center;
      line-height: 25px;
      background-color: #fff;
      height: 25px;
      border: 1px solid #000;
    }

    .week {
      color: #fff;
      font-size: 14px;
      background-color: #666;
      border: 1px solid #fff;
      border-top: none;
      border-bottom: none;
    }

    .active {
      background-color: #FFE594;
    }
  }

  .week-item:first-child>.week {
    border-left: 1px solid #000;
  }

  .week-item:last-child>.week {
    border-right: 1px solid #000;
  }

}
</style>
