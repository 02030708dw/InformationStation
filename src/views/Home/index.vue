<template>
    <div class="home">
  <Container>
    <template #header>
      <NavBar />
      <TabBar :list="TabBarList" />
    </template>
      <router-view v-slot="{ Component }">
        <keep-alive :max="2">
          <component :is="Component" />
        </keep-alive>
      </router-view>
  </Container>
</div>

</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Container from "@/Layout/Container.vue"
import NavBar from "@/components/NavBar/index.vue";
import TabBar from "@/views/Home/TabBar.vue"
import Loading from "@/components/Loading/index.vue"
import { getUserInfo } from '@/api/request.js'
import { useUserInfo } from '@/stores/modules/userinfo.js'
import { loadingStore } from "@/stores/modules/loadingStore.js"

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
  loadingStore().loadingState = true
})

</script>
<style lang="scss" scoped>
.home{
  min-height: 100%;
}
</style>
