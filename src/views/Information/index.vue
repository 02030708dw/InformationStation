<template>
        <div class="information" ref="scrollRef">
            <AuthorTab :list="author.authorList" v-model="author.activeAuthor" v-if="author.authorList.length"></AuthorTab>
            <van-loading v-else></van-loading>
            <van-list v-model:loading="loading" :finished="finished" @load="onLoad" :finished-text="$t('没有更多')" :loading-text="$t('加载中')" v-if="show">
                <InfoItem v-for="item in list" :data="item"></InfoItem>
            </van-list>
        </div>
</template>
<script setup>
import { ref,reactive,computed,watch,onBeforeMount,defineOptions,onActivated,onDeactivated  } from 'vue';
import {onBeforeRouteLeave} from 'vue-router'
import {getGameGodList,getGameGodArticle} from "@/api/index.js"
import AuthorTab from './AuthorTab.vue';
import InfoItem from './InfoItem.vue';
defineOptions({name:"Information"})
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

    loading.value=true
    let {resultSet}=await getGameGodArticle(option)
    list.value.push(...resultSet.data)
    loading.value = false;

    if (list.value.length >= resultSet.total) finished.value = true;
};
watch(()=>option.accountId,(newvalue)=>{
    option.pageNo=1
    list.value=[]
    finished.value = false
    onLoad()
})

onBeforeMount(async ()=>{
    let res1=await getGameGodList()//大神列表
    Object.assign(author.authorList,res1.resultSet)
    author.activeAuthor=author.authorList[0].id

    show.value=true
})

//保存滚动位置
const scrollRef = ref(null)
const scrollTop = ref(0)
onActivated(()=>{
    scrollRef.value.scrollTop = scrollTop.value;
})
onBeforeRouteLeave((to,from,next)=>{
  scrollTop.value = scrollRef.value.scrollTop;
  next()
})


</script>
<style scoped lang="scss">
.information{
    scrollbar-width: none;
    height:calc(100% - 44px);
    overflow: auto;
    .van-list{
        padding:10px 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .van-loading{
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>