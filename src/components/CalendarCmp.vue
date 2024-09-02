<script setup>
import { computed, ref } from 'vue'
const props = defineProps([
  'monthNames',
  'month',
  'year',
  'prevMonth',
  'nextMonth',
  'weekDays',
  'daysInMonth',
  'addIndex',
  'minusIndex',
  'getBackgroundColor',
  'getFontColor',
  'getDateKey',
  'dataStore',
  'status',
  'prevYear',
  'nextYear',
  'half'
])
const firstDay = computed(() => new Date(props.year, 0, 1))
const showInfo = ref(new Map())
function prev() {
  if (props.status === 0) props.prevMonth()
  else props.prevYear()
}
function next() {
  if (props.status === 0) props.nextMonth()
  else props.nextYear()
}
function initHeatmap(maxnum, initnum = 0) {
  let heatmap = []
  for (let i = 0, index = initnum; i < 50; i++) {
    const temp = []
    for (let j = 0; j < 7; j++) {
      const currentDay = new Date(firstDay.value)
      currentDay.setDate(firstDay.value.getDate() + index)
      temp.push({ date: currentDay, col: j + 1, row: i + 1, key: props.getDateKey(currentDay) })
      index++
      if (index === maxnum) break
    }
    heatmap.push(temp)
    if (index === maxnum) break
  }
  return heatmap
}

let heatmap1 = computed(() => initHeatmap(props.half))
let heatmap2 = computed(() => initHeatmap(props.half + 184, props.half))
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <transition name="fade" mode="out-in">
        <div v-if="props.status === 0" class="date" :key="`${props.year}${props.month}`">
          <h2 class="big title">{{ props.monthNames[month] }}</h2>
          <h2 class="small title">{{ year }}</h2>
        </div>
        <div class="year-only" v-else-if="props.status === 1" :key="props.year">
          <h2 class="big title">{{ props.year }}</h2>
        </div>
      </transition>
      <div class="button" @click="prev">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="button" @click="next">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <div class="calendar-body">
      <transition name="blur" mode="out-in">
        <div v-show="status === 0" class="day-names">
          <div v-for="day in props.weekDays" :key="day">{{ day }}</div>
        </div>
      </transition>
      <transition name="blur" mode="out-in">
        <div v-if="status === 0" class="days" :key="`${props.year}${props.month}`">
          <div
            v-for="(day, index) in props.daysInMonth"
            :key="day.date"
            :class="{ 'current-day': day.isCurrentDay, 'last-month': day.isLastMonth }"
            @click="props.addIndex(index, day.isLastMonth)"
            @contextmenu.prevent="props.minusIndex(index, day.isLastMonth)"
            :style="{
              backgroundColor: props.getBackgroundColor(index),
              color: props.getFontColor(index)
            }"
          >
            {{ day.date.getDate() }}
            <small>{{ props.dataStore.get(props.getDateKey(index)) }}</small>
          </div>
        </div>
        <div v-else-if="status === 1" :key="props.year" class="heatmap-container">
          <h2 class="heatmap-title title">Jan ~ Jun</h2>
          <table class="heatmap">
            <tr v-for="(row, index) in heatmap1" :key="index">
              <td
                v-for="(item, index) in row"
                :key="index"
                class="block horizon"
                :style="{
                  backgroundColor: props.getBackgroundColor(item.date),
                  color: props.getFontColor(item.date)
                }"
                @mouseover="showInfo.set(item.key, true)"
                @mouseleave="showInfo.set(item.key, false)"
              >
                <div class="info" v-show="showInfo.get(item.key)">
                  {{
                    `${item.key.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')} ${props.weekDays[item.date.getDay()]} ` +
                    (props.dataStore.get(item.key) ?? '')
                  }}
                </div>
              </td>
            </tr>
          </table>
          <div class="line"></div>
          <h2 class="heatmap-title title">Jul ~ Dec</h2>
          <table class="heatmap">
            <tr v-for="(row, index) in heatmap2" :key="index">
              <td
                v-for="(item, index) in row"
                :key="index"
                class="block horizon"
                :style="{
                  backgroundColor: props.getBackgroundColor(item.date),
                  color: props.getFontColor(item.date)
                }"
                @mouseover="showInfo.set(item.key, true)"
                @mouseleave="showInfo.set(item.key, false)"
              >
                <div class="info" v-show="showInfo.get(item.key)">
                  {{
                    `${item.key.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')} ${props.weekDays[item.date.getDay()]} ` +
                    (props.dataStore.get(item.key) ?? '')
                  }}
                </div>
              </td>
            </tr>
          </table>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.font.im/css?family=PT+Sans');
