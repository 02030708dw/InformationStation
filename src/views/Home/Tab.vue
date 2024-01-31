<template>
    <div class="Tab_box">
        <div 
            class="item_box" 
            :class="item.url === route.path ? 'item_box_ok' : ''" 
            @click="handleItemClick(index, item.url)"  
            v-for="(item, index) in itemArrList" 
            :key="index"
        >
            {{ item.title }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// ID是路由的第一个参数
const userId = route.params.id;

const itemArrList = [
    { title: '赛事', url: `/${userId}` },
    { title: '体育资讯', url: `/${userId}/Information` },
    { title: '赛事分析', url: `/${userId}/Analysis` }
];

const selectedIndex = ref(0);

const handleItemClick = (index, url) => {
    selectedIndex.value = index;
    router.push(url);
};
</script>
<style lang="scss" scoped>
.Tab_box {
  z-index: 99999;
  background-color: #fff;
  position: fixed;
  top: 50px;
  left: 0px;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item_box {
    width: 33.3%;
    height: 35px;
    border: 0.2px solid #706d6d;
    font-size: 12px;
    font-weight: 600;
    line-height: 35px;
    text-align: center;
    border-radius: 5px;
  }
  .item_box_ok {
    background-color: rgb(161, 194, 194);
  }
}
</style>
