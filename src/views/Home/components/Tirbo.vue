<template>
    <div class="tirbo">
        <Title text="Tirbo" />
        <ul class="lotter-list">
            <li class="list-item" v-for="item in 4">
                <p class="title">
                    <img src="@/assets/image/home/ck.png">
                    <span>vndThirtySecond</span>
                </p>
                <p class="time">
                    <span class="date">20240815-0000</span>
                    <span class="countdown">00:00:00</span>
                </p>

                <template v-if="item<3">
                    <p class="num">
                        <span class="icon">S</span>
                        <span class="draw">234432</span>
                    </p>
                </template>

                <template v-else>
                    <ul class="draw-num">
                        <li class="draw-item" v-for="item in 3">1</li>
                    </ul>
                </template>
            </li>
        </ul>
    </div>
</template>
<script setup>
import Title from './Title.vue';
</script>
<style scoped lang="scss">
.tirbo {
    .lotter-list {
        flex-wrap: wrap;
        display: flex;
        justify-content: space-between;
        gap: 10px;

        .list-item {
            width: 48%;
            height: 118px;
            padding: 10px;
            background-color: white;
            border-radius: 20px;
            box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;

            .title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 30px;

                img {
                    width: 30px;
                }

                span {
                    max-width: 105px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            .time {
                font-size: 12px;
                height: 24px;
                display: flex;
                padding: 0 5px;
                align-items: center;
                justify-content: space-between;
                background-color: #e1f2ff;
                border-radius: 24px;
                .date {
                    color: #895967;
                }

                .countdown {
                    color: #348def;
                }
            }

            .num {
                height: 24px;
                display: flex;
                justify-content: space-between;
                .icon{
                    color: #fff;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    background-size: 100%;
                    background-image: url("@/assets/image/home/prize-s.svg");
                }
                .draw{
                    text-align: center;
                    color: #c84747;
                    width: 112px;
                    height: 24px;
                    line-height:  24px;
                    border-radius: 24px;
                    background-color: #ececec;
                }
            }
            .draw-num{
                height: 32px;
                display: flex;
                gap: 5px;
                .draw-item{
                    background-image: linear-gradient(0deg, #eeebeb 0%, #fffbfb 100%);
                    color: #6f6f6f;
                    font-size: 16px;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    border-radius:32px;
                    text-align: center;
                }
            }
        }
    }
}
</style>