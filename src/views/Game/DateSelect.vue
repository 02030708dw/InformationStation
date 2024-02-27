<template>
    <div class="DateSelect_box" v-if="Show">
        <!-- left -->
        <div class="left_box">live</div>
        <!-- center -->
        <div class="center_box">
            <div class="Select_box_box">
                <div class="select_item_box" v-for="(item,index) in DateArrlist " :key="index" @click="GetSelectDate(item,index)">
                    <div class="Date_text">{{item}}</div>
                    <!-- 选中 -->
                    <div  :class="index === Index ? 'Date_ok':'Date_no'"></div>
                </div>
            </div>
        </div>
        <!-- right -->
        <div class="right_box"></div>
    </div>
</template>
<script setup>
import { onMounted,ref } from 'vue'
const DateArrlist = ref([])
const Index = ref(0)
onMounted(() => {
    DateArrlist.value = getOneWeekDates()
})

// 获取一周时间
const getOneWeekDates = () => {
  const today = new Date();
  const oneWeekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${month}/${day}`;
    oneWeekDates.push(formattedDate);
  }

  return oneWeekDates;
}
defineProps({
    Show:{
        type:Boolean,
        default:true
    }
})
const getFormattedDate = (day) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  // 拼接日期
  const customDate = `${currentYear}-${day.replace('/', '-')}`;
  return customDate;
}
const emit = defineEmits('GameData')
// 选择日期
const GetSelectDate =(item,index) => {
    Index.value = index
    emit('GameData',getFormattedDate(item))
}
</script>
<style lang="scss" scoped>
.DateSelect_box {
    width: 100vw;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    position: fixed;
    top: 80px;
    .left_box {
        width: 40px;
        height: 30px;
        font-size: 12px;
        line-height: 30px;
        margin-left: 10px;
        border-radius: 5px;
        color: #ffffff;
        background-color: rgba(9, 108, 220, 0.8);
    }

    .right_box {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        background-image: url('../../assets/image/Home/signin.png');
        background-size: cover;
    }

    .center_box {
        width: 260px;
        
        height: 30px;
        overflow: hidden;
        position: relative;

        .Select_box_box {
            height: 30px;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            overflow-x: scroll;
            display: flex;
            align-items: center;
            .select_item_box{
                width: 70px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                .Date_text{
                    width: 70px;
                    color: #d6d6d6;
                    text-align: center;
                    line-height: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.5px;
                    border-right: 1px solid #d6d6d6;
                }
                .Date_no{
                    width: 30px;
                }
                .Date_ok{
                    width: 30px;
                    border: 1px solid #83c4f0;
                }
                
            }
        } 
    }
}

::-webkit-scrollbar {
    display: none;
}
</style>