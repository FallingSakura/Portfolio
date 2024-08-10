<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref, onMounted } from 'vue';
const list = Array.from({ length: 10 }, () => ({}));
const items = ref(list.map(item => ({...item})));
const itemStyles = ref(list.map(item => ({...item})));
const bgStyles = ref(list.map(item => ({...item})));
const frameStyles = ref(list.map(item => ({...item})));
const shellSliderStyle = ref({ transform: ''});
let bg = ref('');
let width, height, totalWidth, margin = 20,
  currIndex = 0,
  interval, intervalTime = 3000;

function init() {
  // 初始化函数
  resize();
  move(Math.floor(items.value.length / 2));
  bindEvents();
  timer();
}
function resize() {
  // 窗口大小变化时调整大小
  // 20vh or 275px
  width = Math.max(window.innerWidth * .2, 275);
  // 50vh
  height = window.innerHeight * .5;
  totalWidth = width * items.value.length;
  // 设置slider宽度
  shellSliderStyle.value.width = totalWidth + "px";
  // 设置每个item的宽度和高度
  for (let i = 0; i < items.value.length; i++) {
    itemStyles.value[i].width = (width - (margin * 2)) + "px";
    itemStyles.value[i].height = height + "px";
  }
}

function bindEvents() {
  window.onresize = resize;
}

function move(index) {
  // 移动shell到指定的item
  if (index < 1) index = items.value.length;
  if (index > items.value.length) index = 1;
  currIndex = index;
  // 遍历所有item
  for (let i = 0; i < items.value.length; i++) {
    let item = items.value[i];
    if (i == (index - 1)) {
      // 当前item添加active类并设置3D效果
      item.active = true;
      frameStyles.value[i].transform = "perspective(1200px)";
    } else {
      // 其他item移除active类并设置3D效果
      item.active = false;
      frameStyles.value[i].transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 36 : -36) + "deg)";
    }
  }
  // 移动slider
  shellSliderStyle.value.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
  // 设置body背景图片
  bg.value = bgStyles.value[index - 1].backgroundImage;
}
function timer() {
  // 定时器，自动切换shell
  clearInterval(interval);
  interval = setInterval(() => {
    move(++currIndex);
  }, intervalTime);
}
// 切换item
function prev() {
  move(--currIndex);
  timer();
}
function next() {
  move(++currIndex);
  timer();
}

onMounted(() => {
  for (let i = 0; i < items.value.length; i++)
  {
    bgStyles.value[i].backgroundImage = `url(../../src/assets/img/${i.toString().padStart(2, '0')}.jpg)`;
  }
  init();
});
</script>
<template>
  <OtherPageView>
    <template #project>
      <div class="container" :style="{ backgroundImage: bg }">
        <div class="shell">
          <div class="shell_body">
            <div class="button">
              <div class="prev" @click="prev"><i class="fa-solid fa-chevron-left"></i></div>
              <div class="next" @click="next"><i class="fa-solid fa-chevron-right"></i></div>
            </div>
            <div class="shell_slider" :style="shellSliderStyle">
              <div :style="itemStyles[index]" class="item" v-for="(item, index) in items" :key="index" :class="{ 'item--active': item.active }">
                <div class="frame" :style="frameStyles[index]">
                  <div class="box front" :style="bgStyles[index]">
                    <h1>{{ 2014 + index }}</h1>
                    <span>{{ `- In the year ${2014 + index} -` }}</span>
                  </div>
                  <div class="box left" :style="bgStyles[index]"></div>
                  <div class="box right" :style="bgStyles[index]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400&display=swap);
.container {
  font-family: 'Source Sans Pro', sans-serif;
  overflow: hidden;
  width: 100%;
  height: 100vh;
  transition: background-image 1.5s ease;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.shell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: rgba(99, 99, 99, 0.7);
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -250px;
}

.prev, .next {
  transition: transform 0.25s ease;
  z-index: 999;
  bottom: 5px;
}

.prev i, .next i {
  margin: 120px;
  font-size: 90px;
  color: #fff;
  cursor: pointer;
  text-shadow: 0 0 10px #ffffff;
} 

.shell_body {
  width: 100%;
  transform: scale(.8);
  padding: 20px 0 150px 0;
}

.shell_slider {
  position: relative;
  transition: transform 1s ease-in-out;
  background: transparent;
}

.item {
  position: relative;
  float: left;
  margin: 0 20px;
}

.frame {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s ease-in-out;
  transform-style: preserve-3d;
}

.frame:after {
  content: "";
  position: absolute;
  bottom: -16%;
  width: 100%;
  height: 60px;
  background: #ffffff1c;
  box-shadow: 0 0 15px 5px #ffffff1c;
  transform: rotateX(90deg) translate3d(0px, -20px, 0px);
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  perspective: 1000px;
  transform-style: preserve-3d;
}

.box h1, .box span {
  color: #fff;
  transform: translateZ(20px);
}

.box h1 {
  text-shadow: 0 0 30px #780fcd;
  font-size: 100px;
}

.box span {
  position: absolute;
  bottom: 20px;
  padding: 0 25px;
  text-shadow: 0 0 10px #b405ab;
}

.front, .left, .right {
  box-shadow: 0 0 50px #ffffff;
  background-size: cover;
}

.right, .left {
  top: 0;
  width: 60px;
  backface-visibility: hidden;
}

.left {
  left: 0;
  border-left-width: 5px;
  transform: translate3d(1px, 0, -60px) rotateY(-90deg);
  transform-origin: 0%;
}

.right {
  right: 0;
  border-right-width: 5px;
  transform: translate3d(-1px, 0, -60px) rotateY(90deg);
  transform-origin: 100%;
}
</style>