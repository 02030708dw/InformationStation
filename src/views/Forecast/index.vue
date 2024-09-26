<template>
  <div class="forecast_box">
    <!-- <div class="card"> -->
      <Title text="Template" :showRight="false"></Title>
      <ul class="template">
        <li v-for="item in gameList" :key="item.id" @click="selectTemplate(item)"
          :class="{ selected: selectedTemplateId === item.id }">
          <div>
            <img :src="getImage(item.image)" alt="" />
          </div>
        </li>
      </ul>
    <!-- </div> -->
    <!-- <div class="card"> -->
      <Title text="Edit the title" :showRight="false"></Title>
      <div class="input-group">
        <label>Title:</label>
        <input type="text" v-model="title" @input="debouncedDrawImage" />
      </div>
      <div class="input-group">
        <label>Period of award:</label>
        <input type="text" v-model="issue" @input="debouncedDrawImage" />
      </div>
    <!-- </div> -->

    <!-- <div class="card"> -->
      <Title text="Edit prediction number" :showRight="false"></Title>
      <div v-for="(field, index) in predictionFields" :key="index" class="input-group">
        <input type="text" v-model="field.text" @input="debouncedDrawImage" :maxlength="maxDigits"
          class="number-input" />
        <button @click="removePredictionField(index)">-</button>
        <button v-if="index === predictionFields.length - 1" @click="addPredictionField">
          +
        </button>
      </div>
    <!-- </div> -->

    <!-- <div class="card"> -->
      <Title text="Preview" :showRight="false"></Title>
      <div class="btn">
        <button style="padding: 5px" @click="randomizeFields">random</button>
        <button style="padding: 5px" @click="clearAll">empty</button>
        <button style="padding: 5px" @click="downloadImage">download</button>
      </div>
    <!-- </div> -->
      <canvas class="canvas_box" ref="imageCanvas" width="355" height="340"></canvas>
  </div>
</template>

<script setup>
import { debounce } from "lodash"; // 引入 lodash 的防抖函数
import { ref, reactive, onMounted } from "vue";
import Title from "@/components/Title.vue";
import { getPhAward } from "@/api/index.js";

const imageCanvas = ref(null);
const selectedImage = ref(null);
const selectedTemplateId = ref(null);

// 编辑文本的默认值
const title = ref("");
const issue = ref("");
const lottery = ref([]);

// 初始化预测号码输入框
const predictionFields = reactive([{ text: "" }]);
const maxDigits = ref(6);

// 防抖函数，避免频繁重绘
const debouncedDrawImage = debounce(() => {
  drawImageOnCanvas();
}, 300); // 300ms 防抖时间

onMounted(() => {
  drawImageOnCanvas();
});

const getLottery = (item) => {
  // 清空之前的值
  lottery.value = [];
  getPhAward(item).then((res) => {
    res.resultSet.forEach((i) => {
      lottery.value.push(i.awardNum.num.replace(/,/g, "-"));
    });
  });

  // 重新绘制模板图片，使用防抖方法
  debouncedDrawImage();
};

const selectTemplate = (item) => {
  getLottery(item);

  selectedTemplateId.value = item.id;
  selectedImage.value = getImage(item.image);

  // 重置输入框
  title.value = "";
  issue.value = "";
  predictionFields.splice(0, predictionFields.length, { text: "" });

  if (item.code === "ph_2d") {
    maxDigits.value = 2;
  } else if (item.code === "ph_3d") {
    maxDigits.value = 3;
  } else if (item.code === "ph_4d") {
    maxDigits.value = 4;
  } else {
    maxDigits.value = 6;
  }
};

const drawImageOnCanvas = () => {
  const canvas = imageCanvas.value;
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = selectedImage.value || "";

  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 设置文本样式
    ctx.font = "bold 12px 'Arial', sans-serif";
    ctx.fillStyle = "red";

    // 绘制标题和奖期
    ctx.fillText(title.value, 80, 100);
    ctx.fillText(issue.value, 280, 100);

    // 绘制预测号码的网格
    drawPredictionGrid(ctx);

    // 绘制 lottery 信息在右下角
    drawLotteryInfo(ctx, canvas);
  };
};

const drawPredictionGrid = (ctx) => {
  let cellSize;
  let fontSize;
  let gridSize;
  let xOffset; // 调整这个值来改变网格整体向下移动的距离
  let yOffset;

  // 根据模板选择格子大小和字体大小
  switch (selectedTemplateId.value) {
    case 1: // 2D模板
      cellSize = 80;
      fontSize = 80;
      gridSize = 2;
      xOffset = 10;
      yOffset = 160;
      break;
    case 2: // 3D模板
      cellSize = 50;
      fontSize = 50;
      gridSize = 3;
      xOffset = 15;
      yOffset = 160;
      break;
    case 3: // 4D模板
      cellSize = 40;
      fontSize = 40;
      gridSize = 4;
      xOffset = 10;
      yOffset = 156;
      break;
    case 4: // 6D模板
      cellSize = 27;
      fontSize = 27;
      gridSize = 6;
      xOffset = 9;
      yOffset = 155;
      break;
    default:
      cellSize = 25;
      fontSize = 18;
      gridSize = 6;
      xOffset = 10;
      yOffset = 160;
      break;
  }

  ctx.strokeStyle = "#f00";
  ctx.lineWidth = 1;

  // 绘制网格
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (row < predictionFields.length) {
        ctx.strokeRect(
          xOffset + col * cellSize,
          yOffset + row * cellSize,
          cellSize,
          cellSize
        );
      }
    }
  }

  // 设置字体大小
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // 填入数字
  predictionFields.forEach((field, rowIndex) => {
    for (let i = 0; i < field.text.length; i++) {
      const colIndex = i % gridSize;
      const x = xOffset + colIndex * cellSize + cellSize / 2;
      const y = yOffset + rowIndex * cellSize + cellSize / 2 + 3;
      ctx.fillText(field.text[i], x, y);
    }
  });
};

