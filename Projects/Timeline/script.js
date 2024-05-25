var items = document.getElementsByClassName('item');

for (var i = 0; i < items.length; i++)
  {
    var item = items[i];
    var frame = item.getElementsByClassName('frame')[0];
    var forntBox = frame.getElementsByClassName('front')[0];
    var leftBox = frame.getElementsByClassName('left')[0];
    var rightBox = frame.getElementsByClassName('right')[0];
    forntBox.style.backgroundImage = 'url(./img/' + i.toString().padStart(2, '0') + '.jpg)';
    leftBox.style.backgroundImage = 'url(./img/' + i .toString().padStart(2, '0') + '.jpg)';
    rightBox.style.backgroundImage = 'url(./img/' + i.toString().padStart(2, '0') + '.jpg)';
  }

(function () {
  "use strict";
  var shell = document.getElementsByClassName('shell')[0];
  var slider = shell.getElementsByClassName('shell_slider')[0];
  var items = shell.getElementsByClassName('item');
  var prevBtn = shell.getElementsByClassName('prev')[0];
  var nextBtn = shell.getElementsByClassName('next')[0];
  // 定义变量
  var width, height, totalWidth, margin = 20,
    currIndex = 0,
    interval, intervalTime = 3000;
  function init() {
    // 初始化函数
    resize();
    move(Math.floor(items.length / 2));
    bindEvents();
    timer();
  }
  function resize() {
    // 窗口大小变化时调整大小
    width = Math.max(window.innerWidth * .20, 275);
    height = window.innerHeight * .5;
    totalWidth = width * items.length;
    // 设置slider宽度
    slider.style.width = totalWidth + "px";
    // 设置每个item的宽度和高度
    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      item.style.width = (width - (margin * 2)) + "px";
      item.style.height = height + "px";
    }
  }
  function bindEvents() {
    // 窗口大小变化时调整大小
    window.onresize = resize;
    // 点击prev按钮切换item
    prevBtn.addEventListener('click', () => { prev(); });
    nextBtn.addEventListener('click', () => { next(); });
  }
  init();
  function move(index) {
    // 移动shell到指定的item
    if (index < 1) index = items.length;
    if (index > items.length) index = 1;
    currIndex = index;
    // 遍历所有item
    for (var i = 0; i < items.length; i++) {
      let item = items[i],
        box = item.getElementsByClassName('frame')[0];
      if (i == (index - 1)) {
        // 当前item添加active类并设置3D效果
        item.classList.add('item--active');
        box.style.transform = "perspective(1200px)";
      } else {
        // 其他item移除active类并设置3D效果
        item.classList.remove('item--active');
        box.style.transform = "perspective(1200px) rotateY(" + (i < (index - 1) ? 40 : -40) + "deg)";
      }
    }
    // 移动slider
    slider.style.transform = "translate3d(" + ((index * -width) + (width / 2) + window.innerWidth / 2) + "px, 0, 0)";
    // 设置body背景图片
    var frontBox = items[index - 1].getElementsByClassName('front')[0];
    document.body.style.backgroundImage = frontBox.style.backgroundImage;
  }
  function timer() {
    // 定时器，自动切换shell
    clearInterval(interval);
    interval = setInterval(() => {
      move(++currIndex);
    }, intervalTime);
  }
  // 切换item
  function prev() {
    move(--currIndex);
    timer();
  }
  function next() {
    move(++currIndex);
    timer();
  }
})();