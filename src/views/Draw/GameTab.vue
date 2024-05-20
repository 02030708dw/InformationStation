<template>
    <ul class="game-tab">
        <li 
        v-for="item in list" 
        class="tab-item" 
        :class="{active:active==item}"
        @click="active=item"
        >{{ item }}</li>
    </ul>
</template>
<script setup>
const props = defineProps({
    list: { type: Array }
})
const active=defineModel('modelValue')
</script>
<style lang="scss" scoped>
.game-tab {
    height: 30px;
    display: flex;
    font-size: 14px;
    .tab-item{
        border-radius: 4px;
        flex: 1;
        border: 1px solid #000;
        line-height: 30px;
        text-align: center;
    }
    .active{
        color: aliceblue;
        background-color: cornflowerblue;
    } 
}
</style>