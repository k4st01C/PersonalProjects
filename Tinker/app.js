const app = require('express')();
const bodyParser = require('body-parser');

const sounds = {
  pig: '"oink"',
  cat: '"meow"',
  dog: '"bark"',
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hi There!'));

app.get('/speak/:animal', (req, res) =>
  res.send(
    `the ${req.params.animal} says ${sounds[req.params.animal] || 'ahaha'}`,
  ),
);

let name;

app.get('/test/:thing', (req, res) => {
  const thing = req.params.thing;
  res.render('home', { thing, name });
});

app.post('/create', (req, res) => {
  name = req.body.name;
  res.redirect('test/:thing');
});

app.get('*', (req, res) => res.send('page not found'));

app.listen(3000, () => console.log('starting..'));
