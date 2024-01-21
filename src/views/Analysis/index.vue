<template>
    <div class="Analysis_box">
        <div class="Analysis_item_box">
            <!-- 信息 -->
            <div class="info_box">
                <!-- 头像 -->
                <div class="avatar_box">
                    <img src="" alt="">
                </div>
                <!-- 信息 -->
                <div class="info_text">
                    <!-- name -->
                    <div class="name_box">张三</div>
                    <!-- 标签 -->
                    <div class="lable_box_one">
                        90天13连红
                    </div>
                    <div class="lable_box_tow">
                       近15中10
                    </div>
                </div>
            </div>
            <!-- 内容 -->
            <div class="conent_box">
                *************************************************************************************
            </div>
        </div>
        <!-- 广告 -->
        <div  class="advertisement_box">
            <img src="" alt="广告" />
          </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.Analysis_box {
    width: 100vw;

    .Analysis_item_box {
        width: 100vw;
        margin-top: 15px;
        .info_box {
            width: 100vw;
            display: flex;
            align-items: center;

            // 头像
            .avatar_box {
                margin-left: 10px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }
            .info_text{
                margin-left: 8px;
                display: flex;
                align-items: center;
                .name_box{
                    color: #111;
                    font-weight: 600;
                    font-size: 15px;
                }
                .lable_box_one{
                    border-radius: 5px;
                    padding: 2px;
                    margin-left: 8px;
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgb(210, 110, 110);
                    font-size: 10px;
                    color: rgb(210, 110, 110);
                    background-color: rgba(210, 110, 110,0.3);
                }
                .lable_box_tow{
                    border-radius: 5px;
                    padding: 2px;
                    margin-left: 8px;
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgb(115, 115, 47);
                    font-size: 10px;
                    color: rgb(115, 115, 47);
                    background-color: rgba(115, 115, 47,0.3);
                }
            }
        }
        .conent_box{
            word-wrap: break-word;
	        word-break: break-all;
            width: 355px;
            margin-top: 5px;
            text-align: left;
            padding:0px 10px;
            font-size: 15px;
            font-weight: 550;
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
}</style>