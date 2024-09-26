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
    gap:5px;
    .item{
        text-align: center;
        flex: 1;
        line-height: 30px;
        // color: #FF9500;
        // background-color: #fff;
        // border: 1px solid #FF9500;
        border-radius: 4px;
        color: #c4a974;
        border: 1px solid #c4a974;
        transition: all linear 0.2s;
    }
    .active{
        color: #fff;
        border: none;
        background-image: linear-gradient(to bottom, #df2741, #8a012d);
        // background-color: #FF9500;
    }
}
</style>