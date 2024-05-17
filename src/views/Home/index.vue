<template>
  <div class="home">
    <NavBar />
    <TabBar :list="TabBarList" />
      <router-view v-slot="{ Component }">
        <keep-alive :max="2">
          <component :is="Component" />
        </keep-alive>
      </router-view>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from "@/components/NavBar/index.vue";
import TabBar from "@/views/Home/TabBar.vue"
import Loading from "@/components/Loading/index.vue"
import { storeToRefs } from 'pinia';
import { getUserInfo } from '@/api/request.js'
import { useUserInfo } from '@/stores/modules/userinfo.js'
import {loadingStore} from "@/stores/modules/loadingStore.js"
const {loadingState} =storeToRefs(loadingStore())
const { setUserInfo } = useUserInfo()
const route = useRoute()
const TabBarList = reactive([
  { label: '赛事', name: 'Match' },
  { label: '开奖', name: 'Draw' },
  { label: '体育', name: 'Sports' },
  { label: '分析', name: 'Analysis' },
])
onMounted(async () => {
  const id = route.params.id
  let res = await getUserInfo(id)
  setUserInfo(res.resultSet)
  loadingState.value=true
})

</script>
<style lang="scss" scoped>
.home {
  padding-top: 50px;
  background-color: #000;
  min-height: 100%;
}
</style>
