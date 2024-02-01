<template>
  <div class="Game_box">
    <DateSelect @GameData="GetGameData"></DateSelect>
    <!-- 联系弹窗 -->
    <div class="contact_box" v-if="UserInfoStore.userinfo.windowPictureUrl">
      <a :href="UserInfoStore.userinfo.windowUrl" target="_blank"
        ><img :src="'data:' + UserInfoStore.userinfo.windowPictureUrl" alt=""
      /></a>
    </div>

    <!-- 列表选项和广告位 -->
    <div v-for="(item, index) in displayList" :key="index">
      <div v-if="!item.isAd" @click="HandelPath(item.id)">
        <!-- 列表选项 -->
        <div
          class="item_box"
          v-for="(item, index) in ItemArrList"
          :key="index"
          @click="HandelPath(item.id)"
        >
          <!-- 标题 -->
          <div class="item_title_box">
            <!-- 国旗 -->
            <div class="flag_box">
              <img :src="item.content.eventsIcon" alt="" />
            </div>
            <!-- 标题 -->
            <div class="item_title_text_box">{{ item.content.trialName }}</div>
          </div>
          <!-- 赛事内容 -->
          <div class="Game_conent_box">
            <!-- left -->
            <div class="left_box">
              <!-- 开始时间 -->
              <div class="StartTime_box">
                {{ item.content.startTime.slice(11, 16) }}
              </div>
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
                    <img :src="item.content.home_icon" alt="" />
                  </div>
                  <!-- name -->
                  <div class="name_box">{{ item.content.homeTeam }}</div>
                </div>
                <div class="left_center_item">
                  <!-- 图标 -->
                  <div class="ico_box">
                    <!-- <img :src="item.content.away_icon" alt="" /> -->
                    <img
                      src="https://t7.baidu.com/it/u=2605426091,1199286953&fm=193&f=GIF"
                      alt=""
                    />
                  </div>
                  <div class="name_box">{{ item.content.awayTeam }}</div>
                </div>
              </div>
              <!-- 播放 -->
              <div class="right_center_box"></div>
            </div>
            <!-- right -->
            <div class="right_box">
              <div class="Number_box">
                {{
                  item.content.score.slice(0, item.content.score.indexOf("-"))
                }}
              </div>
              <div class="Number_box">
                {{
                  item.content.score.slice(item.content.score.indexOf("-") + 1)
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="advertisement_box">
        <!-- 广告的内容 -->
        <a :href="UserInfoStore.userinfo.phoneAdGoalUrl" target="_blank">
          <img :src="'data:' + UserInfoStore.userinfo.phoneAdPictureUrl" />
        </a>
      </div>
    </div>

    <!-- 按钮 -->
    <!-- facebook -->
    <div
      class="F_box"
      v-if="UserInfoStore.userinfo.facebookStatus"
      :style="{ background: UserInfoStore.userinfo.facebookColour }"
    >
      <a :href="UserInfoStore.userinfo.facebookGoalUrl">{{
        UserInfoStore.userinfo.facebookText
      }}</a>
    </div>
    <!-- line -->
    <div
      class="l_box"
      v-if="UserInfoStore.userinfo.lineStatus"
      :style="{ background: UserInfoStore.userinfo.lineColour }"
    >
      <a :href="UserInfoStore.userinfo.lineGoalUrl">{{
        UserInfoStore.userinfo.lineText
      }}</a>
    </div>
  </div>
</template>
<script setup>
import useUserInfo from "../../stores/modules/userinfo";
const UserInfoStore = useUserInfo();
import { ref, onMounted, computed } from "vue";
// 组件
import DateSelect from "./DateSelect.vue";
// 路由
import { useRouter } from "vue-router";
const router = useRouter();
// 接口
import { GameData } from "../../api/Game";
const ItemArrList = ref([]);
// // 日期
// const DateValue = ref()
// 获取当前日期
const getCurrentDay = () => {
  const currentDate = new Date();

  // 获取年、月、日
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，需要加1
  const day = currentDate.getDate().toString().padStart(2, "0");

  // 拼接日期
  const formattedDate = `${year}-${month}-${day}`;
  GetGameData(formattedDate);
};
// 获取赛事数据
const GetGameData = (date) => {
  GameData({ date: date })
    .then((res) => {
      ItemArrList.value = res.data.resultSet;
      console.log(ItemArrList.value);
      // const Number = Math.floor(Math.random() * res.data.resultSet.length - 1)
      // ItemArrList.value.splice(Number, 0, {
      //   src:UserInfoStore.userinfo.phoneAdPictureUrl,
      //   url:UserInfoStore.userinfo.phoneAdGoalUrl,
      //   type:0,
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getCurrentDay();
});
// 跳转到赛事详情
const HandelPath = (id) => {
  router.push(`/GameInfo/${id}`);
};

// 计算广告插入位置
function insertAdsIntoList(items, minInterval) {
  let result = [];
  let intervalCount = 0;
  items.forEach((item, index) => {
    result.push(item); // 将原始项添加到结果中
    intervalCount++;
    if (intervalCount >= minInterval) {
      // 随机决定是否在此处插入广告
      if (Math.random() < 0.7) {
        result.push({ isAd: true }); // 插入广告
        intervalCount = 0; // 重置间隔计数器
      }
    }
  });
  return result;
}

const displayList = computed(() => {
  return insertAdsIntoList(ItemArrList.value, 0.5);
});
</script>
<style lang="scss" scoped>
.Game_box {
  width: 100vw;
  padding-bottom: 20px;
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

  // 联系
  .contact_box {
    left: 10px;
    bottom: 80px;
    height: 100px;
    width: 100px;
    position: fixed;
    background-color: #f2f2f2;
    line-height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .F_box,
  .l_box {
    position: fixed;
    padding: 0 10px;
    height: 28px;
    line-height: 28px;
    right: 20px;
    bottom: 80px;
    font-size: 14px;
  }
  .l_box {
    bottom: 40px;
  }
}
</style>
