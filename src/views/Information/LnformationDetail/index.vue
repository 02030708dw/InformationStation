<template>
  <div class="LnformationDetail" :style="{ 'padding-bottom': showSmile ? '180px' : '60px' }">
    <div class="News">
      <van-nav-bar class="sticky" :title="'checkthedetails'">
        <!-- 返回按钮 -->
        <template #left>
          <van-icon name="arrow-left" size="24" color="#fff" @click="$router.back()"/>
        </template>
      </van-nav-bar>
      <div class="Newslist">
        <div class="l">
          <div>
            <div class="t">
              <div class="avatar">
                <img :src="getAssetURL()" alt="" />
              </div>
              <div class="authors">
                <p class="author">{{ tab.account }}</p>
                <div class="times">
                  {{ tab.updatedAt }}
                </div>
              </div>
            </div>
          </div>
          <div class="title">
            {{ tab.title }}
          </div>
        </div>
        <div class="r" v-if="tab.pictureUrl">
          <div class="image-grid">
            <div class="grid-item" v-for="(i, index) in getImageUrls(tab.pictureUrl)" :key="index">
              <img :src="i" />
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="thumbsUp" @click="status = !status">
            <van-icon v-if="status" name="good-job-o" size="18" /> <van-icon name="good-job" class="dz" color="#ed6d4a" v-else size="18" /><span>{{
              'Like'
            }}</span>
          </div>
          <div class="message">
            <van-icon name="chat-o" size="18" /><span>{{ 'Comment' }}</span>
          </div>
        </div>
        <div class="comments" ref="commentsRef">
          <div class="item" v-for="v in list">
            <van-image class="avatar" fit="cover" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
            <div class="item-r">
              <div class="content">
                <div class="name">{{ v.name }}</div>
                <p class="title">
                  <van-text-ellipsis rows="3" :content="v.title" :expand-text="'Expand'" :collapse-text="'Collapse'" />
                </p>
              </div>
              <div class="content-bottom">
                <span class="day">1day</span>
                <span class="support" @click="v.status = !v.status">
                  <van-icon name="good-job-o" v-if="v.status" size="14" />
                  <van-icon name="good-job" class="dz" color="#ed6d4a" v-else size="14" />
                  {{ 'Like' }} </span
                >{{ 'Like' }}
                <span class="reply">{{ 'Reply' }}</span>
                <span class="icon">1<van-icon name="fire-o" color="#ee0a24" /></span>
              </div>
              <div v-if="v.child" v-for="child in v.child" class="item item-child">
                <van-image class="avatar" fit="cover" round src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
                <div class="item-r">
                  <div class="content">
                    <div class="name">{{ child.name }}</div>
                    <p class="title">
                      <van-text-ellipsis rows="3" :content="child.title" :expand-text="'Expand'" :collapse-text="'Collapse'" />
                    </p>
                  </div>
                  <div class="content-bottom">
                    <span class="day">1day</span>
                    <span class="support">
                      <van-icon name="good-job-o" @click="child.status = !child.status" v-if="child.status" size="14" />
                      <van-icon name="good-job" class="dz" @click="child.status = !child.status" color="#ed6d4a" v-else size="14" />{{
                        'Like'
                      }}</span
                    >
                    <span class="reply">{{ 'Reply' }}</span>
                    <span class="icon">1<van-icon name="fire-o" color="#ee0a24" /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Keyboard @send="handleSend" v-model:showSmile="showSmile" />
</template>

<script setup>
import { nextTick, ref } from 'vue';
import Keyboard from './Keyboard.vue';
defineOptions({name:"LnformationDetail"})
const commentsRef=ref(null)
const showSmile = ref(false);
const status = ref(true);
const list = ref([
  {
    name: 'name1',
    title: 'namenamenamenmemenamenamenamenamenamenamenamename',
    status: false,
    child: [
      {
        name: 'name11',
        title: 'titletitletitletitletitletitletitle',
        status: true
      },
      {
        name: 'name12',
        title: 'titletitletitletitletitletitletitle',
        status: true
      }
    ]
  },
  { name: 'name2', title: 'amenameenamenamenamenamenamenamenamenamenamenamenamenamenamenamename', status: true }
]);
const tab = ref([]);
const handleSend = (item) => {
  list.value.push(item);
  nextTick(()=>commentsRef.value.lastElementChild.scrollIntoView())
};
const storedContentString = sessionStorage.getItem('InfoDetail');
// 检查是否成功获取到内容字符串
if (storedContentString) {
  try {
    // 将内容字符串解析为对象
    const storedContent = JSON.parse(storedContentString);
    // 这里可以根据需要使用存储的内容进行操作，比如渲染到页面上
    tab.value = storedContent;
  } catch (error) {
    console.error('解析存储的内容时出错：', error);
  }
} else {
  console.error('未找到存储的内容');
}
const text =
  'namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename';

