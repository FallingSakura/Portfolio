<script setup>
const props = defineProps(['monthNames', 'month', 'year', 'prevMonth', 'nextMonth',
  'weekDays', 'daysInMonth', 'addIndex', 'minusIndex', 'getBackgroundColor', 'getFontColor', 'getDateKey',
  'dataStore'
]);
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <transition name="fade" mode="out-in">
        <div class="date" :key="`${props.year}${props.month}`">
          <h2 class="month">{{ props.monthNames[month] }}</h2>
          <h2 class="year">{{ year }}</h2>
        </div>
      </transition>
      <div class="button" @click="props.prevMonth">
        <i class="fa-solid fa-chevron-left"></i>
      </div>
      <div class="button" @click="props.nextMonth">
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </div>
    <div class="calendar-body">
      <div class="day-names">
        <div v-for="day in props.weekDays" :key="day">{{ day }}</div>
      </div>
      <transition name="blur" mode="out-in">
        <div class="days" :key="`${props.year}${props.month}`">
          <div
            v-for="(day, index) in props.daysInMonth"
            :key="day.date"
            :class="{'current-day': day.isCurrentDay, 'last-month': day.isLastMonth}"
            @click="props.addIndex(index, day.isLastMonth)"
            @contextmenu.prevent="props.minusIndex(index, day.isLastMonth)"
            :style="{ backgroundColor: props.getBackgroundColor(index), color: props.getFontColor(index) }"
          >
            {{ day.date.getDate() }}
            <small>{{ props.dataStore.get(props.getDateKey(index)) }}</small>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.font.im/css?family=PT+Sans');
.calendar {
  width: 800px;
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
}

.calendar-header .year {
  font-size: 1.2rem;
  margin-left: 15px;
  letter-spacing: 2px;
}
.calendar-header .month {
  font-size: 2.4rem;
  letter-spacing: 2px;
  margin-left: 25px;
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
  transition: background-color 0.3s ease;
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
  transition: filter 0.3s ease;
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
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
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