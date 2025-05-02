const boxes = document.querySelectorAll(".box");
const body = document.body;

boxes.forEach((box) => {
  box.addEventListener("mouseenter", () => {
    const boxColor = window.getComputedStyle(box).backgroundColor;
    body.style.backgroundColor = boxColor;
  });
});
