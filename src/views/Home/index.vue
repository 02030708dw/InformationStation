<template>
    <div class="container">
        <!-- 导航栏 -->
        <NavBar>
            <template #NavBarLogo>
                <div class="logo_box">
                    <div class="logo_image_box" v-if="UserInfoStore.userinfo.logoUrl">
                        <img :src="'data:'+UserInfoStore.userinfo.logoUrl" alt="">
                    </div>
                    {{ UserInfoStore.userinfo.websiteName }}
                </div>
              </template>
        </NavBar>
        <!-- tab选项卡 -->
        <Tab></Tab>
     
        <!-- 内容 赛事  体育资讯 赛事分析 -->
        <router-view></router-view>

    </div>
</template>
<script setup>
// 导航栏
import NavBar from '../../components/NavBar/index.vue';
// tab选项卡
import Tab from './Tab.vue';
// pinia
import useUserInfo from '../../stores/modules/userinfo'
const UserInfoStore = useUserInfo()
import { onMounted } from 'vue';
// 请求用户详情
import { UserInfoData } from '../../api/user'
const GetUserInfo = () => {
    UserInfoData({memberId:'19557'}).then(res => {
        UserInfoStore.uptauserinfo(res.data.resultSet)
    }).catch(err => {
        console.log(err)
    })
}
onMounted(() => {
    GetUserInfo()
})



</script>
<style lang="scss" scoped>
    .container{
        width: 100vw;
        min-height: 100vh;
        padding-top: 85px;
        .logo_box{
            color: #ffffff;
            margin-left: 10px;
            font-size: 12px;
            display: flex;
            align-items: center;
            .logo_image_box{
                margin-right: 8px;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
        }
    }
</style>