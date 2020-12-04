const app = require('express')();
const sounds = {
  pig: '"oink"',
  cat: '"meow"',
  dog: '"bark"',
};

app.get('/', (req, res) => res.send('Hi There!'));

app.get('/speak/:animal', (req, res) =>
  res.send(
    `the ${req.params.animal} says ${sounds[req.params.animal] || 'ahaha'}`,
  ),
);
app.get('/repeat/:word/:number', function (req, res) {
  let wording = '';
  for (let i = 0; i < parseInt(req.params.number); i++) {
    wording += req.params.word+' ';
  }
  res.send(wording);
});

app.get('*', (req, res) => res.send('page not found'));

app.listen(3000, () => console.log('starting..'));
