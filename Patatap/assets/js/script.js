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

var radius = rnd(90) + 10;

function rndParameters() {
  var x = window.innerWidth - radius * 2;
  var y = window.innerHeight - radius * 2;
  return new Point(rnd(x)+radius, rnd(y)+radius);
}

var myCircle = new Path.Circle(rndParameters(), radius);
myCircle.fillColor = getRandomColor();
