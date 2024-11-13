<template>
    <span class="countdown">{{ countDownTime }}</span>
</template>
<script setup>
import { ref, watch,onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n';
const {t}=useI18n()
const props=defineProps(['awardNum'])
const countDownTime = ref('00:00:00')//显示的倒计时
const countTime = ref('')//后端开奖秒数
let intervalB

const startCountDown = () => {
    clearInterval(intervalB)
    countTime.value = props.awardNum.countdown
    intervalB = setInterval(() => {

        if (countTime.value <= 0) {
            countDownTime.value = t('开奖')
        } else {
            countTime.value--
            countDownTime.value = formatTime(countTime.value)
        }

    }, 1000)
}
watch(() => props.awardNum, () => {
    startCountDown()
}, { immediate: true })

onUnmounted(() => {
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