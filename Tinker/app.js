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



app.post('/createAnimal')



app.get('*', (req, res) => res.send('page not found'));

app.listen(3000, () => console.log('starting..'));
