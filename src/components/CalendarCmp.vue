<script setup>
import { ref, computed, watch, onMounted } from 'vue';

const ip = 'localhost';
const date = ref(new Date());
const react = ref(0);
let dataStore = ref(new Map());

onMounted(() => {
  fetch(`http://${ip}:3000/get-data`).then(response => response.json()) // json
  .then(data => {
    dataStore.value = new Map(Object.entries(data));
  }).then(() => {
    
  })
  .catch(error => console.log('Error fetching data:', error));
})
// Fri Aug 23 2024 13:55:58 GMT+0800 (China Standard Time)

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
// console.log(date.value.getTime());
const year = computed(() => date.value.getFullYear());
// 2024
const month = computed(() => date.value.getMonth());
// 08 - 7 
class Day { 
  constructor(date, isCurrentDay = false, isLastMonth = false) {
    this.date = date;
    this.isCurrentDay = isCurrentDay;
    this.isLastMonth = isLastMonth;
  }
}

const daysInMonth = computed(() => {
    const days = [];
    const firstDay = new Date(year.value, month.value, 1).getDay();
    const lastDate = new Date(year.value, month.value + 1, 0).getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(new Day(new Date(year.value, month.value, -i), false, true));
    }

    for (let i = 1; i <= lastDate; i++) {
      const currentDate = new Date(year.value, month.value, i);
      days.push(new Day(currentDate, isToday(currentDate)));
    }
    return days;
});


function isToday(date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}
function getDateKey(dateEl) {
  const day = (dateEl instanceof Date) ? dateEl : daysInMonth.value[dateEl].date;
  return `${day.getFullYear()}${String(day.getMonth() + 1).padStart(2, '0')}${String(day.getDate()).padStart(2, '0')}`
}

function prevMonth() {
  date.value.setMonth(date.value.getMonth() - 1);
  // date.value = new Date(date.value); // 触发 reactivity
  react.value--;
}

