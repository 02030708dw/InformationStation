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
    display: flex;
    align-items: center;
    gap: 10px;
    overflow-x: auto;
    padding: 16px;
    .author-item {
        flex-shrink: 0;
        height: 30px;
        line-height: 30px;
        border-radius: 30px;
        padding: 0 10px;
        background-color: #e8efff;
    }

    .active {
        color: #fff;
        background-color: #0256ff;
    }
}
</style>