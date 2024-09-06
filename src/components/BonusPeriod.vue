<template>
    <p class="period">
        <span class="date">{{ awardNum.lastAwardPeriod }}</span>
        <span class="countdown">{{ countDownTime }}</span>
    </p>
</template>
<script setup>
import { ref, watch , onUnmounted} from 'vue';
const props = defineProps(['awardNum'])



const countDownTime = ref('00:00:00')//显示的倒计时
const countTime = ref('')//后端开奖秒数
let intervalB

const startCountDown = () => {
    clearInterval(intervalB)
    countTime.value = props.awardNum.countdown
    intervalB =setInterval(() => {

        if (countTime.value <= 0) {
            countDownTime.value = '开奖'
        } else {
            countTime.value--
            countDownTime.value = formatTime(countTime.value)
        }

    }, 1000)
}

watch(()=>props.awardNum,()=>{
   startCountDown()
},{immediate:true})

onUnmounted(()=> {
    clearInterval(intervalB)
})


function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
</script>
<style lang="scss" scoped>
.period {
    white-space: nowrap;
    height: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 24px;
    padding: 0 5px;
    background-color: #e6e5d9;
    font-size: 11px;

    .date {
        color: #bc6f16;
    }

    .countdown {
        color: #f7931e;
    }
}
</style>