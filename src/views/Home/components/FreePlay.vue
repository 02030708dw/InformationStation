<template>
    <div class="free-play">
        <Title text="Free Play" />
        <ul class="play" v-if="gameList.length">
            <li class="play-item" v-for="item in gameList" @click="skip(item.shareUrl||item.trialUrl)">
                <img :src="picurl+JSON.parse(item.pictureUrl)[0].pictureUrl">
            </li>
        </ul>
        <van-skeleton title :row="2" v-else/>
    </div>
</template>
<script setup>
import { onBeforeMount,reactive } from 'vue';
import Title from './Title.vue';
import { useUserState } from '@/stores/modules/userinfo.js';
import {getTrialGameList,getshareGameList} from "@/api/index.js"
import { getRegion } from '@/util/getRegion.js';
const picurl='https://gwstatic.mvkbnb.com/'
const userStore=useUserState()
const gameList=reactive([])

const skip=(url)=>{
    console.log(url)
    window.location.href=url
}

onBeforeMount(async ()=>{
    const {trialMerchantCode}=getRegion()
    if(userStore.shareId){
        let {resultSet}=await getshareGameList({memberId:userStore.shareId})
        Object.assign(gameList,resultSet)
    }else{
        let {resultSet}=await getTrialGameList({trialMerchantCode})
        Object.assign(gameList,resultSet)
    }
    console.log(gameList)
})
</script>
<style lang="scss">
.free-play {
    background-color: $themebgColor;
    color: #fff;
    border-radius: 7px;
    // padding: 5px;
    .play {
        display: flex;
        gap: 10px;
        overflow: auto;
        justify-content: space-between;
        .play-item {
            flex-shrink: 0;
            border-radius:8px;
            overflow: hidden;
            width:106px;
            height: 78px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}
</style>