* {
  user-select: none;
  -webkit-touch-callout: none;
}
.calendar {
  width: 800px;
  border-radius: 15px;
  overflow: hidden;
  font-family: 'PT Sans';
  transition: all 0.3s ease;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
  background-color: #ececec;
}

.calendar-header .small {
  font-size: 1.2rem;
  margin-left: 15px;
}
.calendar-header .big {
  font-size: 2.4rem;
  margin-left: 25px;
}
.calendar .date,
.calendar .year-only {
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
  background-color: #f7f7f7c0;
  backdrop-filter: blur(50px);
}
.day-names,
.days {
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
  font-size: 1.5rem;
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
  background-color: #ffffffa4;
  color: #252525;
  /* border: 1px solid #dddddd96; */
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  transition: background-color 0.3s ease;
}
.days small {
  position: absolute;
  top: 3px;
  right: 6px;
  font-size: 0.9rem;
  opacity: 0.6;
}
.days .current-day {
  background-color: #007bff;
  box-shadow: 0 0 8px 1px rgb(187, 187, 187);
  color: #fff;
}
.last-month {
  opacity: 0;
}
.blur-enter-to,
.blur-leave-from {
  filter: blur(0px);
}
.blur-enter-active,
.blur-leave-active {
  transition: filter 0.2s ease;
}
.blur-enter-from,
.blur-leave-to {
  filter: blur(30px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.block {
  position: relative;
  width: 22px;
  height: 22px;
  background-color: rgba(162, 162, 162, 0.285);
  border-radius: 3px;
  text-align: center;
  line-height: 22px;
  cursor: pointer;
  color: #252525;
  font-size: 0.8rem;
}
.info {
  position: absolute;
  padding: 5px 10px;
  background-color: #0000008f;
  color: #fff;
  border-radius: 8px;
  top: -100%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 1rem;
  z-index: 1;
  pointer-events: none;
  white-space: nowrap;
}
.horizon {
  writing-mode: horizontal-tb;
}
.heatmap {
  border-spacing: 3px;
  writing-mode: vertical-lr;
}
.heatmap-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.line {
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background-color: rgba(107, 107, 107, 0.3);
  margin: 45px 0;
  /* box-shadow: 0 0 5px black; */
}
.title {
  cursor: default;
  letter-spacing: 2px;
}
.heatmap-title {
  width: 100%;
  margin-bottom: 25px;
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
  .calendar-header .small {
    font-size: 1rem;
  }
  .calendar-header .big {
    font-size: 2rem;
  }
  .calendar-body .days {
    gap: 10px;
  }
  .calendar-header .button {
    font-size: 1.4rem;
  }
  .heatmap {
    transform: scale(0.8);
  }
  .line {
    margin: 15px 0 !important;
  }
  .heatmap-title {
    margin-left: 30px;
    margin-bottom: 0 !important;
  }
}
@media (max-width: 600px) {
  .calendar {
    width: 95vw;
  }
  .calendar-body {
    padding: 15px;
  }
  .days,
  .day-names {
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
  .calendar-header .big {
    font-size: 2rem;
    margin-left: 15px;
  }
  .calendar-header .small {
    font-size: 1rem;
  }
  .calendar-body .days {
    gap: 10px;
  }
  .calendar-header .button {
    /* width: 35px;
    height: 35px; */
    font-size: 1.4rem;
  }
  .heatmap {
    transform: scale(0.55);
  }
  .line {
    width: 95% !important;
  }
}
</style>
