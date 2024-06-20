let tab = document.querySelector("table");

function match(str) {
  for (let i = 0; i < tab.rows.length; i++) {
    for (let j = 0; j < tab.rows[i].cells.length; j++) {
      let cell = tab.rows[i].cells[j];
      if (cell.textContent === str) {
        cell.classList.toggle('highlight');
      }
      else cell.classList.remove('highlight');
    }
  }
}

for (let i = 0; i < tab.rows.length; i++) {
  for (let j = 0; j < tab.rows[i].cells.length; j++) {
    let cell = tab.rows[i].cells[j];
    cell.addEventListener('click', () => {
      match(cell.textContent);
    });
  }
}
  