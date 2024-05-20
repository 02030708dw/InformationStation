<template>
    <ul class="game-god-tab">
        <li 
        v-for="item in list" class="item" 
        :class="{active:item.id==active}"
        @click="active=item.id"
        >{{ item.account }}</li>
    </ul>
</template>
<script setup>
const props = defineProps({
    list: { type: Array }
})
const active=defineModel('modelValue')
</script>
<style lang="scss" scoped>
.game-god-tab {
    width: 100%;
    display: flex;
    background-color: #fff;
    position: sticky;
    top: 0;
    height: 30px;
    .item{
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        text-wrap: nowrap;
        flex: 1;
        border-radius: 4px;
        background-color: #fff;
        border: 1px solid #000;
    }
    .active{
        color: aliceblue;
        background-color: cornflowerblue;
    } 
}
</style>