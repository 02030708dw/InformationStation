<template>
    <div class="container">
        <!-- 导航栏 -->
        <NavBar>
            <template #NavBarLogo>
                <div class="logo_box">Logo</div>
              </template>
        </NavBar>
        <!-- tab选项卡 -->
        <Tab></Tab>
     
        <!-- 内容 赛事  体育资讯 赛事分析 -->
        <router-view></router-view>

    </div>
</template>
<script setup>
// 导航栏
import NavBar from '../../components/NavBar/index.vue';
// tab选项卡
import Tab from './Tab.vue';

</script>
<style lang="scss" scoped>
    .container{
        width: 100vw;
        min-height: 100vh;
        padding-top: 85px;
        .logo_box{
            color: #ffffff;
            margin-left: 10px;
            font-size: 12px;
        }
    }
</style>