const panelItems = document.querySelectorAll(".container > .panel");
panelItems.forEach(item => {
  item.addEventListener('click', () => {
    [].filter.call(item.parentElement.children, el => el !== item)
    // 当点击当前 panel 时，选择其它 panel，并移除它们的 active 属性（无论有没有）
    .forEach(el => el.classList.remove('active'));
    item.classList.add('active')
    // 把 active 属性加给自己
  }
  );
});

// [].filter.call(item.parentElement.children, el => el !== item)
// 这里的空数组、filter、call 分别有什么作用？filter和call分别是谁的方法？

// item.parentElement.children.filter(el => el !=== item)


document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector("p");
  const boxElement = document.querySelector(".box");
  console.log(textElement);
  textElement.addEventListener("click", () => {
    boxElement.classList.toggle("boxChanged");
  });
});