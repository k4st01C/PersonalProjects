(function init() {
  const squares = document.querySelectorAll('.square'),
    rgbValue = document.querySelector('#rgbValue'),
    newColors = document.querySelector('#newColors'),
    message = document.querySelector('#message'),
    modes = document.querySelectorAll('.mode'),
    h1 = document.querySelector('h1');

  const rnd3dgt = () => Math.floor(Math.random() * 256),
    rndRGB = () => `rgb(${rnd3dgt()}, ${rnd3dgt()}, ${rnd3dgt()})`,
    rndIdx = (num) => Math.floor(Math.random() * num),
    gameType = () =>
      modes[0].classList.contains('selected') ? newGame(3) : newGame(6);

  const newGame = (num) => {
    for (let index = 3; index < squares.length; index++) {
      squares[index].style.display = num === 3 ? 'none' : 'block';
    }

    h1.style.backgroundColor = 'steelblue';
    newColors.innerText = 'New Colors';
    message.innerText = ' ';
    const idx = rndIdx(num);

    for (let i = 0; i < num; i++) {
      let color;

      color = rndRGB();
      squares[i].style.backgroundColor = color;
      if (i === idx) rgbValue.innerText = color.toUpperCase();

      squares[i].addEventListener('click', function () {
        if (this.style.backgroundColor.toUpperCase() !== rgbValue.innerText) {
          this.style.backgroundColor = '#232323';
          message.innerText = 'Try Again!!';
        } else {
          squares.forEach(
            (e) => (e.style.backgroundColor = rgbValue.innerText),
          );
          h1.style.backgroundColor = rgbValue.innerText;
          message.innerText = 'Correct!';
          newColors.innerText = 'Play again?';
        }
      });
    }
  };

  modes.forEach((e) =>
    e.addEventListener('click', function () {
      modes[0].classList.remove('selected');
      modes[1].classList.remove('selected');
      this.classList.add('selected');
      gameType();
    }),
  );

  newColors.addEventListener('click', () => {
    gameType();
  });

  newGame(6);
})();
