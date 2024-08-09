<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
</script>
<template>
  <OtherPageView bg="#222">
    <template #project>
      <div class="loading">
        <span style="--i:1;"></span>
        <span style="--i:2;"></span>
        <span style="--i:3;"></span>
        <span style="--i:4;"></span>
        <span style="--i:5;"></span>
        <span style="--i:6;"></span>
        <span style="--i:7;"></span>
        <span style="--i:8;"></span>
        <span style="--i:9;"></span>
        <span style="--i:10;"></span>
        <span style="--i:11;"></span>
        <span style="--i:12;"></span>
        <span style="--i:13;"></span>
        <span style="--i:14;"></span>
        <span style="--i:15;"></span>
        <span style="--i:16;"></span>
        <span style="--i:17;"></span>
        <span style="--i:18;"></span>
        <span style="--i:19;"></span>
        <span style="--i:20;"></span>
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
.loading {
  position: relative;
  display: flex;
  gap: 14px;
}
.loading span {
  position: relative;
  width: 5px;
  height: 20px;
}
.loading span::before {
  content: "";
  position: absolute;
  inset: 0;
  animation: animate 8s linear infinite;
  animation-delay: calc(var(--i) * 0.1s)
}
@keyframes animate {
  0% {
    background: #0f0;
    box-shadow: 0 0 5px #0f0,
    0 0 15px #0f0,
    0 0 30px #0f0,
    0 0 50px #0f0;
    transform: rotate(0deg);
  }
  20% {
    background: #0f0;
    box-shadow: 0 0 5px #0f0,
    0 0 15px #0f0,
    0 0 30px #0f0,
    0 0 50px #0f0;
    transform: rotate(0deg);
  }
  40% {
    background: #0f0;
    box-shadow: 0 0 5px #0f0,
    0 0 15px #0f0,
    0 0 30px #0f0,
    0 0 50px #0f0;
    transform: rotate(90deg);
    filter: hue-rotate(0deg);
  }
  80% {
    background: #0f0;
    box-shadow: 0 0 5px #0f0,
    0 0 15px #0f0,
    0 0 30px #0f0,
    0 0 50px #0f0;
    transform: rotate(90deg);
    filter: hue-rotate(360deg);
  }
  90% {
    background-color: #222;
    box-shadow: none;
    transform: rotate(0deg);
  }
}
</style>