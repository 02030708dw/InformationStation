<template>
    <div class="footer">
        <p class="text" @click="change">{{ $t('去登录注册才能评论') }}</p>
    </div>
</template>
<script setup>
import {skipAIA} from "@/util/getRegion.js"
const change=()=>{
    skipAIA()
}
</script>
<style scoped lang="scss">
.footer{
    position: sticky;
    bottom: 0;
    height: 60px;
    padding: 0 10px;
    background-color: #000;
    display: flex;
    align-items: center;
    .text{
        width: 100%;
        color: #fff;
        border-radius: 36px;
        background-color: $themebgColor;
        height: 36px;
        line-height: 36px;
        text-align: center;
    }
}
</style>
<script setup >

</script>