<template>
  <div class="Analysis_box">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="100"
    >
      <van-cell v-for="item in ListData" :key="item">
        <template #default>
          <div class="Analysis_item_box" @click="HandelInfo(item.id)">
            <div class="Analysis_Text_box">
              {{ item.content.details[0].title }}
            </div>
            <div class="Analysis_image_box">
              <img :src="item.content.conv_img" />
            </div>
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { AnalysisData, AnalysisInfo } from "../../api/Analysis";
// 列表数据
var ListData = ref([]);
// 总条数
const total = ref();
// 页码
const pageNo = ref(0);
import { useRouter } from "vue-router";
const router = useRouter();
import useAnalysisInfo from "../../stores/modules/AnalysisInfo";
const AnalysisInfoS = useAnalysisInfo();
// 跳转到资讯详情
const HandelInfo = (id) => {
  // 获取资讯详情
  AnalysisInfo({ id: id })
    .then((res) => {
      console.log(res.data.resultSet);
      AnalysisInfoS.UpdataAnalysisInfo(res.data.resultSet);
      // 跳转到资讯详情
      router.push("/AnalysisInfo");
    })
    .catch((err) => {
      console.log(err);
    });
};

// 获取赛事分析列表
const GetAnalysisDataLisit = () => {
  AnalysisData({ pageNo: pageNo.value, pageSize: 10 })
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
  GetAnalysisDataLisit();
};
</script>
<style lang="scss" scoped>
.Analysis_box {
  width: 100vw;

  .Analysis_item_box {
    height: 200px;
    .Analysis_Text_box{
        text-align: start;
    }
    .Analysis_image_box{
        img{
            width: 100%;
        }
    }
  }

  .advertisement_box {
    margin-top: 10px;
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
</style>
