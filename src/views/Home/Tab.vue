<template>
    <div class="Tab_box">
        <div class="item_box" :class="index ===  Index ? 'item_box_ok':''" @click="HandelItem(index,item.url)"  v-for="(item, index) in ItemArrList" :key="index">
            {{ item.title }}
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const ItemArrList = [
    {title:'赛事',url:'/'},
    {title:'体育资讯',url:'/Information'},
    {title:'赛事分析',url:'/Analysis'}
]
// 选中标签
const Index = ref(0)
// 点击事件
const HandelItem = (index,url) => {
    Index.value = index
    router.push(url)
}
</script>
<style lang="scss" scoped>
    .Tab_box{
        z-index: 99999;
        background-color: #fff;
        position: fixed;
        top: 50px;
        left: 0px;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item_box{
            width: 33.3%;
            height: 35px;
            border: 0.2px solid #706d6d;
            font-size: 12px;
            font-weight: 600;
            line-height: 35px;
            text-align: center;
            border-radius: 5px;
        }
        .item_box_ok{
            background-color: rgb(161, 194, 194);
        }
    }
</style>