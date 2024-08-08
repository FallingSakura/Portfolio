<script setup>
import LinkButton from '../components/LinkButton.vue'
import cardList from '../data/cardList.js'
const cards = [...cardList];
[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}].forEach((item, index) => {
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
        <div class="flex-container">
          <LinkButton v-for="(card, index) in cards" :src="card.src" :key="index"  
            :title="card.title" :description="card.description">
          </LinkButton>
        </div>
      </div>
    </div>
    <div class="footer">
      <h2>*Not mobile-friendly</h2>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
.body {
  min-height: 100vh;
  width: 100%;
  /* background-color: #fffaee; */
  background: linear-gradient(135deg, #fef, #efe);
}
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 10vh;
}
.header h1 {
  font-size: 3rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #333;
  letter-spacing: 8px;
}
.header h1::after {
  content: '';
  display: block;
  width: 100%;
  margin: auto;
  height: 0px;
  box-shadow: 0px 0px 10px 1px #333;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  padding-top: 5vh;
}
.content-container {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: all 0.2s ease;
  overflow: scroll;
}
/* .content-container:hover {
  border: 1px solid #3333339d;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px #3333339d;
} */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 20px;
  padding: 30px 50px;
}
.footer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
.footer h2 {
  font-size: 0.7rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #3333337a;
  position: absolute;
  bottom: 10px;
  right: 25px;
  opacity: 0;
}
@media (max-width: 1200px) {
  .header h1 {
    font-size: 2.5rem;
  }
  .content-container {
    width: 98%;
  }
}
@media (max-width: 600px) {
  .flex-container {
    padding: 10px;
    gap: 10px;
  }
  .header h1 {
    font-size: 2rem;
  }
  .footer h2 {
    opacity: 1;
  }
}
</style>