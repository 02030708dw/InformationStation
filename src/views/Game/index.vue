<template>
    <div class="game">
        <div class="background"></div>
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
                                    <img  :src="'https://static.44dog.cc/'+item.pictureUrl">
                                    <div class="btn">play</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card blurred">🔥เเตกง่ายขึ้น 98%🔥</div>

                    <div class="swiper">
                        <div class="swiperWipper">
                            <div v-for="item in image" :style="{ backgroundImage: `url('${url(item)}')` }"></div>
                        </div>
                        <div class="pre">&lt;</div>
                        <div class="next">&gt;</div>
                        <div class="lis"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { onMounted,onBeforeMount,onUnmounted } from 'vue';
import {useUserState} from "@/stores/modules/userinfo.js"
import { useRouter } from 'vue-router';
const router=useRouter()
const storeUser=useUserState()
const image = ['1001.png', '1002.png', '1003.png', '1004.png', '1005.png', '1001.png']
const url = (name) => new URL(`../../assets/image/transit/${name}`, import.meta.url).href
onMounted(() => {
    const script = document.createElement('script');
    script.src = new URL(`./index.js`, import.meta.url).href
    document.head.appendChild(script);
})
onBeforeMount(()=>{
    if(!storeUser.memberId)router.replace({name:'Home'})
})
onUnmounted(()=>{
    if(window.timerSwiper) window.clearInterval(timerSwiper)
})
</script>
<style scoped lang="scss">
@import url("./index.css");
@import url("./swiper.css");
.game{
    height: calc(100% - 44px);
    overflow: auto;
}
</style>