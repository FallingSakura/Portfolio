<script setup>
const props = defineProps({
  src: {
    type: String,
    default: '#',
  },
  title: {
    type: String,
    default: 'Title',
  },
  description: {
    type: String,
    default: '',
  },
})

</script>
<template>
  <router-link class="link-button" :to="props.src">
    <h2>{{ props.title }}</h2>
    <p>{{ props.description }}</p>
  </router-link>
</template>
<style scoped>
.link-button {
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 25px;
  font-size: 1rem;
  color: #333;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.link-button:hover {
  background-color: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>