<template>
  <div class="Information_box">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="100"
    >
      <van-cell
        v-for="item in ListData"
        :key="item"
        @click="HandelInformationinfo(item)"
      >
        <template #default>
          <div class="item-box">
            <div class="Information-Text">
              {{ item.content.title }}
            </div>
            <div class="Information-image">
              <img :src="item.content.cover" />
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script setup>
// 接口
import { InformationData } from "../../api/information";
import { ref, onMounted, onUnmounted } from "vue";
// pinia
import useInformationinfo from "../../stores/modules/Informationinfo";
const Informationinfo = useInformationinfo();
// vue-route
import { useRouter } from "vue-router";
const router = useRouter();
// 列表数据
var ListData = ref([]);
// 总条数
const total = ref();
// 页码
const pageNo = ref(1);
// 请求资讯数据
const GetInformationData = () => {
  InformationData({ pageNo: pageNo.value, pageSize: 10 })
    .then((res) => {
      loading.value = false;
      ListData.value = [...ListData.value, ...res.data.resultSet.data];
      total.value = res.data.resultSet.total;
    })
    .catch((err) => {
      console.log(err);
    });
};
const finished = ref(false);
const loading = ref(false);
const onLoad = () => {
  if (ListData.value.length >= total.value) {
    finished.value = true;
    return;
  }
  pageNo.value++;
  GetInformationData();
};

// 跳转到资讯详情
const HandelInformationinfo = (item) => {
  // 跳转页面
  router.push("/Informationinfo");
  // 存储资讯详情数据
  Informationinfo.UpdataInformationinfo(item);
};
// 初始化数据
onMounted(() => {
  //   GetInformationData();
});
</script>
<style lang="scss" scoped>
.Information_box {
  padding-top: 10px;
  width: 100vw;

  .item-box {
    width: 100%;
    .Information-Text {
      text-align: start;
    }
    .Information-image {
      img {
        width: 100%;
      }
    }
  }
}
</style>
