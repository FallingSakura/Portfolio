<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref } from 'vue';

const circles = ref([
  { id: 1, isActive: true },
  { id: 2, isActive: false },
  { id: 3, isActive: false },
  { id: 4, isActive: false },
]);
let currentActive = 1;
let progressWidth = ref('0%');
let prevDisabled = ref(true);
let nextDisabled = ref(false);
function update() {
  circles.value.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.isActive = true;
    } else {
      circle.isActive = false;
    }
  });
  const actives = circles.value.filter((circle) => circle.isActive);
  progressWidth.value = (actives.length - 1) / (circles.value.length - 1) * 100 + '%';
  prevDisabled.value = currentActive === 1;
  nextDisabled.value = currentActive === circles.value.length;
}
function next() {
  currentActive++;
  update();
}
function prev() {
  currentActive--;
  update();
}
</script>

<template>
  <OtherPageView>
    <template #project>
      <div class="container">
        <div class="progress-container">
          <div class="progress" id="progress" :style="{ width: progressWidth }"></div>
          <div :class="['circle', { active: circle.isActive }]" v-for="circle in circles" :key="circle.id">{{ circle.id }}</div>
        </div>

        <button class="btn" id="prev" :disabled="prevDisabled" @click="prev">Prev</button>
        <button class="btn" id="next" :disabled="nextDisabled" @click="next">Next</button>
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
.container {
  font-family: 'Muli', sans-serif;
  text-align: center;
}

.progress-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 30px;
  max-width: 100%;
  width: 350px;
  /* 如果父元素大小大于等于 350，那么子元素不变
      否则适应父元素的宽度 */
}
.progress-container::before {
  content: "";
  background-color: #383838;
  position: absolute;
  top: 50%;
  /* 绝对定位中，顶端在父元素的 50% 位置处
    所以需要 向上平移自身一半的长度，使得居中对齐 */
  transform: translateY(-50%);
  left: 0;
  height: 4px;
  width: 100%;
  z-index: 0;
}

.progress {
  background-color: #3498db;
  height: 4px;
  width: 0%;
  transform: translateY(-50%);
  z-index: 0;
  position: absolute;
  top: 50%;
  left: 0;
  transition: 0.4s ease;
}
.circle {
  background-color: #f1f1f1;
  color: #626262;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #383838;
  transition: 0.4s ease;
  z-index: 1;
}
.circle.active {
  border-color: #3498db;
}

.btn {
  background-color: #3498db;
  color: #fff;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  padding: 8px 30px;
  margin: 5px;
  font-size: 14px;
}
.btn:active {
  transform: scale(0.98);
}
.btn:focus {
  outline: 0;
}
.btn:disabled {
  background-color: #383838;
  cursor: not-allowed;
}
</style>