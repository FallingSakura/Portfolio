<script setup>
import { ref, computed, watch } from 'vue';

const date = ref(new Date());
const react = ref(0);
// Fri Aug 23 2024 13:55:58 GMT+0800 (China Standard Time)
const selectedDate = ref(null);

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

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

function selectDay(day) {
  selectedDate.value = day;
  alert(`Selected date: ${day.toDateString()}`);
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
  const title = document.querySelector('.calendar-header h1');
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
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <div class="button" @click="prevMonth">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="date">
        <h2 class="month">{{ monthNames[month] }}</h2>
        <h2 class="year">{{ year }}</h2>
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
          v-for="day in daysInMonth"
          :key="day.date"
          :class="{'current-day': day.isCurrentDay, 'last-month': day.isLastMonth}"
          @click="selectDay(day.date)"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.font.im/css?family=PT+Sans');
.calendar {
  width: 800px;
  border: 1px solid #ddd;
  border-radius: 15px;
  overflow: hidden;
  font-family: 'PT Sans'
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
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
  padding: 20px;
  background-color: #fafafa;
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
  font-size: 2rem;
  font-weight: 700;
}
.current-day {
  background-color: #007bff !important;
  /* border-radius: 999px !important; */
  color: white;
}
.last-month {
  /* color: white; */
  opacity: 0;
}
@media (max-width: 1100px) {
  .calendar {
    width: 600px;
  }
  .days div {
    font-size: 1rem;
  }
  .calendar-header .year {
    font-size: 0.8rem;
  }
  .calendar-header .month {
    font-size: 2rem;
  }
  .calendar-body .days {
    gap: 8px;
  }
}
</style>