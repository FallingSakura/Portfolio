<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
</script>
<template>
  <OtherPageView bg="linear-gradient(315deg, #131417 0, #1e1f26 74%)">
    <template #project>
      <div class="container">
        <div class="box">
          <span></span>
          <div class="content">
            <h2>Card #1</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestias dolorum animi quaerat necessitatibus laudantium repellat aut ullam fuga officiis, corrupti a rem autem culpa aperiam quas odit blanditiis consectetur?</p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div class="box">
          <span></span>
          <div class="content">
            <h2>Card #2</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestias dolorum animi quaerat necessitatibus laudantium repellat aut ullam fuga officiis, corrupti a rem autem culpa aperiam quas odit blanditiis consectetur?</p>
            <a href="#">Read More</a>
          </div>
        </div>
        <div class="box">
          <span></span>
          <div class="content">
            <h2>Card #3</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad molestias dolorum animi quaerat necessitatibus laudantium repellat aut ullam fuga officiis, corrupti a rem autem culpa aperiam quas odit blanditiis consectetur?</p>
            <a href="#">Read More</a>
            </div>
        </div>
      </div>
    </template>
  </OtherPageView>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px 0;
}
.box {
  position: relative;
  display: flex;
  width: 320px;
  height: 400px;
  justify-content: center;
  align-items: center;
  margin: 40px 30px;
  transition: 0.5s;
}
.content {
  position: relative;
  left: 0;
  padding: 20px 40px;
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 1;
  transition: 0.5s; 
}

.content h2 {
  font-size: 2em;
  color: #fff;
  margin-bottom: 10px;
  font-family: consolas;
}
.content p {
  font-family: consolas;
  font-size: 1.1em;
  margin-bottom: 10px;
  line-height: 1.4em;
}
.content a {
  display: inline-block;
  font-size: 1.1em;
  color: #111;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 700;
  margin-top: 5px;
  transition: 0.6s;
}
.box:hover .content {
  left: -25px;
  padding: 60px 40px;
  /* 向左移动并拉长 */
}
.content a:hover {
  background: #222;
  color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 15px #222;
}
/* 后面的条带及阴影 */
.box::before {
  content: "";
  position: absolute;
  background: #fff;
  top: -30px;
  left: 70px;
  width: 50%;
  height: 120%;
  text-decoration: none;
  border-radius: 8px;
  transform: skew(15deg);
  transition: 0.5s;
}
.box::after {
  content: "";
  position: absolute;
  background: #fff;
  top: -30px;
  left: 70px;
  width: 50%;
  height: 120%;
  border-radius: 8px;
  transform: skew(15deg);
  filter: blur(30px);
  transition: 0.5s;
}

.box:hover::before,
.box:hover::after {
  transform: skew(0deg);
  left: 20px;
  /* 向右平移 */
  width: calc(100% - 90px);
  /* 宽度变为盒子-90px */
}
.box:nth-child(1)::before,
.box:nth-child(1)::after {
  background: linear-gradient(315deg, #ff6a00, #ee0979);
}
.box:nth-child(2)::before,
.box:nth-child(2)::after {
  background: linear-gradient(315deg, #654ea3, #ee9ca7);
}
.box:nth-child(3)::before,
.box:nth-child(3)::after {
  background: linear-gradient(315deg, #4dff03, #00d0ff);
}

/* span 用来写两个装饰小块 */

.box span {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}
.box span::before {
  content: "";
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
  transition: 0.3s;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  animation: animate 2s ease-in-out infinite;
}
.box:hover span::before {
  opacity: 1;
  top: -80px;
  left: 10px;
  width: 100px;
  height: 100px;
}
.box span::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  opacity: 0;
  transition: 0.5s;
  backdrop-filter: blur(10px);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  animation: animate 2s ease-in-out infinite;
  animation-delay: -1s;
}
.box:hover span::after {
  bottom: -50px;
  right: 50px;
  width: 100px;
  height: 100px;
  opacity: 1;
}
@keyframes animate {
  0%,
  100% {
    transform: translate(10px);
  }
  50% {
    transform: translate(-10px);
  }
}
</style>