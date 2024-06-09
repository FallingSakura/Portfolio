const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.querySelector('.toggle-btn');
const items = document.querySelectorAll('.list-items');
let isExpand = false;
toggleBtn.addEventListener('click', () => {
  isExpand = !isExpand;
  sidebar.classList.toggle('active');
})


items.forEach(item => {
item.addEventListener('click', () => {
  if (isExpand) {
    [].filter.call(item.parentElement.children, i => i !== item).forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  }});
});
