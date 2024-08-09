<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref, onMounted } from 'vue';

const boxes = ref([
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
  { id: 15 },
  { id: 16 },
  { id: 17 },
  { id: 18 },
  { id: 19 },
  { id: 20 },
]);
const checkBoxes = () => {
  const boxesElements = document.querySelectorAll('.box');
  boxesElements.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < window.innerHeight / 5 * 4) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
};
onMounted(() => {
  checkBoxes();
  window.addEventListener('scroll', checkBoxes);
});
</script>
<template>
  <OtherPageView bg="#efedd6" :other="{ overflowX: 'hidden' }">
    <template #project>
      <div class="container">
        <h2>Scroll to see the Animation</h2>
        <div class="box" v-for="box in boxes" :key="box.id">
          <h3>{{ `Box ${box.id}` }}</h3>
        </div>
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.container {
  font-family: 'Roboto', sans-serif;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  overflow-x: hidden;
}
h2 {
  color: #333;
  margin: 10px;
}

.box {
  background-color: rgb(113, 164, 205);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 200px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.3);
  transform: translateX(400%);
  transition: transform 0.5s ease;
}

.box:nth-of-type(even) {
  transform: translateX(-400%);
}

.box.show {
  transform: translateX(0);
}

.box h3 {
  font-size: 45px;
}
</style>