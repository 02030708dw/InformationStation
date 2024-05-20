<template>
    <div class="advertising">
        <div class="a1">广告</div>
        <div class="a2">联系方式</div>
        <div class="a3">联系方式</div>
    </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.advertising{
    position: fixed;
    left: 0;
    top: 200px;
    width: 80px;
    background-color: #fff;
    div{
        border: 1px solid #000;
        text-align: center;
        font-size: 16px;
    }
    .a1{
        line-height: 80px;
        height: 80px;
    }
    .a2,.a3{
        line-height: 50px;
        height: 50px;
    }
}
</style>