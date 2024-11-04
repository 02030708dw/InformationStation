<template>
    <ul class="author">
        <li :class="{'author-item':true,active:active==item.id}" v-for="item in list" @click="active=item.id">{{ item.account }}</li>
    </ul>
</template>
<script setup>
const props=defineProps(['list'])
const active=defineModel('modelValue')
</script>
<style scoped lang="scss">
.author {
    width: 100%;
    position: sticky;
    top:0;
    z-index: 10;
    background-color: $themebgColor;
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-x: auto;
    height: 40px;
    padding: 0 10px;
    .author-item {
        font-size: 12px;
        flex-shrink: 0;
        height: 26px;
        line-height: 26px;
        border-radius: 26px;
        padding: 0 16px;
        background-color: #e8efff;
    }

    .active {
        color: #fff;
        background-color: #FF9500;
    }
}
</style>