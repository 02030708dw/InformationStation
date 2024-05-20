<template>
    <!-- 导航栏 -->
    <div class="Navbar_box">
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
        width: 100%;
        height: 50px;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        border: 1px solid #000;
        background-color: #fff;
    }
</style>