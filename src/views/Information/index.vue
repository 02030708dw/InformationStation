<template>
    <div class="Information_box">
        <div class="item_box" v-for="(item, index) in ListData" :key="index" @click="HandelInformationinfo(item)">
            <!-- 资讯选项 -->
            <div class="Information_item_box">
                <div class="Information_Text">
                    {{ item.content.title }}
                </div>
                <!-- 图片 -->
                <div class="Information_image">
                    <img :src="item.content.cover" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// 接口
import { InformationData } from '../../api/information'
import { ref,onMounted,onUnmounted } from 'vue';
// pinia
import useInformationinfo from '../../stores/modules/Informationinfo'
const Informationinfo = useInformationinfo()
// vue-route
import { useRouter } from 'vue-router'
const router = useRouter()
// 列表数据
var ListData = ref([])


// 请求资讯数据
const GetInformationData = async () => {
    await InformationData({pageNo:1,pageSize:100}).then(res => {
        ListData.value = res.data.resultSet.data
        
    }).catch(err => {
        console.log(err)
    })
}

// 跳转到资讯详情
const HandelInformationinfo = (item) => {
    // 跳转页面
    router.push('/Informationinfo')
    // 存储资讯详情数据
    Informationinfo.UpdataInformationinfo(item)
}


onMounted(()=>{
    GetInformationData()
})

// 触底加载
const a = window
onMounted(() => {
    window.addEventListener('scroll', doScroll, true)
})
onUnmounted(() => {
    window.removeEventListener("scroll", doScroll)
})
const doScroll = (event) => {
    
    // 下滑更多数据
    
}

</script>
<style lang="scss" scoped>
.Information_box {
    padding-top: 10px;
    width: 100vw;

    .item_box {
        width: 100vw;

        .Information_item_box {
            height: 80px;
            width: 100vw;
            text-align: left;
            display: flex;
            justify-content: space-between;

            .Information_Text {
                margin-left: 10px;
                word-wrap: break-word;
                word-break: break-all;
                width: 260px;

                margin-right: 10px;
                font-size: 14px;
                height: 70px;
            }

            .Information_image {
                margin-right: 10px;
                width: 100px;
                height: 70px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        // 广告
        .advertisement_box {
            line-height: 90px;
            width: 100vw;
            height: 90px;
            background: #f2f2f2;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}</style>