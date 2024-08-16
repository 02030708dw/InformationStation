<template>
    <div class="InforItem">
        <div class="head">
            <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msyOb.img">
            <div class="user">
                <p class="account">{{ data.account }}</p>
                <p class="time">{{ data.updatedAt }}</p>
            </div>
        </div>
        <p class="text" @click="changeTitle(data)">{{ data.title }}</p>

        <div class="img-box" v-if="data.pictureUrl">
            <template v-if="formatImg(data.pictureUrl).length == 1">
                <div class="img-only" v-for="(item, index) in formatImg(data.pictureUrl)" @click="changeImg(index)">
                    <img :src="item">
                </div>
            </template>
            <template v-else>
                <div class="slideshow">
                    <div class="slideshow-item" v-for="(item, index) in formatImg(data.pictureUrl)"
                        @click="changeImg(index)">
                        <img :src="item">
                    </div>
                </div>
            </template>
        </div>
        <div class="video-box" v-if="data.videoUrl">
          <iframe :src="data.videoUrl"></iframe>
        </div>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router'
import { showImagePreview } from 'vant'
const router=useRouter()
const props = defineProps(['data'])
function formatImg(str) {
    return str.replace(/\s|\[|\]/g, "").split(",")
}
const changeImg = (startPosition) => {
    showImagePreview({
        images: formatImg(props.data.pictureUrl),
        startPosition
    });
}
const changeTitle=(data)=>{
    sessionStorage.setItem('InfoDetail',JSON.stringify(data))
    router.push({name:'InfoDetail'})
}
</script>
<style scoped lang="scss">
.InforItem {
    padding: 10px;
    background-color: #fff;

    .head {
        height: 50px;
        display: flex;
        gap: 10px;

        img {
            border-radius: 50px;
            width: 50px;
            height: 50px;
        }

        .user {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;

            .account {
                font-size: 20px;
            }

        }
    }

    .text {
        margin-top: 10px;
    }

    .img-box {
        width: 100%;
        margin: 10px 0;

        .img-only {
            width: 100%;
            aspect-ratio: 2/1;
            background-size: cover;

            img {
                width: 100%;
                object-fit: cover;
            }
        }

        .slideshow {
            width: 100%;
            display: flex;
            gap: 10px;
            overflow-y: auto;

            .slideshow-item {
                border-radius: 6px;
                flex-shrink: 0;
                width: 50%;
                aspect-ratio: 2/1;
                background-size: cover;

                img {
                    object-fit: cover;
                }
            }
        }
    }
    .video-box{
        margin: 10px 0;
        iframe{
            border: none;
            width: 100%;
            height: 200px;
            scrollbar-width: none;
        }
    }
}
</style>