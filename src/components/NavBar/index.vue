<template>
    <!-- 导航栏 -->
    <div class="Navbar_box" :style="{'background': NavBarType === 0 ? NavBarColor:`url(${NavBarBackground})`}">
        <!-- logo -->
        <slot name="NavBarLogo"></slot>
    </div>
</template>
<script setup>
defineProps({
    // 导航栏背景类型 0颜色 1图片
    NavBarType:{
        type:Number,
        default:0
    },
    // 导航栏背景 图片/颜色
    NavBarColor:{
        type:String,
        default:'#111111'
    },
    // 导航栏背景图片
    NavBarBackground:{
        type:String,
        default:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
})
</script>
<style lang="scss" scoped>
    .Navbar_box{
        z-index: 9999;
        width: 100vw;
        height: 50px;
        position: fixed;
        top: 0px;
        left: 0px;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
    }
</style>