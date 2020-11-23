function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function rnd(x) {
  return Math.floor(Math.random() * x);
}

var radius = rnd(10) + 90;

function rndParameters() {
  var x = window.innerWidth - radius * 2;
  var y = window.innerHeight - radius * 2;
  return new Point(rnd(x) + radius, rnd(y) + radius);
}

var circles = [];

var text = new PointText({
  point: view.center,
  content: 'Click here to focus and then press some keys.',
  justification: 'center',
  fontSize: 15,
});

function onKeyDown(event) {
  var myCircle = new Path.Circle(rndParameters(), radius);
  myCircle.fillColor = getRandomColor();
  circles.push(myCircle);

  sound.play();
}

function onFrame() {
  for (var i = 0; i < circles.length; i++) {
    circles[i].scale(0.93);
  }
}

var sound = new Howl({
  src: ['assets/sounds/clay.mp3'],
});
