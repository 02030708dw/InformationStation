<template>
    <div class="draw-box">
        <div class="draw-list" v-for="(item,index) in 9">
            <div class="left" v-if="data[index]"><img :src="RankImg[index]" class="img"></div>
            <div class="right" v-if="data[index]">
                <span 
                :class="{'show-border':data[index].split(',').length-1}"
                 class="num" 
                v-for="(v,i) in data[index].split(',')">
                <i v-if="data[index].split(',').length-1">{{ i+1 }}</i>
                {{ v }}
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
import rank0 from "@/assets/image/ranking/0.png";
import rank1 from "@/assets/image/ranking/1.png";
import rank2 from "@/assets/image/ranking/2.png";
import rank3 from "@/assets/image/ranking/3.png";
import rank4 from "@/assets/image/ranking/4.png";
import rank5 from "@/assets/image/ranking/5.png";
import rank6 from "@/assets/image/ranking/6.png";
import rank7 from "@/assets/image/ranking/7.png";
import rank8 from "@/assets/image/ranking/8.png";
let RankImg = [rank0, rank1, rank2, rank3, rank4, rank5, rank6, rank7, rank8];
const props=defineProps(['data'])
</script>
<style scoped lang="scss">
.draw-box {
    overflow: hidden;
    font-size: 14px;
    border-radius: 5px;
    .draw-list {
        border-left: 1px solid #b3b3b3;
        border-right: 1px solid #b3b3b3;
        display: flex;
        .left {
            border-right:1px solid #b3b3b3;
            display: flex;
            width: 45px;
            .img {
                margin: auto;
                width: 28px;
                height: 28px;
            }
        }
        .right {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            .num{
                box-sizing: border-box;
                min-width: 25%;
                flex: 1;
                line-height: 44px;
                text-align: center;
                position: relative;
                i{  
                    color: #fff;
                    width: 14px;
                    height: 14px;
                    font-style: normal;
                    position: absolute;
                    top: 0;
                    left: 0;
                    line-height: 14px;
                    font-size: 12px;
                    text-align: center;
                    background-color: #9fd3b9;
                }
            }
            .show-border{
                border: 1px solid #b3b3b3;
            }

        }
    }
    .draw-list:nth-child(2n-1){
            background-color: #e2e2e2;
        }
        .draw-list:nth-child(2n){
            background-color: #fff;
        }
}
</style>