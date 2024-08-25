<script setup>
import OtherPageView from '@/views/OtherPageView.vue';
import { ref, computed, watch, onMounted } from 'vue';
import Calendar from '../CalendarCmp.vue'
import LocateButton from '../CalendarLocate.vue'

const ip = 'localhost';
const date = ref(new Date());
let react = ref(0);
let dataStore = ref(new Map());

onMounted(() => {
  // .json() 将 JSON 字符串转换为 JS 对象
  fetch(`http://${ip}:3000/get-data`).then(response => response.json()) // json
  .then(data => {
    dataStore.value = new Map(Object.entries(data));
  }).then(() => {
    
  })
  .catch(error => console.log('Error fetching data:', error));

  // dataStore.value = new Map(Object.entries(JSONData));
})
// Fri Aug 23 2024 13:55:58 GMT+0800 (China Standard Time)

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

function reset() {
  if (react.value === 0) return;
  react.value = 0;
  setTimeout(() => {
    date.value = new Date();
  }, 500);
}
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
function addIndex(index, isLastMonth = false) {
  if (isLastMonth) return;
  const timeIndex = getDateKey(index);
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === 3) return;
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) + 1);
    if (dataStore.value.get(timeIndex) === 0) {
      dataStore.value.delete(timeIndex);
      updateData(timeIndex, null);
      return
    }
  }
  else dataStore.value.set(timeIndex, 1);
  updateData(timeIndex, dataStore.value.get(timeIndex));
}
function minusIndex(index, isLastMonth = false) {
  if (isLastMonth) return;
  const timeIndex = getDateKey(index);
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === -3) return;
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) - 1);
    if (dataStore.value.get(timeIndex) === 0) {
      dataStore.value.delete(timeIndex);
      updateData(timeIndex, null);
      return
    }
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
  <OtherPageView>
    <template #project>
      <div class="body">
        <div class="control">
          <LocateButton @locate="reset" />
        </div>
        <Calendar
        :monthNames="monthNames"
        :month="month"
        :year="year"
        :prevMonth="prevMonth"
        :nextMonth="nextMonth"
        :weekDays="weekDays"
        :daysInMonth="daysInMonth"
        :addIndex="addIndex"
        :minusIndex="minusIndex"
        :getBackgroundColor="getBackGroundColor"
        :getFontColor="getFontColor"
        :getDateKey="getDateKey"
        :dataStore="dataStore"
        />
      </div>
    </template>
  </OtherPageView>
  <!-- <div class="body">
  </div> -->
</template>
<style scoped>
.body {
  background-color: #6d8696;
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.control {
  width: 500px;
  height: 70px;
  background-color: #ffffff8d;
  border-radius: 1000px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
}
</style>