const btn1 = document.querySelector('#btn1'),
  btn2 = document.querySelector('#btn2'),
  reset = document.querySelector('#reset'),
  input = document.querySelector('input'),
  board = document.querySelector('h1'),
  title = document.querySelector('h2');

let maxScore = 5;

btn1.score = 0;
btn2.score = 0;

const boardUpdate = function () {
  if (btn1.score >= maxScore) {
    board.innerHTML = `<span style='color:red'>${btn1.score}</span> to ${btn2.score}`;
  } else if (btn2.score >= maxScore) {
    board.innerHTML = `${btn1.score} to <span style='color:red'>${btn2.score}</span>`;
  } else {
    this.score++;
    board.textContent = `${btn1.score} to ${btn2.score}`;
  }
};

input.addEventListener('change', function () {
  maxScore = this.value;
  title.innerText = `Playing to:${maxScore}`;
});

btn1.addEventListener('click', boardUpdate);
btn2.addEventListener('click', boardUpdate);

reset.addEventListener('click', () => {
  btn1.score = 0;
  btn2.score = 0;
  board.textContent = `${btn1.score} to ${btn2.score}`;
});
