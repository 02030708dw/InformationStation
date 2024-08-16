<template>
    <ul class="menu">
        <li v-for="item in page" :class="{'menu-item':true,active:item.name==$route.name}" @click="$router.push({name:item.name})">{{ item.label }}</li>
    </ul>
</template>
<script setup>
const page=[
    {label:"Home",name:'Home'},
    {label:'Infomation',name:'Infomation'},
    {label:'Trend',name:'Trend'},
    {label:'Draw',name:'Draw'}
]
</script>
<style scoped lang="scss">
.menu{
    height: 44px;
    background-color: #0256ff;
    display: flex;
    align-items: center;
    font-size: 14px;
    gap: 20px;
    padding: 0 16px;
    position: sticky;
    top: 0;
    .menu-item{
        line-height: 44px;
        color: #ffffff80;
    }
    .active{
        position: relative;
        color: #fff;
        &::after{
            content: "";
            width: 22px;
            height: 4px;
            background-color: #fff;
            position: absolute;
            left: calc(50% - 11px);
            bottom:6px;
            border-radius: 10px;
        }
    }
}
</style>