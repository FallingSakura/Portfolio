<script setup>
import OtherPageView from '@/views/OtherPageView.vue'
import { ref, computed, onMounted } from 'vue'
import Calendar from '../CalendarCmp.vue'
import ControlButton from '../CalendarControlButton.vue'

const ip = 'localhost'
const date = ref(new Date())
let dataStore = ref(new Map())
let status = ref(0)

const buttons = {
  0: {
    icon: 'fa-solid fa-location-crosshairs',
    fn: reset
  },
  1: {
    icon: computed(() => {
      return status.value === 0 ? 'fa-solid fa-toggle-off' : 'fa-solid fa-toggle-on'
    }),
    fn: () => {
      status.value = status.value === 0 ? 1 : 0
    }
  }
}
onMounted(() => {
  // .json() 将 JSON 字符串转换为 JS 对象
  fetch(`http://${ip}:3000/get-data`)
    .then((response) => response.json()) // json
    .then((data) => {
      dataStore.value = new Map(Object.entries(data))
    })
    .then(() => {})
    .catch((error) => console.log('Error fetching data:', error))

  // dataStore.value = new Map(Object.entries(JSONData));
})
// Fri Aug 23 2024 13:55:58 GMT+0800 (China Standard Time)

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]
const year = computed(() => date.value.getFullYear())
// 2024
const month = computed(() => date.value.getMonth())
// 08 - 7
class Day {
  constructor(date, isCurrentDay = false, isLastMonth = false) {
    this.date = date
    this.isCurrentDay = isCurrentDay
    this.isLastMonth = isLastMonth
  }
}

const daysInMonth = computed(() => {
  const days = []
  const firstDay = new Date(year.value, month.value, 1).getDay()
  const lastDate = new Date(year.value, month.value + 1, 0).getDate()

  for (let i = firstDay - 1; i >= 0; i--) {
    days.push(new Day(new Date(year.value, month.value, -i), false, true))
  }

  for (let i = 1; i <= lastDate; i++) {
    const currentDate = new Date(year.value, month.value, i)
    days.push(new Day(currentDate, isToday(currentDate)))
  }
  return days
})

let half = computed(() => {
  if ((year.value % 4 === 0 && year.value % 100 !== 0) || year.value % 400 === 0) return 182
  else return 181
})

function reset() {
  date.value = new Date()
}
function isToday(date) {
  const today = new Date()
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  )
}
function getDateKey(dateEl) {
  const day = dateEl instanceof Date ? dateEl : daysInMonth.value[dateEl].date
  return `${day.getFullYear()}${String(day.getMonth() + 1).padStart(2, '0')}${String(day.getDate()).padStart(2, '0')}`
}

function prevMonth() {
  date.value.setMonth(date.value.getMonth() - 1)
  date.value = new Date(date.value)
}

function nextMonth() {
  date.value.setMonth(date.value.getMonth() + 1)
  date.value = new Date(date.value)
}
function prevYear() {
  date.value.setFullYear(date.value.getFullYear() - 1)
  date.value = new Date(date.value)
}
function nextYear() {
  date.value.setFullYear(date.value.getFullYear() + 1)
  date.value = new Date(date.value)
}
function beyond(dateEl) {
  const today = new Date()
  if (dateEl > today) return false
  return true
}
function addIndex(index, isLastMonth = false) {
  if (!beyond(daysInMonth.value[index].date)) {
    alert('这里的区域，以后再来探索吧！')
    return
  }
  if (isLastMonth) return
  const timeIndex = getDateKey(index)
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === 3) return
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) + 1)
    if (dataStore.value.get(timeIndex) === 0) {
      dataStore.value.delete(timeIndex)
      updateData(timeIndex, null)
      return
    }
  } else dataStore.value.set(timeIndex, 1)
  updateData(timeIndex, dataStore.value.get(timeIndex))
}
function minusIndex(index, isLastMonth = false) {
  if (!beyond(daysInMonth.value[index].date)) {
    alert('这里的区域，以后再来探索吧！')
    return
  }
  if (isLastMonth) return
  const timeIndex = getDateKey(index)
  if (dataStore.value.has(timeIndex)) {
    if (dataStore.value.get(timeIndex) === -3) return
    dataStore.value.set(timeIndex, dataStore.value.get(timeIndex) - 1)
    if (dataStore.value.get(timeIndex) === 0) {
      dataStore.value.delete(timeIndex)
      updateData(timeIndex, null)
      return
    }
  } else dataStore.value.set(timeIndex, -1)
  updateData(timeIndex, dataStore.value.get(timeIndex))
}
function getBackGroundColor(index) {
  const timeIndex = getDateKey(index)
  if (!dataStore.value.has(timeIndex)) return
  const color = ref('')
  switch (dataStore.value.get(timeIndex)) {
    case 1:
      color.value = '#40E0D0'
      break
    case 2:
      color.value = '#FF8C00'
      break
    case 3:
      color.value = '#FF0080'
      break
    case 0:
      color.value = '#ffffffa4'
      break
    case -1:
      color.value = '#4B79A1'
      break
    case -2:
      color.value = '#036'
      break
    case -3:
      color.value = '#222'
      break
  }
  return color.value
}
function getFontColor(index) {
  const timeIndex = getDateKey(index)
  if (!dataStore.value.has(timeIndex)) return
  const color = ref('')
  if (dataStore.value.get(timeIndex) < 0) color.value = '#fff'
  return color.value
}
function updateData(key, value) {
  fetch(`http://${ip}:3000/update-data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries([[`${key}`, value]]))
  })
    .then((res) => res.text())
    .then((data) => data)
    .catch((error) => console.log('Error:', error))
}
</script>

<template>
  <OtherPageView>
    <template #project>
      <div class="body">
        <div class="control">
          <ControlButton
            class="control-button"
            v-for="(button, index) in buttons"
            :key="index"
            :icon="typeof button.icon === `string` ? button.icon : button.icon.value"
            @click="button.fn"
          />
        </div>
        <Calendar
          :monthNames="monthNames"
          :month="month"
          :year="year"
          :prevMonth="prevMonth"
          :nextMonth="nextMonth"
          :prevYear="prevYear"
          :nextYear="nextYear"
          :weekDays="weekDays"
          :daysInMonth="daysInMonth"
          :addIndex="addIndex"
          :minusIndex="minusIndex"
          :getBackgroundColor="getBackGroundColor"
          :getFontColor="getFontColor"
          :getDateKey="getDateKey"
          :dataStore="dataStore"
          :status="status"
          :half="half"
        />
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
.body {
  background-color: #6d8696;
  background-image: linear-gradient(135deg, #71bdbc, #6d8696);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  padding: 0 30px;
  margin-top: 10vh;
}

.control-button {
  margin-right: 20px;
}

.control-button i {
  transition: all 1s ease;
}

@media (max-width: 1100px) {
  .control {
    width: 300px;
  }
}

@media (max-width: 600px) {
  .control {
    transform: scale(0.9);
  }
}
</style>
