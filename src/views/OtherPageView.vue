<script setup>
import LinkButton from '../components/LinkButton.vue';
const props = defineProps({
  bgColor: {
    type: String,
    default: "#fafafa"
  }
})
const style = {
  backgroundColor: props.bgColor,
}

</script>

<template>
  <div class="container" :style="style">
    <div class="content">
      <slot name="project"></slot>
    </div>
    <div class="footer">
      <link-button src="/" title="Back to Home" class="home-btn">Home</link-button>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.home-btn {
  z-index: 1;
}

.footer {
  display: flex;
  height: 100px;
  justify-content: center;
  align-items: center;
}
</style>