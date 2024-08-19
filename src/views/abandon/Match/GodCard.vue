<template>
    <div class="god-card">
        <div class="god-info">
            <div style="height: 100%;">
                <img src="https://th.bing.com/th/id/OIP.m--751RSKkOTO8ZxoEK4WQAAAA?rs=1&pid=ImgDetMain" class="headimg">
            </div>
            <div class="t1">Pauline Rulssell</div>
            <div class="t2">Pauline Rulssell</div>
            <div class="t3">@Raymond Hale</div>
        </div>
        <div class="text" @click="emits('changeTitle',data)">{{ data.title }}</div>
        <div class="img-box" v-if="data.pictureUrl">
            <template v-if="formatImg(data.pictureUrl).length == 1" >
                <div class="img-only" 
                v-for="(item,index) in formatImg(data.pictureUrl)" 
                @click="changeImg(index)" 
                >
                <img :src="item" @error="errorImg">
                </div>
            </template>
            <template v-else>
                <div class="slideshow">
                    <div 
                    class="slideshow-item" 
                    v-for="(item,index) in formatImg(data.pictureUrl)"
                    @click="changeImg(index)"
                    >
                    <img :src="item" @error="errorImg">
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
import failImg from "@/assets/fail.png"
import { showImagePreview } from 'vant';
const props = defineProps({
    data: { type: Object, required: true }
})
const emits=defineEmits(['changeTitle'])
const changeImg = (startPosition) => {
    showImagePreview({
        images: formatImg(props.data.pictureUrl),
        startPosition
    });
}
function formatImg(str) {
    return str.replace(/\s|\[|\]/g, "").split(",")
}
function errorImg(e){
    e.target.src=failImg
    e.target.style.objectFit='none'
}
</script>
<style lang="scss" scoped>
.god-card {
    background-color: #1C1C1C;
    padding: 10px;
    overflow: hidden;
    .god-info {
        height: 50px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: flex-start;

        div {
            min-width: 50px;
            height: 50%;
            font-size: 16px;
        }

        .headimg {
            border-radius: 100vw;
        }

        .t1 {
            line-height: 25px;
            color: #fff;
        }

        .t2 {
            line-height: 25px;
            font-size: 12px;
            color: #6582BA;
        }

        .t3 {
            margin-left: 5px;
            line-height: 25px;
            color: #545355;
        }
    }

    .text {
        padding-top: 10px;
        color: #fff;
        font-size: 14px;
        overflow: hidden;
    }

        .img-box {
            width: 100%;
            margin-top: 10px;
            .img-only{
                width: 100%;
                aspect-ratio: 2/1;
                background-size: cover;
                img{
                        object-fit: cover;
                    }
            }
            .slideshow{
                width: 100%;
                display: flex;
                gap: 10px;
                overflow-y: auto;
                .slideshow-item{
                    border-radius: 6px;
                    flex-shrink: 0;
                    width: 50%;
                    aspect-ratio: 2/1;
                    background-size: cover;
                    img{
                        object-fit: cover;
                    }
                }
            }
        }
}
</style>