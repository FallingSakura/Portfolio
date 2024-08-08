<script setup>
import OtherPageView from '@/views/OtherPageView.vue';

import { ref, computed } from 'vue';
const tableData = ref([
  {
    time: '05:00 ~ 06:20',
    cells: [{ content: 'GetUp & Meditation & Running & Meal', colspan: 7 }]
  },
  {
    time: '06:20 ~ 09:00',
    cells: [
      { content: 'Mathematics', rowspan: 2 },
      { content: 'Physics' },
      { content: 'Chemistry' },
      { content: 'Mathematics' },
      { content: 'Physics' },
      { content: 'Chemistry' },
      { content: 'Mathematics' }
    ]
  },
  {
    time: '09:20 ~ 11:50',
    cells: [
      { content: 'Mathematics' },
      { content: 'Auto' },
      { content: 'Physics' },
      { content: 'Chemistry' },
      { content: 'Auto' },
      { content: 'Dev' }
    ]
  },
  {
    time: '11:50 ~ 13:00',
    cells: [{ content: 'Meal & Read & Walk', colspan: 7 }]
  },
  {
    time: '13:00 ~ 13:25',
    cells: [{ content: 'Sleep', colspan: 7 }]
  },
  {
    time: '13:30 ~ 15:30',
    cells: [
      { content: 'English' },
      { content: 'Chinese' },
      { content: 'Biology', rowspan: 2 },
      { content: 'English' },
      { content: 'Biology' },
      { content: 'Chinese' },
      { content: 'Something You Like', rowspan: 2 }
    ]
  },
  {
    time: '15:30 ~ 17:30',
    cells: [
      { content: 'Chemistry' },
      { content: 'Biology' },
      { content: 'Chinese' },
      { content: 'Chinese' },
      { content: 'Biology' }
    ]
  },
  {
    time: '17:30 ~ 18:10',
    cells: [{ content: 'Exercise', colspan: 7 }]
  },
  {
    time: '18:10 ~ 18:55',
    cells: [
      { content: 'Meal & Walk', colspan: 6 },
      { content: 'Movie', rowspan: 2 }
    ]
  },
  {
    time: '19:00 ~ 21:20',
    cells: [{ content: 'Dev', colspan: 6 }]
  },
  {
    time: '21:20 ~ 21:30',
    cells: [{ content: 'Prepare for Sleep', colspan: 7 }]
  }
]);

