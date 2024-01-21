<template>
    <div class="Information_box">
        <div class="item_box">
            <!-- 资讯选项 -->
            <div class="Information_item_box">
                <div class="Information_Text">
                    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                </div>
                <!-- 图片 -->
                <div class="Information_image">
                    <img src="" alt="">
                </div>
            </div>
            <!-- 广告位 -->
            <div class="advertisement_box">
                <img src="" alt="广告" />
            </div>
        </div>
    </div>
</template>
<script setup>

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