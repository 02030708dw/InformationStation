<template>
    <div class="header">
        <van-icon name="arrow-left" size="24" color="#fff" @click="$router.back()" />
        <span>详情</span>
    </div>
</template>
<style scoped lang="scss">
.header {
    position: relative;
    display: flex;
    align-items: center;
    height: 46px;
    background-color: $themebgColor;
    justify-content: center;
    position: sticky;
    color: #fff;
    top: 0;

    .van-icon {
        cursor: pointer;
        padding-left: 16px;
        position: absolute;
        left: 0;
    }
}
</style>