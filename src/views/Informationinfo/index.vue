<template>
    <!-- 资讯详情 -->
    <div class="container">
        <van-nav-bar left-arrow @click-left="onClickLeft">
            <template #left>
                <van-icon name="arrow-left" size="18" color="#fff" />
            </template>
            <template #title>
                <span style="color: #fff;">雷速体育</span>
            </template>
        </van-nav-bar>
        <!-- 内容 -->
        <div class="conent_box">
            <!-- 标题 -->
            <div class="title_box">
                {{ Informationinfo.Informationinfo.content.title }}
            </div>
            <!-- 时间 -->
            <div class="time_box">
                雷速体育:{{ Informationinfo.Informationinfo.createdAt }}
            </div>
            <!-- 图片 -->
            <div class="image_box" v-if="Informationinfo.Informationinfo.content.desc_imgs" v-for="(item, index) in Informationinfo.Informationinfo.content.desc_imgs" :key="index">
                <van-image   fit="cover"  :src="item" />
            </div>
            <!-- 内容 -->
            <div class="text_box">
                {{ Informationinfo.Informationinfo.content.desc }}
            </div>
        </div>
    </div>
</template>
<script setup>
// pinia
import useInformationinfo from '../../stores/modules/Informationinfo'
const Informationinfo = useInformationinfo()
// vue-route
import { useRouter } from 'vue-router';
const router = useRouter()




// 返回上一页
const onClickLeft = () => {
    router.back()
}

</script>
<style lang="scss" scoped>
.container {
    width: 100vw;
    min-height: 100vh;
    background-color: #111;

    ::v-deep(.van-nav-bar__content) {
        background-color: #111111;
    }

    .conent_box {
        margin: 0 auto;
        margin-top: 10px;
        width: 98%;
        color: #fff;

        .title_box {
            width: 100%;
            word-wrap: break-word;
            word-break: break-all;
            font-size: 16px;
            text-align: left;
            line-height: 18px;
        }

        .time_box {
            margin-top: 10px;
            font-size: 12px;
            width: 100%;
            text-align: left;
            color: #555454;
        }

        .image_box {
            margin-top: 5px;
            width: 100%;           
        }
        .text_box{
            width: 100%;
            word-wrap: break-word;
            word-break: break-all;
            font-size: 16px;
            text-align: left;
            line-height: 16px;
        }
    }

}
</style>