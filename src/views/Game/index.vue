<template>
  <div class="Game_box">
    <DateSelect @GameData="GetGameData"></DateSelect>
    <!-- 联系弹窗 -->
    <div class="contact_box" v-if="UserInfoStore.userinfo.windowPictureUrl">
      <a :href="UserInfoStore.userinfo.windowUrl" target="_blank"
        ><img :src="'data:' + UserInfoStore.userinfo.windowPictureUrl" alt=""
      /></a>
    </div>
    <!-- 列表选项 -->
    <div
      class="item_box"
      v-for="(item, index) in ItemArrList"
      :key="index"
    >
      <!-- 广告 -->
      <div v-if="item.isAd" class="advertisement_box">
        <a :href="UserInfoStore.userinfo.phoneAdGoalUrl" target="_blank">
          <img :src="'data:' + UserInfoStore.userinfo.phoneAdPictureUrl" />
        </a>
      </div>
      <!-- 列表项内容 -->
      <template v-else>
        <div class="item_title_box">
          <div class="flag_box">
            <img
              :src="'data:image/png;base64,' + item.content.eventsIcon"
              alt=""
            />
          </div>
          <div class="item_title_text_box">{{ item.content.trialName }}</div>
        </div>
        <div class="Game_conent_box" @click="HandelPath(item.id)">
          <div class="left_box">
            <div class="StartTime_box">
              {{ item.content.startTime.slice(11, 16) }}
            </div>
            <div class="duration_box">36`</div>
          </div>
          <div class="center_box">
            <div class="left_center_box">
              <div class="left_center_item">
                <div class="ico_box">
                  <img
                    :src="'data:image/png;base64,' + item.content.home_icon"
                    alt=""
                  />
                </div>
                <div class="name_box">{{ item.content.homeTeam }}</div>
              </div>
              <div class="left_center_item">
                <div class="ico_box">
                  <img
                    :src="'data:image/png;base64,' + item.content.away_icon"
                    alt=""
                  />
                </div>
                <div class="name_box">{{ item.content.awayTeam }}</div>
              </div>
            </div>
          </div>
          <div class="right_box">
            <div class="Number_box">
              {{ item.content.score.slice(0, item.content.score.indexOf("-")) }}
            </div>
            <div class="Number_box">
              {{
                item.content.score.slice(item.content.score.indexOf("-") + 1)
              }}
            </div>
          </div>
        </div>
      </template>

      <!-- 加载更多提示或加载中动画 -->
      <div v-if="isLoading" class="loading">加载中...</div>
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
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import useUserInfo from "../../stores/modules/userinfo";
import DateSelect from "./DateSelect.vue"; // 组件
import { useRouter } from "vue-router"; // 路由
import { GameData } from "../../api/Game"; // 接口

const UserInfoStore = useUserInfo(); // 用户信息
const router = useRouter(); // 路由
const ItemArrList = ref([]); // 数据
const isLoading = ref(false); //加载
const pageNo = ref(1); //当前页
const pageSize = ref(10); //每页显示条数
const total = ref(0); //总条数

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
      const items = res.data.resultSet;
      // 根据items的长度计算广告数量，每3个项插入一个广告
      const adCount = Math.floor(items.length / 5);
      const adPositions = calculateAdPositions(items.length, adCount);

      // 根据计算出的位置插入广告标识
      adPositions.forEach((pos, index) => {
        // 由于插入广告会改变数组长度，位置需要适当调整
        items.splice(pos + index * 3, 0, { isAd: true }); // 调整插入逻辑以适应每3个项一个广告的规则
      });

      ItemArrList.value = items;
    })
    .catch((err) => {
      console.log(err);
    });
};

//计算广告位置
const calculateAdPositions =(length, count)=> {
  let positions = [];
  for (let i = 1; i <= count; i++) {
    // 确保广告尽可能均匀分布，同时引入小的随机偏移来保持随机性
    let pos = Math.floor(i * 3 - 3 + Math.random() * 3);
    positions.push(pos);
  }
  return positions;
}

// 跳转到赛事详情
const HandelPath = (id) => {
  router.push(`/GameInfo/${id}`);
};

//

// 初始化
onMounted(() => {
  getCurrentDay();
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