function nextMonth() {
  date.value.setMonth(date.value.getMonth() + 1);
  // date.value = new Date(date.value); // 触发 reactivity(watch)
  react.value++;
}
watch(react, () => {
  const body = document.querySelector('.days');
  const title = document.querySelector('.calendar-header .date');
  body.style.transition = 'filter 0.3s ease';
  title.style.transition = 'opacity 0.3s linear';
  body.style.filter = 'blur(30px)';
  title.style.opacity = '0';
  setTimeout(() => {
    body.style.filter = 'blur(0px)';
    title.style.opacity = 1;
    date.value = new Date(date.value);
  }, 400);
});
function addIndex(index) {
  const timeIndex = getDateKey(index);
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === 3) return;
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) + 1);
    if (dataStore.value.get(timeIndex) === 0) dataStore.value.delete(timeIndex);
  }
  else dataStore.value.set(timeIndex, 1);
  updateData(timeIndex, dataStore.value.get(timeIndex));
}
function minusIndex(index) {
  const timeIndex = getDateKey(index);
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === -3) return;
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) - 1);
    if (dataStore.value.get(timeIndex) === 0) dataStore.value.delete(timeIndex);
  }
  else dataStore.value.set(timeIndex, -1);
  updateData(timeIndex, dataStore.value.get(timeIndex));
}
function getBackGroundColor(index) {
  const timeIndex = getDateKey(index);
  if(!dataStore.value.has(timeIndex)) return;
  const color = ref('');
  switch (dataStore.value.get(timeIndex)) {
    case 1: color.value = '#40E0D0 !important'; break;
    case 2: color.value = '#FF8C00 !important'; break;
    case 3: color.value = '#FF0080 !important'; break;
    case 0: color.value = ''; break;
    case -1: color.value = '#4B79A1 !important'; break;
    case -2: color.value = '#036 !important'; break;
    case -3: color.value = '#222 !important'; break;
  }
  return color.value;
}
function getFontColor(index) {
  const timeIndex = getDateKey(index);
  if (!dataStore.value.has(timeIndex)) return;
  const color = ref('');
  if (dataStore.value.get(timeIndex) < 0) color.value = '#fff';
  return color.value;
}
function updateData(key, value) {
  fetch(`http://${ip}:3000/update-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries([[`${key}`, value]])),
  })
  .then(res => res.text()).then(data => data)
  .catch(error => console.log('Error:', error));
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="date">
        <h2 class="month">{{ monthNames[month] }}</h2>
        <h2 class="year">{{ year }}</h2>
      </div>
      <div class="button" @click="prevMonth">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="button" @click="nextMonth">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <div class="calendar-body">
      <div class="day-names">
        <div v-for="day in weekDays" :key="day">{{ day }}</div>
      </div>
      <div class="days">
        <div
          v-for="(day, index) in daysInMonth"
          :key="day.date"
          :class="{'current-day': day.isCurrentDay, 'last-month': day.isLastMonth}"
          @click="addIndex(index)"
          @contextmenu.prevent="minusIndex(index)"
          :style="{ backgroundColor: getBackGroundColor(index), color: getFontColor(index) }"
        >
          {{ day.date.getDate() }}
          <small>{{ dataStore.get(getDateKey(index)) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.font.im/css?family=PT+Sans');
.calendar {
  width: 800px;
  /* border: 1px solid #ddd; */
  border-radius: 15px;
  overflow: hidden;
  font-family: 'PT Sans';
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  background-color: #ececec;
  /* border-bottom: 1px solid #ddd; */
}

.calendar-header .year {
  font-size: 1.2rem;
  margin-left: 10px;
  letter-spacing: 2px;
}
.calendar-header .month {
  font-size: 2.4rem;
  letter-spacing: 2px;
  margin-left: 15px;
}
.calendar .date {
  flex: 1;
  display: flex;
  align-items: baseline;
}
.calendar-header .button {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
}

.calendar-header button {
  border: none;
}
.calendar-body {
  padding: 30px 50px 50px;
  background-color: #f7f7f7;
  /* filter: blur(30px); */
}
.day-names, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px;
}
.days {
  margin-top: 25px;
}
.day-names div {
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  letter-spacing: 3px;
  user-select: none;
}
.days div {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
  text-align: center;
  padding: 5px;
  border-radius: 12px;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #dddddd96;
  font-size: 2rem;
  font-weight: 700;
  user-select: none;
  position: relative;
}
.days small {
  position: absolute;
  top: 3px;
  right: 6px;
  font-size: 0.9rem;
  opacity: 0.6;
}
.current-day {
  background-color: #007bff !important;
  box-shadow: 0 0 8px 1px rgb(187, 187, 187);
  /* border-radius: 999px !important; */
  color: #fff;
}
.last-month {
  /* color: white; */
  opacity: 0;
}
@media (max-width: 1100px) {
  .calendar {
    width: 600px;
  }
  .calendar-header {
    padding: 10px;
  }
  .calendar-body {
    padding: 20px;
  }
  .days div {
    font-size: 1.4rem;
  }
  .day-names div {
    font-size: 1.2rem;
  }
  .calendar-header .year {
    font-size: 1rem;
  }
  .calendar-header .month {
    font-size: 2rem;
  }
  .calendar-body .days {
    gap: 10px;
  }
  .calendar-header .button {
    font-size: 1.4rem;
  }
}
@media (max-width: 600px) {
  .calendar {
    width: 95vw;
  }
  .calendar-body {
    padding: 15px;
  }
  .days, .day-names {
    gap: 5px !important;
  }
  .days {
    margin-top: 15px;
  }
  .days div {
    border-radius: 10px;
    font-size: 1.2rem;
  }
  .days small {
    display: none;
  }
  .day-names div {
    font-size: 1rem;
  }
  .calendar-header .month {
    font-size: 1.6rem;
  }
  .calendar-header .year {
    font-size: 0.8rem;
  }
  .calendar-body .days {
    gap: 10px;
  }
  .calendar-header .button {
    width: 30px;
    height: 30px;
    font-size: 1.4rem;
  }
}
</style>