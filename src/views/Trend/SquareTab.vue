<template>
    <ul class='circle-tab' ref="ul">
        <li class="tab-item" v-for="item in list.filter(i=>i.gamePlayTypeName!='physical')" :class="{ active: item[bindField] == active }" @click="changeSquareTab(item)">
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
const changeSquareTab=(item)=>{
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
    -ms-overflow-style: none;

    .tab-item {
        white-space: nowrap;
        margin: 0 5px 0 0;
        height: 30px;
        // background-color: #e8efff;
        border-radius: 5px;
        padding: 0 15px;
        display: flex;
        align-items: center;
        // color: #000;
        border:1px solid #c4a974;
        color: #c4a974;

        .text {
            font-size: 14px;
            line-height: 50px;
        }
    }

    .active {
        // background-color: #FF9500;
        // color: #fff;
        border: none;
        background-image: linear-gradient(to bottom, #df2741, #8a012d);
        color: #fff;
    }

}

.circle-tab::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
}
</style>