<script setup>
import LinkButton from '../components/LinkButton.vue'
import cardList from '../data/cardList.js'
const cards = [...cardList];
const demoCards = Array(20).fill({});

cards[0].img = 'https://dummyimage.com/600x400/222/fff';
for (let i = 0; i < cards.length; i++) {
  if (cards[i].img) {
    cards.push(cards[i]);
    cards.splice(i, 1);
  }
}
cards.reverse();

demoCards.forEach((item, index) => {
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
            :title="card.title" :description="card.description" :img="card.img">
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
  background: linear-gradient(45deg, #654ea3, #eaafc8);
}
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 10vh;
}
.header h1 {
  position: relative;
  font-size: 3.5rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 600;
  font-style: normal;
  color: #ffffff;
  letter-spacing: 6px;
}
.header h1::after {
  content: '';
  display: block;
  position: absolute;
  bottom: -10px;
  width: 100%;
  margin: auto;
  height: 0px;
  box-shadow: 0px 0px 10px 3px #f7f7f7;
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
  width: 70%;
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
  padding: 30px 0;
  align-items: flex-end;
  justify-content: center;
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