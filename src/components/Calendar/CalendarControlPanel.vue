<script setup>
import ControlButton from './CalendarControlButton.vue'
import { computed } from 'vue'
const props = defineProps(['reset', 'status', 'toggleStatus'])
const buttons = {
  0: {
    icon: 'fa-solid fa-location-crosshairs',
    fn: props.reset
  },
  1: {
    icon: computed(() => {
      return props.status === 0 ? 'fa-solid fa-toggle-off' : 'fa-solid fa-toggle-on'
    }),
    fn: props.toggleStatus
  }
}
</script>
<template>
  <div class="control">
    <ControlButton
      class="control-button"
      v-for="(button, index) in buttons"
      :key="index"
      :icon="typeof button.icon === `string` ? button.icon : button.icon.value"
      @click="button.fn"
    />
  </div>
</template>
<style scoped>
.control {
  width: 500px;
  height: 70px;
  background-color: #ffffff8d;
  border-radius: 1000px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30px;
  margin-top: 5vh;
  margin-bottom: 20px;
}

.control-button {
  margin-right: 20px;
}

.control-button i {
  transition: all 1s ease;
}
</style>
