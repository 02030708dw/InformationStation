<template>
    <div class="saham">
        <Title text="Saham" @changeMore="$router.push({ name: 'Draw' })" />
        <ul class="saham-list">

            <template v-if="data.length">
                <li class="saham-item" v-for="item in data">
                    <div class="left">
                        <img class="left-img" src="https://images.b1511258.com:42666/VD/SEA/B1/H5/V2/Stock-2.png">
                        <p>{{ item.gameCode }}</p>
                    </div>

                    <div class="right">

                        <BonusPeriod :awardNum="item"></BonusPeriod>

                        <p class="num">
                            <span class="icon">S</span>
                            <span class="draw">{{ item['0'] }}</span>
                        </p>
                    </div>
                </li>
            </template>

            <template v-for="item in 4" v-else>
                <van-skeleton title avatar :row="3" />
            </template>
        </ul>
    </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount, onUnmounted } from 'vue'
import { getLongDraw } from "@/api/index.js"
import Title from "./Title.vue"
import BonusPeriod from "@/components/BonusPeriod.vue"
const data = reactive([])
const getDraw = async () => {
    let { resultSet } = await getLongDraw()
    Object.assign(data, resultSet.slice(0, 4).map(item => item.awardNum))
}

let intervalT
onBeforeMount(() => {
    getDraw()
    intervalT = setInterval(getDraw, 60 * 60 * 1000)
})

onUnmounted(() => {
    clearInterval(intervalT)
})
</script>
<style lang="scss" scoped>
.saham {
    .saham-list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .saham-item {
            padding: 16px 10px;
            height: 78px;
            border-radius: 16px;
            background-color: #fff;
            display: flex;

            .left {
                font-size: 14px;
                width: 50%;
                height: 100%;
                display: flex;
                align-items: center;
                gap: 10px;

                img {
                    height: 100%;
                }
            }

            .right {
                width: 50%;
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
            }
        }
    }
}
</style>