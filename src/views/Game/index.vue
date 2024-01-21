<template>
  <div class="Game_box">
    <DateSelect></DateSelect>
    <!-- 联系弹窗 -->
    <div class="contact_box">联系</div>
    <!-- 列表选项 -->
    <div class="item_box" v-for="i in 18" @click="HandelPath(i)">
      <!-- 标题 -->
      <div class="item_title_box">
        <!-- 国旗 -->
        <div class="flag_box">
          <img src="#" alt="" />
        </div>
        <!-- 标题 -->
        <div class="item_title_text_box">柬埔寨: 柬埔寨</div>
      </div>
      <!-- 赛事内容 -->
      <div class="Game_conent_box">
        <!-- left -->
        <div class="left_box">
          <!-- 开始时间 -->
          <div class="StartTime_box">16:30</div>
          <!-- 时长 -->
          <div class="duration_box">36`</div>
        </div>
        <!-- center -->
        <div class="center_box">
          <!-- 赛事详情 -->
          <div class="left_center_box">
            <div class="left_center_item">
              <!-- 图标 -->
              <div class="ico_box">
                <img src="../../assets/image/Home/play.png" alt="" />
              </div>
              <!-- name -->
              <div class="name_box">皇家马德里</div>
            </div>
            <div class="left_center_item">
              <!-- 图标 -->
              <div class="ico_box">
                <img src="../../assets/image/Home/play.png" alt="" />
              </div>
              <div class="name_box">尤文图斯</div>
            </div>
          </div>
          <!-- 播放 -->
          <div class="right_center_box"></div>
        </div>
        <!-- right -->
        <div class="right_box">
          <div class="Number_box">1</div>
          <div class="Number_box">3</div>
        </div>
      </div>

      <!-- 广告位 -->
      <div v-if="i % 3 == 0" class="advertisement_box">
        <img src="" alt="广告" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import DateSelect from './DateSelect.vue'
import { useRouter } from "vue-router";
const router = useRouter()
const ItemArrList = ref([]);
// 跳转到赛事详情
const HandelPath = (index) => {
  if(index % 3 == 0) {
    return
  }
  router.push('/GameInfo')
}
</script>
<style lang="scss" scoped>
.Game_box {
  width: 100vw;
  .item_box {
    width: 100vw;
    // 标题
    .item_title_box {
      width: 100vw;
      height: 40px;
      background-color: #f1f1f1;
      line-height: 30px;
      display: flex;
      align-items: center;
      // 国旗
      .flag_box {
        margin-left: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;

        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      // 标题
      .item_title_text_box {
        font-size: 24px;
        color: #b9b9b9;
        font-size: 12px;
        font-weight: 550;
        margin-left: 8px;
      }
    }
    // 赛事内容
    .Game_conent_box {
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      background-color: #ffffff;
      .left_box {
        height: 60px;
        width: 15%;
        border-right: 2px solid #f1f1f1;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        // 开始时间
        .StartTime_box {
          color: #c3c4c9;
          font-size: 12px;
        }
        .duration_box {
          margin-top: 3px;
          color: red;
          font-size: 12px;
        }
      }
      .center_box {
        width: 75%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left_center_box {
          display: flex;
          justify-content: center;
          flex-direction: column;
          .left_center_item {
            display: flex;
            align-items: center;
            .ico_box {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 20px;
                height: 20px;
              }
            }
            .name_box {
              margin-left: 5px;
              font-size: 12px;
              color: #89929c;
            }
            margin-left: 10px;
          }
          .left_center_item:nth-child(n + 2) {
            margin-top: 6px;
          }
        }
        .right_center_box {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          margin-right: 10px;
          background-image: url("../../assets/image/Home/play.png");
          background-size: cover;
        }
      }
      .right_box {
        height: 60px;
        width: 10%;
        border-left: 2px solid #f1f1f1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .Number_box {
          color: red;
          font-size: 12px;
        }
        .Number_box:nth-child(n + 2) {
          margin-top: 2px;
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

  // 联系
  .contact_box {
    left: 10px;
    bottom: 80px;
    height: 100px;
    width: 100px;
    position: fixed;
    background-color: #f2f2f2;
    line-height: 80px;
  }
}
</style>
