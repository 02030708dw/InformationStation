<template>
    <div class="saham">
        <Title text="Saham" />
        <ul class="saham-list">
            <li class="saham-item" v-for="item in 4">

                <div class="left">
                    <img class="left-img" src="https://images.b1511258.com:42666/VD/SEA/B1/H5/V2/Stock-2.png">
                    <p>vndTPHCM</p>
                </div>

                <div class="right">

                    <p class="time">
                        <span class="date">20240815-0000</span>
                        <span class="countdown">00:00:00</span>
                    </p>

                    <p class="num">
                        <span class="icon">S</span>
                        <span class="draw">234432</span>
                    </p>
                </div>

            </li>
        </ul>
    </div>
</template>
<script setup>
import Title from "./Title.vue"
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
                .time {
                    font-size: 12px;
                    height: 23px;
                    border-radius: 23px;
                    display: flex;
                    align-items: center;
                    padding: 0 5px;
                    justify-content: space-between;
                    background-color: #e1f2ff;

                    .date {
                        color: #895967;
                    }

                    .countdown {
                        color: #348def;
                    }
                }

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