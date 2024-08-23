
<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="prevMonth">Previous</button>
      <div>{{ year }} - {{ monthNames[month] }}</div>
      <button @click="nextMonth">Next</button>
    </div>
    <div class="calendar-body">
      <div class="day-names">
        <div v-for="day in weekDays" :key="day">{{ day }}</div>
      </div>
      <div class="days">
        <div
          v-for="day in daysInMonth"
          :key="day.date"
          :class="{'current-day': day.isCurrentDay}"
          @click="selectDay(day.date)"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const date = ref(new Date());
// Fri Aug 23 2024 13:55:58 GMT+0800 (China Standard Time)
const selectedDate = ref(null);

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const year = computed(() => date.value.getFullYear());
const month = computed(() => date.value.getMonth());

const daysInMonth = computed(() => {
  const days = [];
  const firstDay = new Date(year.value, month.value, 1).getDay();
  const lastDate = new Date(year.value, month.value + 1, 0).getDate();
  console.log(firstDay, lastDate);

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year.value, month.value, -i),
      isCurrentDay: false,
    });
  }

  for (let i = 1; i <= lastDate; i++) {
    const currentDate = new Date(year.value, month.value, i);
    days.push({
      date: currentDate,
      isCurrentDay: isToday(currentDate),
    });
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
  date.value = new Date(date.value); // 触发 reactivity
}

function nextMonth() {
  date.value.setMonth(date.value.getMonth() + 1);
  date.value = new Date(date.value); // 触发 reactivity
}
</script>

<style scoped>
.calendar {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #ddd;
}
.calendar-body {
  padding: 10px;
}
.day-names, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.day-names div {
  text-align: center;
  font-weight: bold;
}
.days div {
  text-align: center;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}
.current-day {
  background-color: #007bff;
  color: white;
}
</style>