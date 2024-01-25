<template>
    <div class="container">
        <NavBar>
            <template #NavBarLogo>
                <div class="logo_box">Logo</div>
              </template>
        </NavBar>
        <!-- 动画 -->
        <div class="viod_box">
            <iframe
            :src="GameInfoUrl"
            width="100%"
            height="500px"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <!-- 内容 -->
        <div class="conent_box"></div>
    </div>
</template>
<script setup>
// 导航栏
import NavBar from '../../components/NavBar/index.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
// console.log(router.currentRoute.value.params);
import { onMounted,ref } from 'vue';
// 接口
import { GameDataInfo } from '../../api/Game'
// 赛事详情
const GameInfoUrl = ref()

// 获取赛事详情
const GetGameDataInfo = () => {
    GameDataInfo({id:router.currentRoute.value.params.id}).then(res => {
        GameInfoUrl.value = res.data.resultSet.content.cartoonUrl
    }).catch(err => {
        console.log(err)
    })
}
onMounted(()=>{
    GetGameDataInfo()
})

</script>
<style lang="scss" scoped>
    .container{
        width: 100vw;
        min-height: 100vh;
        .logo_box{
            color: #ffffff;
            margin-left: 10px;
            font-size: 12px;
        }
        .viod_box{
            width: 100vw;
            height: 500;
            background-color: #1f1f1f;
        }
        .conent_box{
            width: 100vw;
        }
    }
</style>