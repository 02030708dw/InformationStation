<template>
  <div class="match">
    <GameGodTab :list="GodList" v-if="GodList.length" v-model="activeGod" />
    <van-list v-if="GodArticleList.data?.length" class="card-content" v-model:loading="loading" :finished="finished"
      finished-text="没有更多了" @load="onLoad">
      <GodCard :data="item" v-for="item in GodArticleList.data" @change-title="changeTitle"/>
    </van-list>
    <van-loading size="44" v-else/>
    <Advertising />
  </div>
</template>
<script setup>
import { ref, onMounted, watch,reactive } from 'vue'
import { getGameGodList, getGameGodArticle } from '@/api/request.js'
import GameGodTab from './GameGodTab.vue'
import GodCard from './GodCard.vue'
import Advertising from './Advertising.vue'
import {useRouter} from 'vue-router'

const router=useRouter()
const GodList = ref([])//大神列表数据
const activeGod = ref('')//当前选中的大神
const GodArticleList = ref([])//当前选中的大神文章
const Option=reactive({
  pageSize:10,
  pageNo:1
})
const loading = ref(false);
const finished = ref(false);
const onLoad =async () => {
    Option.pageNo++
    let {resultSet}=await getGameGodArticle({
        ...Option,accountId: activeGod.value,
    })
    GodArticleList.value.data.push(...resultSet.data)
    loading.value = false;
    if (GodArticleList.value.data.length >= resultSet.total) {
        finished.value = true;
    }
}

const changeTitle=(value)=>{
  sessionStorage.setItem('MatchDetail',JSON.stringify(value))
  router.push({name:'MatchDetail'})
}
watch(activeGod,async () => {
  Option.pageNo=1
  GodArticleList.value = []
  let res=await getGameGodArticle({
    accountId: activeGod.value,
    pageNo: 1,
    pageSize: 10
  })
  GodArticleList.value = res.resultSet
})
onMounted(async () => {
  let res = await getGameGodList()
  console.log(res.resultSet)
  GodList.value = res.resultSet
  activeGod.value = GodList.value[0].id//默认选中第一个
})
</script>
<style lang="scss" scoped>
.match {
  .card-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}
</style>