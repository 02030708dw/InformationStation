<template>
    <ul class='circle-tab' ref="ul">

        <li class="tab-item" v-for="item in list" :class="{ active: item[bindField] == active }" @click="changeCircleTab(item)">
            <img src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msB1Q.img" class="img" v-if="item.img">
            <span class="text">{{ item[viewField] }}</span>
        </li>
    </ul>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const ul = ref(null)
const props = defineProps({
    list: Array,
    bindField:String,
    viewField:String,
})
const emits=defineEmits(['change'])
const active = defineModel('modelValue')
const changeCircleTab=(item)=>{
    active.value=item[props.bindField]
    emits('change')
}
const cleanupEvents = [];

const initEvent = (element) => {
    let canDraw = false;
    let saveX;

    const onMouseDown = (e) => {
        saveX = e.pageX;  // 保存初始的X坐标
        canDraw = true;   // 设置标志，表示可以拖动
    };

    const onMouseMove = (e) => {
        if (canDraw) {
            const deltaX = e.pageX - saveX;  // 计算移动的距离
            saveX = e.pageX;  // 更新saveX到当前位置
            element.scrollLeft -= deltaX;
        }
    };

    const onMouseUp = () => canDraw = false;

    element.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    cleanupEvents.push(() => {
        element.removeEventListener('mousedown', onMouseDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    });
};
onMounted(() => initEvent(ul.value))
</script>
<style lang="scss" scoped>
.circle-tab {
    height: 40px;
    display: flex;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE 10+ */

    .tab-item {
        white-space: nowrap;
        margin: 0 5px 0 0;
        height: 30px;
        background-color: #e8efff;
        border-radius: 5px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        color: #000;
        .img {
            border-radius: 25px;
            width: 25px;
            height: 25px;
            margin-right: 10px;
        }

        .text {
            font-size: 14px;
            line-height: 30px;
        }
    }

    .active {
        background-color: #FF9500;
        color: #fff;
    }

}

.circle-tab::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>