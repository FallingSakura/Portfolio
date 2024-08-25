<script setup>
const emits = defineEmits(['locate']);
function reset() {
  emits('locate');
}

</script>
<template>
  <div @click="reset" class="button">
    <i class="fa-solid fa-location-crosshairs"></i>
  </div>
</template>

<style scoped>
.button {
  width: 50px;
  height: 50px;
  background-color: #fff;
  text-align: center;
  line-height: 50px;
  border-radius: 15px;
  font-size: 1.3rem;
  cursor: pointer;
}
</style>