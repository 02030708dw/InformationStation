<template>
  <div class="forecast_box">
    <div class="title">选择模板</div>
    <ul class="template">
      <li
        v-for="item in gameList"
        :key="item.id"
        @click="selectTemplate(item)"
        :class="{ selected: selectedTemplateId === item.id }"
      >
        <div>
          <img :src="getImage(item.image)" alt="" />
        </div>
      </li>
    </ul>

    <div class="title">编辑文本</div>
    <div class="input-group">
      <label>标题：</label>
      <input type="text" v-model="title" @input="debouncedDrawImage" />
    </div>
    <div class="input-group">
      <label>奖期：</label>
      <input type="text" v-model="issue" @input="debouncedDrawImage" />
    </div>

    <div class="title">编辑预测号码</div>
    <div
      v-for="(field, index) in predictionFields"
      :key="index"
      class="input-group"
    >
      <input
        type="text"
        v-model="field.text"
        @input="debouncedDrawImage"
        :maxlength="maxDigits"
        class="number-input"
      />
      <button @click="removePredictionField(index)">-</button>
      <button
        v-if="index === predictionFields.length - 1"
        @click="addPredictionField"
      >
        +
      </button>
    </div>

    <div class="title btn">
      <span>预览</span>
      <div>
        <button style="padding: 5px" @click="randomizeFields">随机</button>
        <button style="padding: 5px" @click="clearAll">清空</button>
        <button style="padding: 5px" @click="downloadImage">下载</button>
      </div>
    </div>

    <canvas
      class="canvas_box"
      ref="imageCanvas"
      width="355"
      height="340"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { debounce } from "lodash"; // 引入 lodash 的防抖函数

const imageCanvas = ref(null);
const selectedImage = ref(null);
const selectedTemplateId = ref(null);

// 编辑文本的默认值
const title = ref("");
const issue = ref("");

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

const selectTemplate = (item) => {
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

  // 重新绘制模板图片，使用防抖方法
  debouncedDrawImage();
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

const downloadImage = () => {
  const canvas = imageCanvas.value;
  const downloadLink = document.createElement("a");
  downloadLink.href = canvas.toDataURL("image/png");
  downloadLink.download = "edited_image.png";
  downloadLink.click();
};

const getImage = (i) => {
  return new URL(`../../assets/image/gameList/${i}.jpg`, import.meta.url).href;
};

const gameList = reactive([
  { id: 1, image: "2D", code: "ph_2d" },
  { id: 2, image: "3D", code: "ph_3d" },
  { id: 3, image: "4D", code: "ph_4d" },
  { id: 4, image: "6D", code: "ph_6d" },
]);
</script>

<style scoped lang="scss">
.forecast_box {
  box-sizing: border-box;
  padding: 10px;

  .title {
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
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    input {
      flex: 1;
      padding: 5px;
      margin-right: 5px;
    }

    .number-input {
      width: 100px;
      text-align: center;
    }

    button {
      padding: 5px 10px;
    }
  }

  .canvas_box {
    // border: 1px solid red;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
