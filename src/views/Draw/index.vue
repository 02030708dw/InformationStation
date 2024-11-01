<template>
    <div class="draw">
        <ul class="saham-list">
            <template v-if="longDrawList.length">
                <li class="saham-item" v-for="item in longDrawList">
                    <div class="left">
                        <img src="https://images.b1511258.com:42666/VD/SEA/B1/H5/V2/Stock-2.png" />
                    </div>
                    <div class="center">
                        <p>{{ item.area }}</p>
                        <p>{{ item.gameCode }}</p>
                    </div>

                    <div class="right">

                        <p class="top">
                            <span class="lastAwardPeriod">{{ item.lastAwardPeriod }}</span>
                            <CountDown :awardNum="item" />
                        <div class="img-s" v-if="item.area == 'vnd' || item.area == 'th'">
                            <img src="@/assets/image/home/prize-s.svg">
                        </div>
                        </p>

                        <p v-if="item.num" class="bottom"><span v-for="i in item.num.replaceAll(',', '')">{{ i }}</span>
                        </p>

                        <p v-else-if="item.area == 'th'" class="bottom"><span v-for="i in item['head']">{{ i }}</span>
                        </p>

                        <p v-else="item.area=='vnd'" class="bottom"><span v-for="i in item['0']">{{ i }}</span></p>

                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue';
import { getLongDraw } from "@/api/index.js"
import { getRegion } from "@/util/getRegion.js"
import CountDown from "@/components/CountDown.vue"
const { merchantCode } = getRegion()
const longDrawList = reactive([])
onBeforeMount(async () => {
    let { resultSet } = await getLongDraw({ merchantCode })

    let arr = resultSet.map(item => item.awardNum)
    Object.assign(longDrawList, arr)
})
</script>
<style scoped lang="scss">
.draw {
    padding:10px 16px;
    color: #fff;
    .saham-list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .saham-item {
            height: 78px;
            display: flex;
            align-items: center;
            gap: 10px;

            .left {
                img {
                    width: 44px;
                }
            }

            .center {
                font-size: 12px;
                max-width: 100px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                display: flex;
                gap: 10px;
                flex-direction: column;

            }

            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;

                .top {
                    display: flex;
                    align-items: center;
                    justify-content: end;

                    .lastAwardPeriod {
                        color: #838383;
                    }

                    span {
                        font-size: 12px;
                        margin: 0 8px;
                    }

                    .img-s {
                        width: 20px;
                        position: relative;

                        img {
                            display: block;
                            width: 100%;
                        }

                        &::after {
                            content: 'S';
                            font-size: 12px;
                            position: absolute;
                            line-height: 20px;
                            text-align: center;
                            margin: auto;
                            inset: 0;
                        }
                    }

                }

                .bottom {
                    display: flex;
                    justify-content: end;
                    gap: 4px;

                    span {
                        font-size: 14px;
                        background: linear-gradient(to bottom, #4b4b4b, #626262);
                        border-radius: 24px;
                        line-height: 24px;
                        text-align: center;
                        width: 24px;
                        height: 24px;
                    }
                }
            }
        }
    }
}
</style>