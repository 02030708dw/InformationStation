<template>
    <div class="InfoDetail">
        <div class="head">
            <van-icon name="arrow-left" @click="$router.back()"/>
            <div class="text">详情</div>
            <div class="hidden"></div>
        </div>
        <InfoItem :data="data"/>
    </div>
</template>
<script setup>
import {ref,reactive,onBeforeMount} from 'vue'
import InfoItem from './InfoItem.vue';
const data=reactive({})
onBeforeMount(()=>{
    Object.assign(data,JSON.parse(sessionStorage.getItem('InfoDetail')))
    console.log(data)
})
</script>
<style lang="scss" scoped>
.InfoDetail{
    .head{
        padding: 0 10px;
        background-color: #0256ff;
        height: 44px;
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .van-icon{
            width: 30px;
            display: flex;
            align-items: center;
            justify-content:center;
            height: 44px;
            color: #fff;
            font-size: 24px;
        }
        .text{
            width: 50px;
            color: #fff;

           line-height: 44px;
        }
        .hidden{
            visibility: hidden;
            width: 30px;
        }
    }
}
</style>