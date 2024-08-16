<template>
    <div class="information">
        <AuthorTab :list="author.authorList" v-model="author.activeAuthor" v-if="author.authorList.length"></AuthorTab>
        <van-loading v-else></van-loading>
        <van-list v-model:loading="loading" :finished="finished" @load="onLoad" finished-text="没有更多" v-if="show">
            <InfoItem v-for="item in list" :data="item"></InfoItem>
        </van-list>
    </div>
</template>
<script setup>
import { ref,reactive,computed,watch,onBeforeMount } from 'vue';
import {getGameGodList,getGameGodArticle} from "@/api/index.js"

import AuthorTab from './AuthorTab.vue';
import InfoItem from './InfoItem.vue';
const show=ref(false)
const author=reactive({
    activeAuthor:'',
    authorList:[]
})
const option=reactive({
    pageNo:1,
    pageSize:20,
    accountId:computed(()=>author.activeAuthor),
})
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
    let {resultSet}=await getGameGodArticle(option)
    list.value.push(...resultSet.data)
    loading.value = false;

    if (list.value.length >= resultSet.total) finished.value = true;
};
watch(()=>option.accountId,(newvalue)=>{
    option.pageNo=1
    list.value=[]
    finished.value=false
})
onBeforeMount(async ()=>{
    let res1=await getGameGodList()//大神列表
    Object.assign(author.authorList,res1.resultSet)
    author.activeAuthor=author.authorList[0].id

    show.value=true
})
</script>
<style scoped lang="scss">
.information{
    min-height: 100%;
    .van-list{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .van-loading{
        display: flex;
        justify-content: center;
    }
}
</style>