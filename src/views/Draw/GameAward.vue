<template>
    <div class="GameAward">
        <p class="text name">{{ awardNum.gameCode }}</p>
        <div class="lotter-award">
            <p class="text award">{{ awardNum.lastAwardPeriod }}</p>
            <p class="text time">{{ countDownTime }}</p>
        </div>
        <button class="btn">去投注</button>
    </div>
</template>
<script setup>
import {ref,computed,watch} from 'vue'
const props=defineProps(['awardNum','timeRemaining'])
const emits=defineEmits(['timeOut'])
const countDownTime = ref('00:00')//显示的倒计时
const countTime = ref('')//后端开奖秒数
const localTime = ref('')//本地剩余秒数
let interval//计时器

watch(computed(() => props.awardNum), (newvalue) => {
    clearInterval(interval)
    localTime.value = props.timeRemaining
    countTime.value = props.awardNum.countdown
    countDownTime.value = formatTime(localTime.value)
    interval = setInterval(() => {
        localTime.value--
        countDownTime.value = formatTime(localTime.value)
        if (localTime.value <= 0 || countTime.value <= 0) {
            countDownTime.value = '开奖中'
            emits('timeOut')
        }
    }, 1000)
},{immediate:true})

function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let hDisplay = h > 0 ? (h < 10 ? "0" + h : h) + ":" : "";
    let mDisplay = m > 0 ? (m < 10 ? "0" + m : m) + ":" : "00:";
    let sDisplay = s > 0 ? (s < 10 ? "0" + s : s) : "00";
    // console.timeEnd()
    return hDisplay + mDisplay + sDisplay;
}
</script>
<style scoped lang="scss">
.GameAward {
    background-color: azure;
    border: 1px solid #ccc;
    font-size: 16px;
    height: 30px;
    position: relative;
    // padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    .text {
        z-index: 2;
        line-height: 30px;
    }

    .lotter-award {
        padding: 0 10px;
        height: 100%;
        display: flex;
        background-color: aliceblue;
        .award {
            padding-right: 5px;
            color: #222;
            background: linear-gradient(to right, black 1px, transparent 1px);
            background-size: 2px 20px;
            background-repeat: no-repeat;
            background-position: right center;
        }

        .time {
            color: #f86d03;
            font-size: 20px;
            padding-left: 5px;
        }
    }

    .btn {
        font-size: 14px;
        border: 1px solid #000;
        background-color: transparent;
        z-index: 2;
        padding: 0 8px;
        height: 100%;
        line-height: 30px;
        border-radius: 4px;
    }
}

.GameAward::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url('@/assets/award_bg.png');
    background-size: cover;
    background-position: 0 -20px;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: 1;
}
</style>