const back = () => {
};

//动态引入本地图片
const getAssetURL = () => {
  return 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msBaC.img'
};

const getImageUrls = (pictureUrl) => {
  return pictureUrl.split(',').map((url) => 'https://static.44dog.cc/' + url.trim());
};
</script>
<style scoped lang="scss">
@keyframes heart {
  0% {
    transform: scale(1) rotate(0deg);
  }

  12.5% {
    transform: scale(1.3) rotate(-20deg);
  }

  25% {
    transform: scale(1.3) rotate(-10deg);
  }

  37.5% {
    transform: scale(1) rotate(0deg);
  }

  50% {
    transform: scale(1.3) rotate(-10deg);
  }

  62.5% {
    transform: scale(1.3) rotate(-10deg);
  }

  75% {
    transform: scale(1) rotate(0deg);
  }

  100% {
    transform: scale(1) rotate(0deg);
  }
}

.dz {
  animation: heart 1s;
}

.LnformationDetail {
  height: 100%;
  padding-bottom: 60px;
  background: #eff2f9;
  overflow: auto;
  scrollbar-width: none;
}

.News {
  &:deep(.van-nav-bar__content){
    background-color:$themebgColor;
  }

  &:deep(.van-nav-bar__title) {
    color: #fff;
  }
  .sticky {
    position: sticky;
    top: 0;
  }

}

.Newslist {
  background-color: #ffffff;
  color: #000000;
  margin: 10px;
  border-radius: 7px;
  font-size: 12px;

  .l {
    padding: 10px;
    box-sizing: border-box;

    .t {
      display: flex;

      .avatar {
        width: 50px;
        height: 50px;
        padding-top: 5px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .authors {
        font-size: 14px;
        padding-left: 10px;
        padding-top: 10px;
      }
    }

    .title {
      margin-top: 10px;
      font-size: 12px;
    }

    .times {
      margin-top: 4px;

      .time {
        margin-left: 10px;
      }
    }
  }

  .r {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 20px;
    text-align: center;

    .image-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;

      .grid-item {
        width: 100%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 7px;
        }
      }
    }
  }

  .bottom {
    display: flex;
    padding: 10px;
    font-size: 14px;

    .thumbsUp,
    .message {
      margin-right: 70px;
      display: flex;
      align-items: center;
      line-height: 20px;

      span {
        margin-left: 5px;
      }
    }
  }

  .comments {
    padding: 10px;

    .van-text-ellipsis {
      line-height: 1.4;
    }

    .item {
      margin-bottom: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;

      .avatar {
        width: 30px;
        height: 30px;
      }

      .item-r {
        width: calc(100% - 35px);

        .content {
          padding: 5px 8px;
          border-radius: 15px;
          background-color: #f0f2f5;

          .name {
            font-weight: 700;
          }

          .title {
            word-wrap: break-word;
          }
        }

        .content-bottom {
          display: flex;
          align-items: center;
          padding: 3px 8px;
          font-size: 10px;
          line-height: 16px;

          span {
            margin-right: 20px;
          }

          .icon {
            margin-right: -10px;
            margin-left: auto;
          }
        }
      }
    }

    .item-child {
      margin: 10px 0;

      .avatar {
        width: 20px;
        height: 20px;
      }

      .item-r {
        width: calc(100% - 25px);
      }
    }
  }

  .views {
    font-size: 12px;
    display: flex;
    height: 40px;
    line-height: 40px;
    padding-bottom: 10px;
    border-bottom: 1px solid #fff;

    div {
      flex: 1;
      text-align: center;

      span {
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }

    .shoucang {
      background-image: url('../../../assets/Home/shoucang.png');
      background-repeat: no-repeat;
      background-position: 50%;
    }

    img {
      width: 30px;
      height: 30px;
      // padding-top: 5px;
      vertical-align: middle;
    }
  }
}

.ad {
  width: 100%;
  height: 200px;
  background-color: aqua;
  text-align: center;
  line-height: 200px;
}
</style>
