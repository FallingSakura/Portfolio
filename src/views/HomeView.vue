<script setup>
import LinkButton from '../components/LinkButton.vue'
import cardList from '../../public/cardList.js'
const cards = [...cardList];
[{},{},{},{},{},{},{},{},{},{},{}].forEach((item, index) => {
  cards.push({
    ...item,
    title: `Card ${index + 1}`
  });
})
</script>

<template>
  <div class="body">
    <div class="header">
      <h1>Falling Web</h1>
    </div>
    <div class="content">
      <div class="content-container">
        <LinkButton v-for="(card, index) in cards" :src="card.src" :key="index"  
          :title="card.title" :description="card.description">
        </LinkButton>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<style scoped>
.body {
  min-height: 100vh;
  width: 100%;
  /* background-color: #fffaee; */
  background: linear-gradient(135deg, #fef, #efe);
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
.header h1 {
  font-size: 2.5rem;
}
.content {
  padding: 50px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 90vh;
}
.content-container {
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  gap: 20px;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
</style>