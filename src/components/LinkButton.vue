<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '/'
  },
  title: {
    type: String,
    default: 'Title'
  },
  description: {
    type: String,
    default: ''
  },
  img: {
    type: String,
    default: ''
  }
})
</script>
<template>
  <router-link :class="{ 'link-button': true, 'have-img': props.img }" :to="props.src">
    <h2>{{ props.title }}</h2>
    <p v-if="props.description">{{ props.description }}</p>
    <img :src="props.img" v-if="props.img" />
  </router-link>
</template>
<style scoped>
.link-button {
  position: relative;
  height: fit-content;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px 15px;
  font-size: 1rem;
  color: #333;
  background-color: #ffffff78;
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  transition: all 0.4s ease;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  user-select: none;
}
.link-button:hover {
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}
.link-button:not(.have-img):active {
  transition: all 0.3s ease;
  background-color: #111;
  color: #fff;
  border: none;
  border-radius: 9999px;
  transform: translateY(2px) scale(0.95);
}
.link-button img {
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
}
.link-button.have-img {
  padding: 15px;
}
@media (max-width: 1200px) {
  .link-button {
    font-size: 0.8rem;
  }
}
@media (max-width: 700px) {
  .link-button {
    font-size: 0.7rem;
    width: 430px;
    padding: 20px 10px;
  }
  .link-button.have-img {
    width: 430px;
    padding: 10px;
  }
}
</style>
