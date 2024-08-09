<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isActive = ref(false);
const content = ref('');
function handleClick() {
  isActive.value = !isActive.value;
  if (!isActive.value) {
    setTimeout(() => {
      content.value = '';
    }, 500);
  }
}
function handleClickOutside(event) {
  const box = document.querySelector('.search-box');
  if (!box.contains(event.target)) {
    isActive.value = false;
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
  <OtherPageView bg="linear-gradient(90deg, #7d5fff, #7158e2);">
    <template #project>
      <div :class="{ 'search-box': true, active: isActive }">
        <input v-model="content" type="text" class="input" placeholder="Search...">
        <button class="btn" @click="handleClick">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
.search-box {
  font-family: 'Roboto', sans-serif;
  position: relative;
  height: 50px;
}

.search-box .input {
  background-color: #fff;
  border: 0;
  font-size: 18px;
  padding: 15px;
  height: 50px;
  width: 50px;
  transition: width 0.3s ease;
  border-radius: 10px;
}

.btn {
  background-color: #fff;
  border: 0;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 50px;
  transition: transform 0.3s ease;
  border-radius: 10px;
}
.btn:focus, .input:focus {
  outline: none;
}

.search-box.active .input {
  width: 240px;
}
.search-box.active .btn {
  transform: translateX(220px);
}

</style>