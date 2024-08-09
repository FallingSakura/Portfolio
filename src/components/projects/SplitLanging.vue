<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref } from 'vue';

let Left = ref(false);
let Right = ref(false);

const hoverLeft = () => {
  Left.value = true;
};
const leaveLeft = () => {
  Left.value = false;
};

const hoverRight = () => {
  Right.value = true;
};

const leaveRight = () => {
  Right.value = false;
};
</script>
<template>
  <OtherPageView>
    <template #project>
      <div class="project-container">
        <div :class="['container', { 'hover-left': Left, 'hover-right': Right }]">
          <div class="split left" @mouseenter="hoverLeft" @mouseleave="leaveLeft">
            <h1>Playstation 5</h1>
            <a href="#" class="btn">Buy Now</a>
          </div>
          <div class="split right" @mouseenter="hoverRight" @mouseleave="leaveRight">
            <h1>Xbox Series X</h1>
            <a href="#" class="btn">Buy Now</a>
          </div>
        </div>
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
.project-container {
  width: 100%;
  height: 100vh;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: #333;
  font-family: 'Roboto', sans-serif;
}

.split {
  position: absolute;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.split.left {
  left: 0;
  background: url(https://www.gizmochina.com/wp-content/uploads/2020/09/PlayStation-5-e1614159041758.jpg) no-repeat;
  background-size: cover;
}

.split.right {
  right: 0;
  background: url(https://tech-ish.com/wp-content/uploads/2020/12/games_gear_series-x.jpg) no-repeat;
  background-size: cover;
}

.split.left::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(87, 84, 236, 0.7);
}
.split.right::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(43, 43, 43, 0.8);
}

.split.left .btn:hover {
  background-color: rgba(87, 84, 236, 1);
  border-color: rgba(87, 84, 236, 1);
}
.split.right .btn:hover {
  background-color: rgba(28, 122, 28, 1);
  border-color: rgba(28, 122, 28, 1);
}

.split.right,
.split.left,
.split.right::before,
.split.left::before {
  transition: all 1000ms ease-in-out;
}

h1 {
  font-size: 4rem;
  color: #fff;
  position: absolute;
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  white-space: nowrap;
}

.btn {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 50%;
  top: 40%;
  transform: translateX(-50%);
  text-decoration: none;
  color: #fff;
  border: #fff solid 0.2rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  width: 15rem;
  padding: 1.5rem;
}

.hover-left .left {
  width: 75%;
}
.hover-left .right {
  width: 25%;
}

.hover-right .left {
  width: 25%;
}
.hover-right .right {
  width: 75%;
}

@media (max-width: 800px) {
  h1 {
    font-size: 2rem;
    top: 30%;
  }
  .btn {
    padding: 1.2rem;
    width: 12rem;
  }
}
</style>