const drawLotteryInfo = (ctx, canvas) => {
  let fontSize;
  let lineHeight;
  let xOffset;
  let yOffset;

  // 根据模板选择字体大小和行间距
  switch (selectedTemplateId.value) {
    case 1:
    case 2:
      fontSize = 40; // 增加字体大小
      lineHeight = 50; // 增加行间距
      xOffset = 170;
      yOffset = 340;
      break;
    case 3:
      fontSize = 50;
      lineHeight = 25;
      xOffset = 165;
      yOffset = 250;
      break;
    case 4:
      fontSize = 33;
      lineHeight = 50;
      xOffset = 160;
      yOffset = 260;
      break;
    default:
      fontSize = 50;
      lineHeight = 25;
      xOffset = 170;
      yOffset = 250;
      break;
  }
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  const x = canvas.width - xOffset / 2 - 10;
  const y = canvas.height - yOffset / 2 + 20;

  // 绘制每一行的 lottery 信息
  lottery.value.forEach((lotteryText, index) => {
    ctx.fillText(lotteryText, x, y + index * lineHeight);
  });
};

const addPredictionField = () => {
  if (
    (selectedTemplateId.value === 1 && predictionFields.length < 2) ||
    (selectedTemplateId.value === 2 && predictionFields.length < 3) ||
    (selectedTemplateId.value === 3 && predictionFields.length < 4) ||
    (selectedTemplateId.value === 4 && predictionFields.length < 6)
  ) {
    predictionFields.push({ text: "" });
    debouncedDrawImage();
  }
};

const removePredictionField = (index) => {
  if (predictionFields.length > 1) {
    predictionFields.splice(index, 1);
    debouncedDrawImage();
  }
};

const clearAll = () => {
  title.value = "";
  issue.value = "";
  predictionFields.splice(0, predictionFields.length, { text: "" });

  const canvas = imageCanvas.value;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (selectedImage.value) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selectedImage.value;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }
};

const randomizeFields = () => {
  let fieldCount;

  switch (selectedTemplateId.value) {
    case 1:
      fieldCount = 2;
      break; // 2D
    case 2:
      fieldCount = 3;
      break; // 3D
    case 3:
      fieldCount = 4;
      break; // 4D
    case 4:
      fieldCount = 6;
      break; // 6D
    default:
      fieldCount = 6;
      break;
  }

  // 重置并生成相应数量的输入框，每个输入框都有一个随机值
  predictionFields.splice(0, predictionFields.length);
  for (let i = 0; i < fieldCount; i++) {
    predictionFields.push({ text: generateRandomNumber(maxDigits.value) });
  }

  debouncedDrawImage();
};

const generateRandomNumber = (length) => {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");
};

const generateRandomName = () => {
  const randomString = Math.random().toString(36).substring(2, 10); // 生成一个随机的字符串
  return `naki_${randomString}.png`; // 返回拼接后的文件名
};

const downloadImage = () => {
  const canvas = imageCanvas.value;
  const downloadLink = document.createElement("a");
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = generateRandomName();
  downloadLink.click();
};

const getImage = (i) => {
  return new URL(`../../assets/image/gameList/${i}.jpg`, import.meta.url).href;
};

const gameList = reactive([
  { id: 1, image: "2D", code: "ph_2d", gameId: 60 },
  { id: 2, image: "3D", code: "ph_3d", gameId: 61 },
  { id: 3, image: "4D", code: "ph_4d", gameId: 62 },
  { id: 4, image: "6D", code: "ph_6d", gameId: 63 },
]);
</script>

<style scoped lang="scss">
.forecast_box {
  box-sizing: border-box;
  padding: 10px;
  .title {
    color: #fff;
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px dashed #fff;
    margin-bottom: 10px;
  }

  .template {
    display: flex;

    li {
      width: 100px;
      margin: 10px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      img {
        width: 100%;
      }

      &.selected {
        box-shadow: 0 0 10px #000;
      }
    }
  }

  .input-group {
    color: #fff;
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    input {
      color: #000;
      flex: 1;
      padding: 5px;
      margin-right: 5px;
    }

    .number-input {
      width: 100px;
      text-align: center;
    }

    button {
      width: 33px;
      aspect-ratio: 1/1;
      color: #000;
      padding: 5px 10px;
    }
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 10px;

    button {
      margin-left: 10px;
    }
  }
}
// .card{
//   box-sizing: border-box;
//   padding: 10px;
//   width: 343px;
//   margin: 10px auto;
//   background-color: $themebgColor;
//   border-radius: 7px;
// }
</style>
