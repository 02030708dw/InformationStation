<template>
    <ul class="tab-bar">
        <li v-for="item in list" class="tab-bar-item">
            <router-link :to="item.name">{{ item.label }}</router-link>
        </li>
    </ul>
</template>
<script setup>
const props = defineProps({
    list: { type: Array }
})
</script>
<style lang="scss">
.tab-bar {
    display: flex;
    font-size: 16px;
    .tab-bar-item {
        text-align: center;
        border: 1px solid #000;
        flex: 1;
        line-height: 50px;
    }
}
</style>