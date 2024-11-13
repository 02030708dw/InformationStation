<template>
    <div class="comment-item">
        <div class="left">
            <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
        </div>
        <div class="right">

            <div class="text">
                <p class="name">{{ data.userAccount }}</p>
                <van-text-ellipsis rows="3" :content="data.content" :expand-text="$t('展开')" :collapse-text="$t('折叠')" />
            </div>

            <div class="bottom">
                <p @click="skipAIA"><van-icon name="good-job-o" size="18" /><span> {{ data.likeCount }}</span></p>
                <p @click="skipAIA">{{ $t('回复') }}</p>
            </div>

            <p v-if="data.isMoreComment && !isMoreState" @click="getChlidList" class="icon" >
            {{$t('查看其它') + data.moreCommentCount +$t('则回复')}}
            </p>

            <p v-if="isMoreState && !isMoreLoading" @click="conceal">{{ $t('隐藏回复') }}</p>


            <ul class="child-list" v-if="list.length">
                <li v-for="item in list" class="child-item">
                    <div class="left">
                        <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
                    </div>
                    <div class="right">
                        <div class="text">
                            <p class="name">{{ item.userAccount }}</p>
                            <span class="to">@{{ item.repliedToUserAccount }}:</span>
                            <van-text-ellipsis rows="3" :content="item.content" :expand-text="$t('展开')" :collapse-text="$t('折叠')" />
                        </div>

                        <div class="bottom">
                            <p><van-icon name="good-job-o" size="18" /><span> {{ item.likeCount }}</span></p>
                            <p>{{ $t('回复') }}</p>
                        </div>
                    </div>
                </li>
                <p v-if="!finished && !isMoreLoading" class="look-more" @click="getChlidList">{{ $t('更多') }}</p>
            </ul>

            <van-loading size="20" style="text-align: center;" v-if="isMoreLoading" />

        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { getChildCommentList } from "@/api/index.js"
import {skipAIA} from "@/util/getRegion.js"
const props = defineProps(['data'])
const isMoreLoading = ref(false)
const isMoreState = ref(false)
const Option = reactive({
    pageNo: 1,
    pageSize: 3,
    parentId: props.data.id,
    collectNewId: props.data.collectNewId,
})

const list = ref([])
const finished = ref(false)

const getChlidList = async () => {
    isMoreState.value = true
    isMoreLoading.value = true
    const { resultSet } = await getChildCommentList(Option)
    isMoreLoading.value = false
    Option.pageNo++
    list.value.push(...resultSet.data)
    if (list.value.length >= resultSet.total) finished.value = true
}
const conceal = () => {
    finished.value=false
    list.value = []
    Option.pageNo = 1
    isMoreState.value = false
}
</script>
<style scoped lang="scss">
.comment-item {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    font-size: 10px;
    .left {
        width: 30px;
        height: 30px;
        flex-shrink: 0;
        img {
            border-radius: 30px;
            width: 100%;
            height: 100%;
        }
    }

    .right {
        flex: 1;
        color: #fff;
        word-wrap: break-word;
        word-break: break-all;
        // padding: 10px 0;
        &>p{
            cursor: pointer;
        }
        .text {
            // padding: 6px 8px;
            // background-color: #000;
            border-radius: 15px;

            .name {
                font-weight: 700;
            }
        }

        .bottom {
            padding: 10px 0;
            gap: 20px;
            color: #fff;
            display: flex;
            align-items: center;
        }

        .child-list {
            .child-item {
                padding: 5px;
                display: flex;
                gap: 5px;

                .left {
                    width: 20px;
                    height: 20px;
                }

                .right {
                    .text {
                        padding: 3px 4px;

                        .to {
                            color: #1989fa;
                        }

                        .van-text-ellipsis {
                            display: inline;
                        }
                    }
                    .bottom {
                        padding: 5px 0;
                        gap: 10px;
                    }
                }
            }
            .look-more {
                cursor: pointer;
                text-align: center;
                color: #3e7ebe;
            }
        }
    }
}
</style>