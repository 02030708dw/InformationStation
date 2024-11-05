<template>
    <div class="free-play">
        <Title text="Free Play" />
        <ul class="play scrollbar" v-if="userState.freeGameList?.length">
            <li class="play-item" v-for="item in userState.freeGameList" @click="skip(item.shareUrl || item.trialUrl)">
                <img :src="picurl + JSON.parse(item.pictureUrl)[0].pictureUrl">
            </li>
        </ul>
        <van-skeleton title :row="2" v-else />
    </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
import Title from './Title.vue';
import { useUserStore } from '@/stores/modules/userinfo.js';
import { getTrialGameList,getshareGameList } from "@/api/index.js"
import { getRegion } from '@/util/getRegion.js';
const picurl = 'https://gwstatic.mvkbnb.com/'
const userState = useUserStore()
const skip = (url) => window.location.href = url
onBeforeMount(async () => {
    const { trialMerchantCode,merchantCode } = getRegion()
    if (!userState.memberId) {
        let { resultSet } = await getTrialGameList({ trialMerchantCode })
        userState.freeGameList = resultSet
    }else{
        // let { resultSet }=await getshareGameList({merchantCode:merchantCode,thirdPartyUid:userState.memberId,trailMerchantCode:trialMerchantCode})
        // console.log(resultSet)
    }
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
            border-radius: 8px;
            overflow: hidden;
            width: 106px;
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