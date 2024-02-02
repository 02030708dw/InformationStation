<template>
    <div class="container">
        <van-nav-bar left-arrow @click-left="onClickLeft" :fixed="true">
            <template #left>
                <van-icon name="arrow-left" size="18" color="#fff" />
            </template>
            <template #title>
                <span style="color: #fff;">赛事分析详情</span>
            </template>
        </van-nav-bar>
        <div class="conent_box">
            <div class="image_box">
                <img :src="AnalysisInfoS.AnalysisInfo.content.conv_img" alt="">
            </div>
            <div class="Info_box">
                <div class="text_box">
                    <span>创建人:</span>
                    {{AnalysisInfoS.AnalysisInfo.creator}}
                </div>
                <div class="text_box" style=" margin-left: 10px;">
                    <span>地区:</span>
                    {{AnalysisInfoS.AnalysisInfo.country}}
                </div>
            </div>
            <div class="Info_box">
                <div class="text_box">
                    <span>创建时间:</span>
                    {{AnalysisInfoS.AnalysisInfo.createdAt}}
                </div>
                <div class="text_box" style=" margin-left: 10px;">
                    <span>更新时间:</span>
                    {{AnalysisInfoS.AnalysisInfo.updatedAt}}
                </div>
            </div>
            <div class="Text_box" v-for="(item, index) in AnalysisInfoS.AnalysisInfo.content.details" :key="index">
                <div class="title_box">{{ item.title }}</div>
                <div class="text_conent_box">{{ item.desc }}</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import useAnalysisInfo from "../../stores/modules/AnalysisInfo";
const AnalysisInfoS = useAnalysisInfo();
// 返回上一页
const onClickLeft = () => {
    router.back()
}

</script>
<style lang="scss" scoped>
    .container{
        padding-top: 50px;
        padding-bottom: 10px;
        width: 100vw;
        min-height: 100vh;
        background-color: #ffffff;
        ::v-deep(.van-nav-bar__content) {
            background-color: #111111;
        }
        .conent_box{
            width: 100vw;
            display: flex;
            align-items: center;
            flex-direction: column;
            .image_box{
                width: 98%;
                height: 180px;
                
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .Info_box{
                
                margin-top: 8px;
                width: 98%;
                display: flex;
                align-items: center;
                .text_box{
                   
                    font-size: 12px;
                }
            }
            .Text_box{
                margin-top: 5px;
                width: 98%;
                .title_box{
                    text-align: left;
                    font-size: 15px;
                    font-weight: 500;
                }
                .text_conent_box{
                    margin-top: 10px;
                    text-align: left;
                    font-size: 10px;
                }
            }
        }
    }
    
</style>