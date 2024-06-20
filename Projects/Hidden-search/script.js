const box = document.querySelector('.search-box');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

btn.addEventListener('click', () => {
  box.classList.toggle('active');
  if (!box.classList.contains('active')) {
    setTimeout(() => {
      input.value = '';
    }, 500);
  }
});

document.addEventListener('click', event => {
  if (!box.contains(event.target)) {
    box.classList.remove('active');
    setTimeout(() => {
      input.value = '';
    }, 500);
  }
});

// event 是事件对象 event.target 表示触发这个事件的元素