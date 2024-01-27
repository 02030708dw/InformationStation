<template>
    <!-- 资讯详情 -->
    <div class="container">
        <van-nav-bar left-arrow @click-left="onClickLeft" :fixed="true">
            <template #left>
                <van-icon name="arrow-left" size="18" color="#fff" />
            </template>
            <template #title>
                <span style="color: #fff;">资讯详情</span>
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
                资讯详情:{{ Informationinfo.Informationinfo.createdAt }}
            </div>
            <div v-for="(item, index) in DescText" :key="index">
                <div class="image_box" v-if="item.type"  :key="index">
                    <van-image   fit="cover"  :src="item.msg" />
                </div>
                <p v-else class="text_box">{{ item.msg }}</p>
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
import { onMounted, reactive } from 'vue'

const DescText = reactive([])
onMounted(() => {
    let text = Informationinfo.Informationinfo.content.desc.split('.')
    DescText.push(...computionText(text, Informationinfo.Informationinfo.content.desc_imgs))
})
const computionText = (a1, a2) => {
    let result = [];
    // 如果 a2 只有一个元素，则在 a1 的四分之一处插入
    if (a2.length === 1) {
        let quarterIndex = Math.round(a1.length / 4);
        for (let i = 0; i < a1.length; i++) {
            if (i === quarterIndex) {
                result.push({ type: true, msg: a2[0] });
            }
            result.push({ type: false, msg: a1[i] });
        }
    } else {
        // 否则均匀分布 a2 元素
        let interval = Math.round((a1.length + 1) / (a2.length + 1));
        let i = 0, j = 0;
        while (i < a1.length || j < a2.length) {
            if ((result.length + 1) % interval === 0 && j < a2.length) {
                result.push({ type: true, msg: a2[j++] });
            } else if (i < a1.length) {
                result.push({ type: false, msg: a1[i++] });
            }
        }
    }
    return result;
}



// 返回上一页
const onClickLeft = () => {
    router.back()
}

</script>
<style lang="scss" scoped>
.container {
    padding-top: 50px;
    padding-bottom: 10px;
    width: 100vw;
    min-height: 100vh;
    background-color: #ffffff;

    ::v-deep(.van-nav-bar__content) {
        background-color: #111111;
    }

    .conent_box {
        margin: 0 auto;
        margin-top: 10px;
        width: 98%;
        color: #1f1f1f;

        .title_box {
            width: 100%;
            word-wrap: break-word;
            word-break: break-all;
            font-size: 18px;
            text-align: left;
            line-height: 20px;
            font-weight: 500;
        }

        .time_box {
            margin: 10px 0px;
            font-size: 14px;
            width: 100%;
            text-align: left;
            color: #555454;
        }

        .image_box {
            margin-top: 5px;
            width: 100%;
        }

        .text_box {
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