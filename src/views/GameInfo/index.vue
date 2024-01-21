<template>
    <div class="container">
        <NavBar>
            <template #NavBarLogo>
                <div class="logo_box">Logo</div>
              </template>
        </NavBar>
        <!-- 动画 -->
        <div class="viod_box"></div>
        <!-- 内容 -->
        <div class="conent_box"></div>
    </div>
</template>
<script setup>
// 导航栏
import NavBar from '../../components/NavBar/index.vue';
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
            height: 280px;
            background-color: #1f1f1f;
        }
        .conent_box{
            width: 100vw;
        }
    }
</style>