// 存储高亮显示的单元格内容
const highlightedCells = ref([]);
const filteredTableData = computed(() => {
  return tableData.value.map(row => {
    return {
      time: row.time,
      cells: row.cells.filter(cell => cell)
    };
  });
});
// 匹配函数
const match = (str) => {
  if (highlightedCells.value.includes(str)) {
    highlightedCells.value = [];
    return;
  }
  highlightedCells.value = [];
  tableData.value.forEach(row => {
    row.cells.forEach(cell => {
      if (cell && cell.content === str) {
        highlightedCells.value.push(cell.content);
      }
    });
  });
};
</script>
<template>
  <OtherPageView bg="url(../src/assets/img/formbg.png) no-repeat center/cover;">
    <template #project>
      <div class="container">
      <table>
        <caption>Schedule</caption>
        <tbody>
          <tr class="head">
            <th>Time</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
          <tr v-for="(row, rowIndex) in filteredTableData" :key="rowIndex">
            <th v-if="row.time">{{ row.time }}</th>
            <td v-for="(cell, cellIndex) in row.cells" :key="cellIndex"
                :rowspan="cell.rowspan || 1"
                :colspan="cell.colspan || 1"
                :class="{ highlight: highlightedCells.includes(cell.content) }"
                @click="match(cell.content)"
                >
              {{ cell.content }}
            </td>
          </tr>
        </tbody>
      </table>
        <!-- <table>
          <caption>Schedule</caption>
          <tbody>
            <tr class="head">
              <th>Time</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
              <th>Sun</th>
            </tr>
            <tr>
              <th>05:00 ~ 06:20</th>
              <td colspan="7" class="morning">GetUp &amp; Meditation &amp; Running &amp; Meal</td>
            </tr>
            <tr>
              <th>06:20 ~ 09:00</th>
              <td rowspan="2">Mathematics</td>
              <td rowspan="1">Physics</td>
              <td rowspan="1">Chemistry</td>
              <td rowspan="1">Mathematics</td>
              <td rowspan="1">Physics</td>
              <td rowspan="1">Chemistry</td>
              <td>Mathematics</td>
            </tr>
            <tr>
              <th>09:20 ~ 11:50</th>
              <td>Mathematics</td>
              <td>Auto</td>
              <td>Physics</td>
              <td>Chemistry</td>
              <td>Auto</td>
              <td>Dev</td>
            </tr>
            <tr>
              <th>11:50 ~ 13:00</th>
              <td colspan="7">Meal &amp; Read &amp; Walk</td>
            </tr>
            <tr>
              <th>13:00 ~ 13:25</th>
              <td colspan="7">Sleep</td>
            </tr>
            <tr>
              <th>13:30 ~ 15:30</th>
              <td rowspan="1">English</td>
              <td rowspan="1">Chinese</td>
              <td rowspan="2">Biology</td>
              <td rowspan="1">English</td>
              <td rowspan="1">Biology</td>
              <td rowspan="1">Chinese</td>
              <td rowspan="2">Something<br>You Like</td>
            </tr>
            <tr>
              <th>15:30 ~ 17:30</th>
              <td>Chemistry</td>
              <td>Biology</td>
              <td>Chinese</td>
              <td>Chinese</td>
              <td>Biology</td>
            </tr>
            <tr>
              <th>17:30 ~ 18:10</th>
              <td colspan="7">Exercise</td>
            </tr>
            <tr>
              <th>18:10 ~ 18:55</th>
              <td colspan="6">Meal &amp; Walk</td>
              <td rowspan="2">Movie</td>
            </tr>
            <tr>
              <th>19:00 ~ 21:20</th>
              <td colspan="6">Dev</td>
            </tr>
            <tr>
              <th>21:20 ~ 21:30</th>
              <td colspan="7">Prepare for Sleep</td>
            </tr>
          </tbody>
        </table> -->
      </div>
    </template>
  </OtherPageView>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
caption {
  caption-side: top;
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 2em;
  font-style: normal;
  font-size: 2.6em;
}

.container {
  box-shadow: 0px 0px 5px .1px rgba(0, 0, 0, 0.665);
  border-radius: 20px;
  width: 80vw;
  padding: 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
}

table {
  position: relative;
  width: 100%;
  height: 60vh;
  margin: 20px;
  table-layout: fixed;
  border-collapse: collapse;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
}

td, th {
  position: relative;
  /* Important this make ::after locate with td */
  padding: 20px;
  text-align: center;
  vertical-align: center;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  white-space: wrap;
  /* 不换行 */
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}
td {
  font-style: italic;
}

td:hover {
  /* border: 2px solid rgb(214, 153, 153); */
  background-color: #fafafa45;
  transition-delay: 1s;
  transition: 0.5s;
  filter: brightness(120%);
  transition: background 0.7s;
  /* text-shadow: 0 0 3px black; */
}

td::after {
  content: "";
  width: 120px;
  height: 12px;
  background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 10px;
  filter: blur(12px);
  overflow: hidden;
  opacity: 0;
}
td:hover::after {
  opacity: 1;
  transition: 0.6s ease;
}

.head th {
  font-size: 1.4em;
}
.head th::after {
  content: "";
  position: absolute;
  width: 70px;
  height: 15px;
  background: #d8b2ffaa;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(10px);
  z-index: -1;
  opacity: 1;
}

th::after {
  content: "";
  position: absolute;
  width: 100px;
  height: 15px;
  background: #ff3b3ba0;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(10px);
  z-index: -1;
  opacity: 0;
}

th:hover::after {
  opacity: 1;
  transition: opacity 0.6s ease;
}

td.highlight {
  background: rgba(255, 72, 72, 0.295);
  transition: background 0.5s ease;
}

@media (max-width: 1200px) {
  .container {
    transform: scale(0.8);
    width: calc(80vw / 0.8);
  }
  td, th {
    font-size: 1.1em;
  }
}
</style>