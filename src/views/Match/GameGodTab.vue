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
    font-size: 14px;
    display: flex;
    align-items: center;
    background-color: #fff;
    .item{
        text-wrap: nowrap;
        text-align: center;
        line-height: 30px;
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