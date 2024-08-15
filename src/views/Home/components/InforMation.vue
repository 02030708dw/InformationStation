<template>
    <div class="infor-mation">
        <Title text="InforMation" @changeMore="$router.push({name:'Infomation'})"/>
        <ul class="info-list">
            <li v-for="(item,index) in 2" class="info-item">

                <div class="left">
                    <p class="text">
                        สวัสดีวันพุธที่สดใส่ น้องมาดามทำสำเร็จแล้วองค์ท้าวเวสสุวรรณ 
                        วัดบางชัน ประทานพรให้แก่พี่ๆในเพจมาดามเจเจ 
                        ได้3ตัวตรงๆได้ปลดหนี้หลดสิ้นกันทุกคน สาธุๆ 
                        ใครเห็นใครแชร์ขอให้องค์ท้าวเวสสุวรรณประทานพรคาถาท้าวเวสสุวรรณอิติปิโส 
                        ภะคะวา ยมมะราชาโน ท้าวเวสสุวรรณโณมะระณัง สุขัง อะหัง สุคะโต นะโม 
                        พุทธายะ มาดามเจเจพาเฮง-เพจใหม่6小时6小时2小时
                    </p>
                    <p class="time">
                        <span> 2023-08-13 23:41:11 </span>
                    </p>
                </div>

                <div class="right">
                    <img class="img"
                    :src="'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1msMIB.img'">
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import Title from "./Title.vue"
</script>
<style scoped lang="scss">
.infor-mation {
    .info-list {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .info-item {
            box-sizing: border-box;
            padding: 12px;
            height: 84px;
            border-radius: 16px;
            display: flex;
            .left {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .text {
                    font-size: 14px;
                    overflow: hidden;
                    word-wrap: break-word;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    line-clamp: 2;
                    -webkit-line-clamp: 2;
                }
                .time{
                    display: flex;
                    align-items: center;
                    color: #333;
                    font-size: 12px;
                    img{
                        width: 14px;
                        margin-left: 20px;
                    }
                }
            }

            .right {
                width: 70px;
                height: 60px;
                .img {
                    border-radius: 8px;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

        }
    }
}
</style>