<template>
    <div class="AwardNum">

        <p class="title">
            <span>{{ name }} </span>
            <span>{{ awardNum.awardPeriod }}</span>
        </p>

        <template v-if="countryName == 'Vietnam'"> 
            <ul class="award1" tabindex="1" @blur="showVnd = false" @click="showVnd = !showVnd">
                <li class="award-item"><img :src="imgS"><span>{{ awardNum[0] }}</span></li>
                <li class="award-item"><img :src="img1"><span>{{ awardNum[1] }}</span></li>
            </ul>
            <Transition>
                <div class="vnd" v-show="showVnd">
                    <VndNum :data="awardNum" />
                </div>
            </Transition>
        </template>

        <template v-else-if="countryName=='Thailand'">
            <!-- 除越南以外的开奖号码 -->
            <ul class="award2">
                <li class="award-item" v-for="(item,index) in place1">
                    {{ awardNum[item] }}
                    <span class="tips">{{ index+1 }}</span>
                </li>
            </ul>
        </template>

        <template v-else>
            <ul class="award2">
                <li class="award-item" v-for="(item,index) in awardNum.num?.split(',')">
                    {{ item }}
                    <span class="tips w" v-if="awardNum.num.split(',').length>1">{{ place2[index] }}</span>
                </li>
            </ul>
        </template>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import imgS from "@/assets/image/ranking/0.png"
import img1 from "@/assets/image/ranking/1.png"

import VndNum from "./VndNum.vue"


const props = defineProps(['awardNum', 'countryName', 'name'])
const place1 = ['head', 'firstThree', 'afterThree', 'end']
const place2 = ['1st', '2nd', '3rd', '4th', '5th', '6th'];

const showVnd = ref(false)//是否显示越南开奖号码


</script>
<style scoped lang="scss">
.AwardNum {
    position: relative;

    .title {
        height: 40px;
        font-size: 16px;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // padding-left: 5px;
        padding-right: 150px;

        & span:nth-child(2) {
            font-size: 14px;
            color: #666;
        }
    }

    .award1 {
        color: #000;
        font-size: 16px;
        display: flex;
        height: 25px;

        gap: 20px;

        .award-item {
            flex: 1;
            background-color: #e8efff;
            border-radius: 5px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;

            img {
                width: 20px;
                height: 20px;
            }
        }
    }
    .award2{
        color: #000;
        font-size: 16px;
        display: flex;
        gap: 20px;
        .award-item{
            border-radius: 5px;
            line-height: 25px;
            text-align: center;
            background-color: #e8efff;
            flex: 1;
            position: relative;
            .tips{
                text-align: center;
                border-radius: 3px;
                line-height: 10px;
                font-size: 10px;
                position: absolute;
                width: 10px;
                height: 10px;
                background-color: brown;
                color: #fff;
                top: 0;
                left: 0;
            }
            .w{
                width: 20px;
            }
        }
    }
    .vnd {
        z-index: 3;
        padding:0 15px;
        position: absolute;
        inset: 0;
        top: 75px;
        margin: auto;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.3s;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .v-enter-to,
    .v-leave-from {
        opacity: 1;
    }
}
</style>