const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const campAreas = [
  {
    name: 'Karadeniz',
    img:
      'https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  },
  {
    name: 'Ayder',
    img:
      'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    name: 'Datça',
    img:
      'https://images.pexels.com/photos/1368382/pexels-photo-1368382.jpeg?cs=srgb&dl=pexels-vlad-bagacian-1368382.jpg&fm=jpg',
  },
];

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campAreas });
});

app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const img = req.body.img;
  campAreas.push({ name, img });
  res.redirect('campgrounds')
  console.log(campAreas);
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

app.listen('3000', () => console.log('Starting'));
