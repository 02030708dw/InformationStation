<template>
    <div class="infor-mation">
        <Title text="InforMation" @changeMore="$router.push({ name: 'Information' })" />
        <ul class="info-list">

            <template v-if="List.length">
                <li v-for="(item, index) in List" class="info-item">
                    <div class="left">
                        <p class="time">{{ item.updatedAt }}</p>
                        <p class="text">{{ item.title }}</p>
                    </div>

                    <div class="right" v-if="item.pictureUrl">
                        <img class="img" :src="getImageUrls(item.pictureUrl)[0]">
                    </div>
                </li>
            </template>


            <template v-for="item in 2" v-else>
                <van-skeleton title avatar :row="1" />
            </template>
        </ul>
    </div>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { getGameGodList, getGameGodArticle } from "@/api/index.js"
import Title from "./Title.vue"
const List = reactive([])





onBeforeMount(async () => {
    let res1 = await getGameGodList()
    let res2 = await getGameGodArticle({
        pageNo: 1,
        pageSize: 20,
        accountId: res1.resultSet[0].id,
    })
    Object.assign(List, res2.resultSet.data.slice(0, 2))
})




const getImageUrls =(pictureUrl)=> {
  return pictureUrl.split(',').map(url => 'https://static.44dog.cc/' + url.trim());
}
</script>
<style scoped lang="scss">
.infor-mation {
    background-color: $themebgColor;
    color:#fff;
    border-radius: 7px;
    .info-list {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .info-item {
            height: 60px;
            border-radius: 16px;
            display: flex;

            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                .time{
                    font-size: 12px;
                    color: #838383;
                }
                .text {
                    font-size: 14px;
                    overflow: hidden;
                    word-wrap: break-word;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    line-clamp: 2;
                    -webkit-line-clamp: 2;
                }
            }

            .right {
                width: 70px;
                height: 60px;

                .img {
                    border-radius: 8px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

        }
    }
}
</style>