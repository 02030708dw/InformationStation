<template>
    <ul class="tab">
        <li :class="{item:1,active:item==active}" @click="active=item" v-for="item in list">{{ item }}</li>
    </ul>
</template>
<script setup>

const props=defineProps(['list'])
const active=defineModel('modelValue')
</script>
<style scoped lang="scss">
.tab{
    font-size: 13px;
    display: flex;
    height: 30px;
    .item{
        text-align: center;
        flex: 1;
        line-height: 30px;
        color: #1989fa;
        background-color: #fff;
        border: 1px solid #1989fa;
        transition: all linear 0.2s;
    }
    .active{
        color: #fff;
        background-color: #1989fa;
    }
}
</style>