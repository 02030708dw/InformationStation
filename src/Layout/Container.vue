<template>
    <div class="layout">
        <div class="header" ref="header" >
            <slot name="header" />
        </div>
        <div class="content" :style="{height:`calc(100vh - ${paddingTop})`}">
            <slot />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const header = ref(null)
const paddingTop = ref()
let resize0bserver = null
onMounted(() => {
    resize0bserver = new ResizeObserver(() => {
        paddingTop.value = header.value.clientHeight + 'px'
    });
    resize0bserver.observe(header.value);
})
onUnmounted(() => {
    resize0bserver.disconnect()
    resize0bserver = null
})

</script>
<style scoped lang="scss">
.layout {
    height: 100vh;
    .header {
        width: 100%;
        z-index: 2;
    }
    .content{
        background-color: #000;
        overflow: scroll;
    }
}
</style>