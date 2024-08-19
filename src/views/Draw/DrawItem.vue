<template>
    <div class="saham-item">

        <div class="left">
            <img class="left-img" src="https://images.b1511258.com:42666/VD/SEA/B1/H5/V2/Stock-2.png">
            <p>{{ data.gameCode }}</p>
        </div>

        <div class="right">

            <BonusPeriod :awardNum="data"></BonusPeriod>

            <template v-if="data['0']">
                <p class="num">
                    <span class="icon">S</span>
                    <span class="draw">{{ data['0'] }}</span>
                </p>
            </template>

            <template v-else-if="data['num']">
                <ul class="ball-num">
                    <li class="num-item" v-for="item in data.num.replaceAll(',','')">{{ item }}</li>
                </ul>
            </template>

            <template v-else-if="data['head']">
                <p class="head-num">
                    <span class="head-text">Head</span>
                    <span class="num-head">{{ data['head'] }}</span>
                </p>
            </template>
        </div>

    </div>
</template>
<script setup>
const props=defineProps(['data'])
import BonusPeriod from '@/components/BonusPeriod.vue';
</script>
<style scoped lang="scss">
.saham-item {
    padding: 16px 10px;
    height: 78px;
    border-radius: 16px;
    background-color: #fff;
    display: flex;
    .left {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        gap: 10px;

        img {
            width: 46px;
            height: 46px;
        }
    }

    .right {
        flex: 1;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;


        .num {
            height: 23px;
            display: flex;
            justify-content: space-between;

            .icon {
                color: #fff;
                width: 23px;
                height: 23px;
                line-height: 23px;
                text-align: center;
                background-size: 100%;
                background-image: url("@/assets/image/home/prize-s.svg");
            }

            .draw {
                text-align: center;
                color: #c84747;
                width: 112px;
                height: 23px;
                line-height: 23px;
                border-radius: 23px;
                background-color: #ececec;
            }
        }

        .ball-num {
            gap: 3px;
            height: 23px;
            display: flex;
            justify-content: space-between;
            .num-item {
                text-align: center;
                line-height: 30px;
                width: 30px;
                height: 30px;
                border-radius: 30px;
                background-image: linear-gradient(0deg, #eeebeb 0%, #fffbfb 100%);
                color: #6f6f6f;
            }
        }
        .head-num{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            font-size: 14px;
            .num-head{
                height: 24px;
                line-height: 24px;
                border-radius: 100px;
                padding: 0 10px;
                color: #c84747;
                background-color: #ececec;
            }
        }
    }
}
</style>