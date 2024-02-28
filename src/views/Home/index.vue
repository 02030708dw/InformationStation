<template>
  <div class="container"  v-if="isDataLoaded">
    <!-- 导航栏 -->
    <NavBar>
      <template #NavBarLogo>
        <div class="logo_box">
          <div class="logo_image_box" v-if="UserInfoStore.userinfo.logoUrl">
            <img :src="'data:' + UserInfoStore.userinfo.logoUrl" alt="" />
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import NavBar from "../../components/NavBar/index.vue";  // 导航栏
import Tab from "./Tab.vue";  // tab选项卡
import useUserInfo from "../../stores/modules/userinfo";  //// pinia
import { UserInfoData } from "../../api/user";  // 请求用户详情


const isDataLoaded = ref(false);
const route = useRoute();
const userId = route.params.id;
const UserInfoStore = useUserInfo();

const GetUserInfo = () => {
  UserInfoData({ memberId: userId })
    .then((res) => {
      UserInfoStore.uptauserinfo(res.data.resultSet);
      isDataLoaded.value = true; // 数据加载完成
    })
    .catch((err) => {
      console.error(err);
    });
};
onMounted(() => {
  GetUserInfo();
});
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  min-height: 100vh;
  padding-top: 85px;
  .logo_box {
    color: #ffffff;
    margin-left: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    .logo_image_box {
      margin-right: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
