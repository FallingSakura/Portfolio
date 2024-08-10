<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref } from 'vue';

const showNav = ref(false);

const toggleNav = () => {
  showNav.value = !showNav.value;
};

</script>
<template>
  <OtherPageView bg="#333" :other="{ overflowX: 'hidden' }">
    <template #project>
      <div :class="{ container: true, 'show-nav': showNav }">
        <div class="circle-container">
          <div class="circle">
            <button id="close" @click="toggleNav">
              <i class="fas fa-times"></i>
            </button>
            <button id="open" @click="toggleNav">
              <i class="fas fa-bars"></i>
            </button>
          </div>
        </div>

        <div class="content">
          <h1>Amazing Artivle</h1>
          <small>Florin Pop</small>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit omnis perspiciatis facilis labore sit possimus voluptatibus architecto blanditiis excepturi, amet, maxime consequuntur odio officia. Reprehenderit beatae libero impedit possimus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut tempora voluptatum, possimus molestias ea in unde officiis necessitatibus, eum accusamus voluptas beatae sit adipisci dignissimos iste vitae. Necessitatibus, sapiente maxime? Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit explicabo dolorum fuga reiciendis enim deserunt quidem voluptatibus, obcaecati, tempora labore, iste nostrum eius excepturi perspiciatis ratione eos magnam eveniet saepe!</p>

          <h3>My Dog</h3>
          <img src="https://cdn.pixabay.com/photo/2023/09/19/12/34/dog-8262506_1280.jpg" alt="Dog">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, praesentium. Perspiciatis eum esse natus aliquam, earum rem impedit voluptatibus minima praesentium, dignissimos labore, deserunt dicta similique. Delectus eligendi voluptatum ab.</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci deleniti esse eius, sunt optio iure? Vero culpa, laudantium officia ad mollitia voluptatem, natus rerum ex ipsum omnis deserunt consectetur veniam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi magnam excepturi, minus nobis libero ullam vitae iste at deserunt amet error eligendi nesciunt facilis sunt itaque dolor perspiciatis sapiente ratione.</p>
        </div>
      </div>
      <nav>
        <ul>
          <li><i class="fas fa-home"></i><a href="#"> Home</a></li>
          <li><i class="fas fa-user-alt"></i><a href="#"> About</a></li>
          <li><i class="fas fa-envelope"></i><a href="#"> Contact</a></li>
        </ul>
      </nav>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
h1, h2, h3, h4, h5, h6, p {
  margin: 25px 0;
}
.container {
  background-color: #fafafa;
  transform-origin: top left;
  /* 变换的中心点 */
  transition: transform 0.5s linear;
  width: 100vw;
  color: #222;
  min-height: 100vh;
  padding: 50px;
  font-family: 'Lato', sans-serif;
  /* position: fixed; */
}
.container.show-nav {
  transform: rotate(-20deg);
}
.circle-container {
  position: absolute;
  top: -100px;
  left: -100px;
}

.circle {
  background-color: #ff7979;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  position: relative;
  transition: transform 0.5s linear;
}

.container.show-nav .circle {
  transform: rotate(-70deg);
}

.circle button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 100px;
  background: transparent;
  border: 0;
  font-size: 26px;
  color: #fff;
}
.circle button#open {
  left: 60%;
}
.circle button#close {
  top: 60%;
  transform: rotate(90deg);
  transform-origin: top left;
}
.container.show-nav + nav li {
  transform: translateX(0);
  transition-delay: 0.3s;
}

nav {
  position: fixed;
  bottom: 40px;
  left: 0;
  z-index: 100;
}
nav ul {
  list-style-type: none;
  padding-left: 30px;
}

nav ul li {
  text-transform: uppercase;
  color: #fff;
  margin: 40px 0;
  transform: translateX(-100%);
  transition: transform 0.4s ease-in;
}

nav ul li i {
  font-size: 20px;
  margin-right: 10px;
}

nav ul li + li {
  margin-left: 15px;
  transform: translateX(-150%);
}

nav ul li + li + li {
  margin-left: 30px;
  transform: translateX(-200%);
}

nav a {
  color: #fafafa;
  text-decoration: none;
  transition: all 0.5s;
}

nav a:hover {
  color: #FF7979;
  font-weight: bold;
}

.content img {
  max-width: 60%;
}

.content {
  max-width: 1000px;
  margin: 50px auto;
}

.content h1 {
  margin: 0;
}

.content small {
  color: #555;
  font-style: italic;
}
.content p {
  color: #333;
  line-height: 1.5;
}
</style>