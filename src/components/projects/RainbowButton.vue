<script setup>
import OtherPageView from '../../views/OtherPageView.vue';
</script>
<template>
  <OtherPageView bg="#333">
    <template #project>
      <a href="#" class="button1">Hover me</a>
    </template>
  </OtherPageView>
</template>

<style scoped>
.button1 {
  text-decoration: none;
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100px;
  width: 300px;
  transform: translate(-50%, -50%);
  /* 向上向左移动自身尺寸的一半 */
  /* 元素本身是有大小的，所以需要使元素的中心点和父元素的中心点重合，达到居中的效果 */
  font-size: 24px;
  line-height: 100px;
  text-align: center;
  color: #ffffffc5;
  font-weight: 550;
  text-transform: uppercase;
  /* 字母大写 */
  border-radius: 50px;
  user-select: none;
  z-index: 1;
  /* 层叠优先级，数字越大优先级越高 */
  background: linear-gradient(90deg,#68cfff,#ff7fc7,#ffef61,#68cfff);
  background-size: 500%;
  opacity: 1;
  transition: all 0.3s ease;
}
.button1::before {
  content: "";
  position: absolute;
  inset: -5px;
  background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3bf3,#03a9f4);
  background-size: 500%;
  border-radius: 50px;
  z-index: -1;
  filter: blur(20px);
  opacity: 0.8;
  transition: all 0.3s ease;
}
.button1:hover::before {
  animation: sun 8s linear infinite;
  opacity: 1;
  filter: blur(20px);
}
.button1:hover {
  animation: sun 8s linear infinite;
  /* linear 匀速 */
}

@keyframes sun {
  /* 100% {
    background-position: -400% 0;
  } */
  from {
    background-position: 0%;
  }
  to {
    background-position: 500%;
  }
}
</style>