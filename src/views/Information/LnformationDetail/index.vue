<template>
  <div class="detail">
    <NavBar />
    <div class="content">
      <div class="main">

        <div class="top">
          <van-image class="avatar" fit="cover" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          <div class="right"><p>{{ InfoDetail.account }}</p><p>{{ InfoDetail.updatedAt }}</p></div>
        </div>

        <div class="title"> {{ InfoDetail.title }} </div>

        <div class="imgs" v-if="InfoDetail.pictureUrl">
          <img :src="item" v-for="item in getImageUrls(InfoDetail.pictureUrl)">
        </div>

        <div class="bottom">

          <p @click="skipAIA"><van-icon name="good-job-o" size="18" /> <span>{{  InfoDetail.likeCount||0}}</span></p>
          <p><van-icon name="chat-o" size="18" /> <span>{{ InfoDetail.commentCount }}</span></p>
        </div>



        <van-list v-model:loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多" >
          <CommentItem :data="{...item,collectNewId:Option.collectNewId}" v-for="item in list"/>
        </van-list>

      </div>
    </div>
    <TabBar />
  </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount, defineOptions } from 'vue'
import {skipAIA} from "@/util/getRegion.js"
import NavBar from './NavBar.vue';
import TabBar from './TabBar.vue';
import {getCommentList} from "@/api/index.js"
import CommentItem from './CommentItem.vue';
defineOptions({ name: "LnformationDetail" })
const InfoDetail = reactive({})
const Option=reactive({
  collectNewId:'',
  pageNo:1,
  pageSize:10,
})

onBeforeMount(async () => {
  const data = JSON.parse(sessionStorage.getItem('InfoDetail'))
  Object.assign(InfoDetail, data)
  Option.collectNewId=InfoDetail.id
})


const list=ref([])
const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
    loading.value=true
    let {resultSet}=await getCommentList(Option)
    list.value.push(...resultSet.data)
    loading.value = false;
    if (list.value.length >= resultSet.total) finished.value = true;
    Option.pageNo++
};


const getImageUrls = (pictureUrl) => {
  return pictureUrl.split(',').map((url) => 'https://static.44dog.cc/' + url.trim());
};
</script>
<style scoped lang="scss">
.detail {
  height: 100%;

  .content {
    height: calc(100% - 106px);
    padding: 10px;
    overflow: auto;
    scrollbar-width: none;

    .main {
      padding: 10px;
      border-radius: 6px;
      background-color: $themebgColor;

      .top {
        height: 50px;
        display: flex;
        gap: 10px;
        color: #fff;

        .avatar {
          width: 50px;
          aspect-ratio: 1/1;
        }

        .right {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-size: 14px;
        }
      }

      .title {
        color: #fff;
        padding: 10px 0;
        font-size: 12px;
      }

      .imgs {
        padding: 10px 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;

        img {
          border-radius: 6px;
          width: 100%;
        }
      }

      .bottom {
        padding: 10px 0;
        gap: 60px;
        color: #fff;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>