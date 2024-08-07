<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref } from 'vue';

const loadingText = ref('Loading...');
const loading = ref({ opacity: 1 });
const bg = ref({ filter: 'blur(0px)' });

let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
  load++;
  if (load > 99) {
    clearInterval(int);
  }
  loadingText.value = `${load}%`;
  loading.value.opacity = scale(load, 0, 100, 1, 0);
  bg.value.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

</script>
<template>
  <OtherPageView>
    <template #project>
      <section class="bg" :style="bg"></section>
      <div class="loading-text" :style="loading">{{ loadingText }}</div>
    </template>
  </OtherPageView>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Ubuntu');
.bg {
  background: url(../../assets/286264.jpg) no-repeat center/cover;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 0;
}
.loading-text {
  color: white;
  font-size: 50px;
  font-family: 'Ubuntu', sans-serif;
  z-index: 1;
}
</style>