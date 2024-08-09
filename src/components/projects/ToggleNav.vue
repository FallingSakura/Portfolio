<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref } from 'vue';

const isActive = ref(false);
const list = ref([
  { name: 'Dashboard', icon: 'fa-solid fa-grip-vertical', style: '--i:1;', isActive: true },
  { name: 'User', icon: 'fa-solid fa-user', style: '--i:2;', isActive: false },
  { name: 'Messages', icon: 'fa-solid fa-message', style: '--i:3;', isActive: false },
  { name: 'Analytics', icon: 'fa-solid fa-chart-pie', style: '--i:4;', isActive: false },
  { name: 'File Manager', icon: 'fa-solid fa-folder-closed', style: '--i:5;', isActive: false },
  { name: 'Order', icon: 'fa-solid fa-shop', style: '--i:6;', isActive: false },
  { name: 'Saved', icon: 'fa-solid fa-heart', style: '--i:7;', isActive: false },
  { name: 'Setting', icon: 'fa-solid fa-gear', style: '--i:8;', isActive: false },
]);
const fn = (index) => {
  list.value.forEach((item) => {
    item.isActive = false;
  });
  list.value[index].isActive = true;
};
const toggleNav = () => {
  isActive.value = !isActive.value;
  if (!isActive.value) {
    list.value.forEach((item) => {
      item.isActive = false;
    });
    list.value[0].isActive = true;
  }
};
</script>
<template>
  <OtherPageView bg="url(../../src/assets/img/background.jpg)">
    <template #project>
      <div :class="{ sidebar: true, active: isActive }">
        <div class="logo-menu">
          <h2 class="logo">FallingSakura</h2>
          <i @click="toggleNav" class="fa-solid fa-bars toggle-btn"></i>
        </div>
        <ul class="list">
          <li @click="fn(index)" :class="{ 'list-items': true, active: item.isActive }" v-for="(item, index) in list" :key="item.name">
            <a href="#">
              <i :class="item.icon"></i>
              <span class="link-name" :style="item.style">{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 100%;
  background: transparent;
  backdrop-filter: blur(40px);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 6px 14px;
  transition: 0.5s;
  font-family: 'Poppins', sans-serif;
}

.sidebar.active {
  width: 260px;
}

.sidebar .logo-menu {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
}

.sidebar .logo-menu .logo {
  font-size: 25px;
  color: #fff;
  pointer-events: none;
  opacity: 0;
  transition: 0.3s;
}
.sidebar.active .logo-menu .logo {
  opacity: 1;
  transition-delay: 0.2s;
}

.sidebar .logo-menu .toggle-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  font-size: 22px;
  color: #fff;
  text-align: center;
  /* **** */
  line-height: 40px;
  cursor: pointer;
  transition: 0.5s;
}
.sidebar.active .logo-menu .toggle-btn {
  left: 90%;
}
.sidebar .list {
  margin-top: 10px;
}

.list  .list-items {
  list-style: none;
  width: 100%;
  height: 50px;
  margin: 5px 0;
}

.sidebar.active .list .list-items.active a,
.sidebar.active .list .list-items a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.list .list-items a {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #fff;
  text-decoration: none;
  border-radius: 15px;
  transition: 0.5s;
  white-space: nowrap;
  /* 不换行 */
}

.list .list-items a i {
  min-width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
}

.sidebar .link-name {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}
.sidebar.active .link-name {
  opacity: 1;
  pointer-events: auto;
  transition-delay: calc(var(--i) * 0.1s);
}
</style>