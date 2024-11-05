<template>
    <div class="game">
        <div class="content">
            <div class="wrapper">
                <div class="info">
                    <img class="logo" src="@/assets/image/transit/logo.png" alt="" />
                    <div class="cover cover_img_1"></div>
                    <div class="username card">*🟢ผู้ใช้ออนไลน์ 3,872,522 คน*</div>
                    <div class="description card">
                        <p>⭐ ฝาก ถอน ระบบ AUTO 100%</p>
                        <p>⭐ รองรับทุกธนาคาร และ ทรูวอเล็ต</p>
                        <p>⭐ รับประกัน : ไม่มีประวัติเสีย 100%</p>
                        <p>✅ไม่มีบัญชีไทย ใช้วอลเล็ทฝากได้✅</p>
                    </div>
                    <div class="card link animation_pop">
                        <a class="register" target="_blank">
                            <div class="img"></div>
                            <div class="name">สมัครผ่านเว็บโดยตรง</div>
                        </a>
                    </div>
                    <div class="card blurred">
                        <div class="grid-haed">
                            <span class="free">เกมฟรีรับ 10,000 !!👇</span>
                            <img src="@/assets/image/transit/free.gif" alt="" />
                        </div>
                        <div class="grid">
                            <div class="grid-item" v-for="item in storeUser.freeGameList">
                                <a :href="item.shareUrl" target="_blank">
                                    <img :src="'https://static.44dog.cc/' + item.pictureUrl">
                                    <div class="btn">play</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card blurred">🔥เเตกง่ายขึ้น 98%🔥</div>

                    <div class="swiper">

                        <transition v-for="(item, index) in image" :name="name">
                            <img v-show="index == count" :src="url(item)" />
                        </transition>

                        <div class="pre" @click="count == 0 ? count = image.length - 1 : count--, name = 'left'">&lt;</div>
                        <div class="next" @click="count == image.length - 1 ? count = 0 : count++, name = 'right'">&gt;</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, onUnmounted } from 'vue';
import { useUserState } from "@/stores/modules/userinfo.js"
import { useRouter } from 'vue-router';
const router = useRouter()
const storeUser = useUserState()
const image = ['1001.png', '1002.png', '1003.png', '1004.png', '1005.png']
const url = (name) => new URL(`../../assets/image/transit/${name}`, import.meta.url).href
const count = ref(0);
const name = ref('')
let timer
const swiperAuto=()=>{
    name.value='right'
    count.value++
    if(count.value==image.length) count.value=0
}
onBeforeMount(() => {
    // 可优化为路由守卫
    if (!storeUser.memberId) router.replace({ name: 'Home' })
})
onMounted(()=>{
    timer=setInterval(swiperAuto,3000)
})
onUnmounted(()=>{
    clearInterval(timer)
})
</script>
<style scoped lang="scss">
@import url("./index.css");
@import url("./swiper.css");

.game {
    height: calc(100% - 44px);
    overflow: auto;
    position: relative;
    scrollbar-width: none;
    background-image: url('@/assets/image/transit/banner.png');
    z-index: 1;
    transform: translateZ(0);
    will-change: transform;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.right-enter-from,
.left-leave-to {
    transform: translateX(335px);
}

.left-enter-from,
.right-leave-to {
    transform: translateX(-335px);
}

.left-enter-active,
.left-leave-active,
.right-enter-active,
.right-leave-active {
    transition: all 0.3s;
}
</style>