<template>
    <div class="demo-game">
        <div class="advertising">
            广告位
        </div>
        <div class="game">

            <div class="game-draw-lotter">
                <div class="count-time">00:{{ time < 10 ? '0' + time : time }}</div>
                        <div class="draw-lotter-bottom">
                            <ul class="num">
                                <li v-for="item in drawNum">{{ item }}</li>
                            </ul>
                            <div class="demo-money">试玩金:{{ demoGameMoney }}</div>
                        </div>
                </div>

                <ul class="bet-num">
                    <li v-for="item in 10" class="item-num" @click="clickNum(item - 1, $event)"
                        :class="{ active: activeNums.includes(item - 1) }">
                        <p class="num">{{ item - 1 }}</p>
                        <p class="winamount">4</p>
                    </li>
                </ul>

                <div class="change-bottom">
                    <div class="top">
                        <div class="t-l">
                            <input type="num" placeholder="倍数" v-model="multiple">
                            &nbsp;
                            倍
                            &nbsp;
                            <span>元</span>
                        </div>
                        <div class="t-r">
                            奖金:{{ activeNums.length*multiple*40 }}
                        </div>
                    </div>
                    <div class="center">
                        <span class="num">{{ activeNums.length }}</span>
                        <span>注</span>
                        <span>,</span>
                        <span class="num">{{ activeNums.length * 10 * multiple }}</span>
                        <span>元</span>
                    </div>
                    <div class="bottom">
                        <div class="clear" @click="activeNums = []">清空</div>
                        <div class="bet" :class="{ have: activeNums.length }" @click="betNow">立即投注</div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup>
import { ref, onUnmounted } from 'vue'
const activeNums = ref([])//当前选择的号码
const multiple = ref(1)
const demoGameMoney = ref(10000)
const clickNum = (num, e) => {
    if (!activeNums.value.includes(num)) {
        if (activeNums.value.length >= 4) return
    }
    let arr = [...e.target.classList]
    arr.includes('item-num')
        ? BoardAnimate(e.target)
        : BoardAnimate(e.target.parentNode)
    if (activeNums.value.includes(num)) {
        activeNums.value = activeNums.value.filter(item => item != num)
    } else {
        activeNums.value.push(num)
    }
}
const betNow = () => {
    demoGameMoney.value -= activeNums.value.length * 10 * multiple.value
    alreadyBet.value.push(...activeNums.value)
    activeNums.value = []
}


let time = ref(15)
let drawNum = ref([])

let setDrawNum = () => {
    //设置开奖号码0-9随机不重复
    const digits = '0123456789'.split('');
    const result = [];
    function generate() {
        while (result.length < 4) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            result.push(digits.splice(randomIndex, 1)[0]);
        }
        return result.join('');
    }
    return generate();
}

let alreadyBet = ref([])//已经投注的号码
function Statistics() {
    console.log(
        countCommonNumbers(alreadyBet.value, drawNum.value.split(''))
    )//投中的数量
    let num = countCommonNumbers(alreadyBet.value, drawNum.value.split(''))
    alreadyBet.value = []
    demoGameMoney.value += num * 40 * multiple.value
}
drawNum.value = setDrawNum()
let timer = setInterval(() => {
    if (time.value <= 0) {
        drawNum.value = setDrawNum()
        Statistics()
        time.value = 16
    }
    time.value--

}, 1000)
onUnmounted(() => {
    clearInterval(timer)
})

const keyframes = [
    { scale: 0.9 },
    { scale: 1.2 },
    { scale: 0.95 },
    { scale: 1.05 },
    { scale: 0.98 },
    { scale: 1 },
];
const options = {
    duration: 500, // 动画持续时间（单位：毫秒）
    easing: "linear", // 缓动函数
    fill: "forwards", // 动画结束后保持最后一个关键帧的状态
    delay: 0 //延迟时间
};
const BoardAnimate = (dom) => {
    dom.animate(keyframes, options);
};
function countCommonNumbers(array1, array2) {
    // 将两个数组的元素都转换为字符串类型的Set以提高查找效率
    const set1 = new Set(array1.map(String));
    let count = 0;

    // 遍历另一个数组，将每个元素转换为字符串后检查是否在Set中
    for (let num of array2) {
        if (set1.has(String(num))) {
            count++;
        }
    }

    return count;
}
</script>
<style lang="scss" scoped>
.demo-game {
    .advertising {
        background-color: #fff;
        line-height: 60px;
        text-align: center;
    }

    .game {
        .game-draw-lotter {
            font-size: 16px;
            aspect-ratio: 3.2/1;
            background-size: cover;
            background-image: url('@/assets/bggame.png');
            display: flex;
            gap: 10px;
            flex-direction: column;
            justify-content: flex-end;

            .count-time {
                width: 200px;
                font-size: 20px;
                text-align: center;
                background: linear-gradient(to right, rgb(11, 160, 219), rgb(177, 214, 235));
                border-radius: 0 20px 20px 0;
                color: #fff;
            }

            .draw-lotter-bottom {
                display: flex;
                justify-content: space-between;

                .num {
                    width: 200px;
                    display: flex;
                    justify-content: space-around;

                    li {
                        border-radius: 40px;
                        line-height: 40px;
                        font-size: 20px;
                        width: 40px;
                        text-align: center;
                        background-color: #fff;
                        box-shadow: inset 0 3px 6px rgb(54, 121, 215);
                    }
                }

                .demo-money {
                    line-height: 40px;
                    border: 1px solid #000;
                    background-color: #fff;
                }
            }
        }

        .bet-num {
            padding-bottom: 10px;
            background-color: #fff;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            justify-items: center;

            .item-num {
                text-align: center;
                width: 50px;
                height: 50px;
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                border-radius: 4px;
                box-shadow: 0 1px 4px #999;

                .num {
                    font-size: 18px;
                }

                .winamount {
                    font-size: 14px;
                    color: red;
                }
            }

            .active {
                color: #fff;
                background-image: linear-gradient(to bottom, #f15000, #fa8337);
            }
        }

        .change-bottom {
            font-size: 16px;
            background-color: #f2f2f2;

            .top {
                padding: 0 10px;
                height: 40px;
                display: flex;
                justify-content: space-between;
                .t-l{
                    display: flex;
                    align-items: center;
                    height: 100%;
                    input {
                    border-radius: 4px;
                    border: 1px solid #bbb;
                    text-align: center;
                    width: 50px;
                    height: 80%;
                }
                span {
                    line-height: 30px;
                    border-radius: 4px;
                    width: 40px;
                    text-align: center;
                    border: 1px solid #bbb;
                    display: inline-block;
                }
                }
                .t-r{
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                }

            }

            .center {
                background-color: #e6e6e6;
                padding-right: 10px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                font-size: 14px;

                .num {
                    margin: 0 2px;
                    color: #fb8032;
                }
            }

            .bottom {
                background-color: #eae7da;
                height: 40px;
                display: flex;
                padding: 0 10px;
                justify-content: space-between;
                align-items: center;

                div {
                    color: #fff;
                    border-radius: 2px;
                    width: 80px;
                    line-height: 30px;
                    height: 30px;
                    text-align: center;
                    box-shadow: 0 2px 2px #666;
                }

                .clear {
                    background-color: #bbb598;
                }

                .bet {
                    background-color: #ced0da;
                }

                .have {
                    background-color: #fb8032;
                }
            }
        }
    }
}
</style>