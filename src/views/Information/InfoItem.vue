<template>
    <div class="InforItem">
        <div class="head">
            <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msyOb.img">
            <div class="user">
                <p class="account">{{ data.account }}</p>
                <p class="time">{{ data.updatedAt }}</p>
            </div>
        </div>
        <van-text-ellipsis rows="3" :content="data.title" :expand-text="'Expand'" :collapse-text="'Collapse'" @click.self="changeTitle(data)"/>

        <template v-if="data.pictureUrl">
            <div :class="formatImg(data.pictureUrl).length==1?'img1-box':'img2-box'">
                <div class="img" 
                v-for="item,index in formatImg(data.pictureUrl).slice(0,4)"
                :class="{ last: formatImg(data.pictureUrl).length > 4 && index === formatImg(data.pictureUrl).slice(0, 4).length - 1 }"
                :data-content="formatImg(data.pictureUrl).length-4"
                @click="changeImg(index)"
                >
                    <img :src="item">
                </div>
            </div>
        </template>
        <div class="more">
          <div><van-icon name="fire-o" color="#ee0a24" size="18"/>{{ data.likeCount||0 }}</div>
          <div>{{ data.commentCount }} {{ 'Message' }}</div>
        </div>

        <div class="bottom">
          <div class="thumbsUp"  >
            <van-icon name="good-job-o" size="18"  @click="skipAIA"/>
            <span>点赞</span>
          </div>
          <div class="message" @click="changeTitle(data)">
            <van-icon name="chat-o" size="18" /><span>{{ 'Comment' }}</span>
          </div>
        </div>
    </div>
</template>
<script setup>
import {useRouter} from 'vue-router'
import { showImagePreview } from 'vant'
import {skipAIA} from "@/util/getRegion.js"
const router=useRouter()
const props = defineProps(['data'])
function formatImg(str) {
  const url = 'https://static.44dog.cc/';
  return str.replace(/\s|\[|\]/g, "").split(",").map(item => item.includes('http') ? item : url + item);
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
    border-bottom: 1px solid #717171;
    font-size: 12px;
    color: #fff;
    background-color: $themebgColor;

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
            justify-content:center;
            gap: 4px;
 
            .time{
                font-size: 10px;
            }
        }
    }

    .van-text-ellipsis {
        margin-top: 10px;
        font-size: 10px;

    }

    .img1-box {
        padding: 10px 0;

    }

    .img2-box {
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: space-between;

        .img {

            width: 48%;
            position: relative;
            img{
                object-fit: cover;
                height: 100%;
            }
        }

        .last::after{
            content:'+'attr(data-content);
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.4);
            border-radius: 6px;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            font-size: 24px;
            color: #fff;
        }
    }

    img {
        width: 100%;
        border-radius: 6px;
    }

    .more {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        color: #777;
        padding: 0 10px;
    }

    .bottom {
        display: flex;
        padding: 5px 10px;
        align-items: center;
        .thumbsUp,
        .message {
            margin-right: 70px;
            display: flex;
            line-height: 20px;
            span {
                margin-left: 5px;
            }
        }
    }
}
</style>