<template>
    <div class="home" ref="scrollRef">
        <FreePlay v-if="!userState.memberId"></FreePlay>
        <Tirbo></Tirbo>
        <Trend></Trend>
        <InforMation></InforMation>
        <Saham></Saham>
    </div>
</template>
<script setup>
import { ref ,onActivated} from "vue";
import {onBeforeRouteLeave} from 'vue-router'
import {useUserStore} from "@/stores/modules/userinfo.js"
import FreePlay from "./components/FreePlay.vue"
import Tirbo from './components/Tirbo.vue';
import Trend from './components/Trend.vue';
import InforMation from './components/InforMation.vue';
import Saham from './components/Saham.vue';
const userState=useUserStore()
defineOptions({name:'Home'})
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
.home{
    height: calc(100% - 44px);
    overflow: auto;
    padding:0 16px 10px;
    display: flex;
    flex-direction:column;
    gap: 20px;
    scrollbar-width: none;
}
</style>