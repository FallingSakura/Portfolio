const box = document.querySelector('.search-box');
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  box.classList.toggle('active');
});

document.addEventListener('click', event => {
  if (!box.contains(event.target) && event.target !== btn) {
    box.classList.remove('active');
  }
});

// event 是事件对象 event.target 表示触发这个事件的元素