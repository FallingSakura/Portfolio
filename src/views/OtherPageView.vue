<script setup>
import LinkButton from '../components/LinkButton.vue';
const props = defineProps({
  bg: {
    type: String,
    default: "#fafafa"
  },
  other: {
    type: Object,
    default: () => ({})
  }
})

</script>

<template>
  <div class="o-container" :style="{ background: props.bg, ...props.other }">
    <div class="o-content">
      <slot name="project"></slot>
    </div>
    <div class="o-footer">
      <link-button src="/" title="Back to Home" class="home-btn">Home</link-button>
    </div>
  </div>
</template>

<style scoped>
.o-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  z-index: -1;
}

.o-content {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.o-footer .home-btn {
  z-index: 1;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

/* .o-footer {
  display: flex;
  height: 100px;
  justify-content: flex-start;
  align-items: center;
  padding: 0 20px;
} */
</style>