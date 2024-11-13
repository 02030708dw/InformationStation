<template>
    <li class="draw-short">

        <p class="top">
            <span>{{ $t(item.gameCode) }}</span>
            <span>{{ item.lastAwardPeriod }}</span>
        </p>

        <p class="bottom">
            <CountDown :awardNum="item" />
            <span class="globe" v-if="item.num">
                <span v-for="i in item.num.replaceAll(',', '')">{{ i }}</span>
            </span>

            <span class="globe" v-else-if="item.area == 'vnd'">
                <span v-for="i in item['0']">{{ i }}</span>
            </span>

            <span class="globe" v-else-if="item.area=='th'">
                <span v-for="i in item['head']">{{ i }}</span>
            </span>
        </p>
        
    </li>
</template>
<script setup>
import CountDown from "@/components/CountDown.vue"
const props = defineProps(['item'])
</script>
<style scoped lang="scss">
.draw-short {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    height: 70px;
    border-bottom: 1px solid #717171;

    p {
        align-items: center;
        display: flex;
        justify-content: space-between;
        flex: 1;

        .globe {
            display: flex;
            gap: 4px;

            span {
                font-size: 14px;
                background: linear-gradient(to bottom, #4b4b4b, #626262);
                border-radius: 24px;
                line-height: 24px;
                text-align: center;
                width: 24px;
                height: 24px;
            }
        }
    }
}
</style>