var path = new Path();
path.strokeColor = 'black';
var start = new Point(100, 100);
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [100, -50]);
