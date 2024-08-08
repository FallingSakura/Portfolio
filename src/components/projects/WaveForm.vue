<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref } from 'vue';
const email = ref('Email');
const password = ref('Password');

</script>

<template>
  <OtherPageView bg="linear-gradient(135deg, steelblue, lightblue);">
    <template #project>
      <div class="container">
        <h1>Please Login</h1>
        <form>
          <div class="form-control">
            <input id="email" type="text" required>
            <label for="email">
              <span v-for="(letter, index) in email" :key="index" :style="{ '--i': index }">{{ letter }}</span>
            </label>
            
            <!-- <label for="email">
              <span style="--i:0;">E</span>
              <span style="--i:1;">m</span>
              <span style="--i:2;">a</span>
              <span style="--i:3;">i</span>
              <span style="--i:4;">l</span>
            </label> -->
          </div>
          <div class="form-control">
            <input id="password" type="password" required>
            <label for="password">
              <span v-for="(letter, index) in password" :key="index" :style="{ '--i': index }">{{ letter }}</span>
            </label>
            <!-- <label for="password">
              <span style="--i:0;">P</span>
              <span style="--i:1;">a</span>
              <span style="--i:2;">s</span>
              <span style="--i:3;">s</span>
              <span style="--i:4;">w</span>
              <span style="--i:5;">o</span>
              <span style="--i:6;">r</span>
              <span style="--i:7;">d</span>
            </label> -->
          </div>

          <button class="btn">Login</button>

          <p class="text">Don't have an account? <a href="#">Register</a></p>

        </form>
      </div>
    </template>
  </OtherPageView>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');

.container {
  background-color: rgba(0, 0, 0, 0.35);
  color: #fff;
  padding: 20px 40px;
  border-radius: 8px;
  font-family: 'Muli';
}

.container h1 {
  text-align: center;
  user-select: none;
  margin: 30px 0 20px 0;
}

.container a {
  text-decoration: none;
  color: lightblue;
}
.btn {
  cursor: pointer;
  user-select: none;
  display: inline-block;
  width: 100%;
  background: lightblue;
  padding: 15px;
  font-family: inherit;
  font-size: 18px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.821);
  border: 0;
  border-radius: 5px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.text {
  margin: 30px 0 20px 0;
}

.form-control {
  position: relative;
  margin: 20px 0 40px;
  width: 300px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px #fff solid;
  display: block;
  width: 100%;
  padding: 15px 0;
  font-size: 18px;
  color: #fff;
  position: relative;
  z-index: 100;
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: lightblue;
}

.form-control label {
  position: absolute;
  top: 15px;
  left: 0;
  pointer-events: none;
}

.form-control label span {
  display: inline-block;
  font-size: 18px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transition-delay: calc(var(--i) * 50ms);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: lightblue;
  transform: translateY(-30px);
}

</style>
