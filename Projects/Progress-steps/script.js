const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

function update() {
  circles.forEach((circle, idx) => {
    if (idx < currentActive) {
      circle.classList.add('active');
    }
    else {
      circle.classList.remove('active');
    }
  });
  const actives = document.querySelectorAll('.active');

  progress.style.width = (actives.length - 1) / (circles.length - 1) * 100 + '%';
  // 如果有四个 circle 那么就有三段进度

  // 判断首末
  if (currentActive === 1) {
    prev.disabled = true;
  }
  else if (currentActive === circles.length) {
    next.disabled = true;
  }
  else {
    prev.disabled = false;
    next.disabled = false;
  }
}

next.addEventListener('click', () => {
  currentActive++;
  if (currentActive > circles.length) {
    currentActive = circles.length;
  }
  update();
});

prev.addEventListener('click', () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;
  }
  update();
});