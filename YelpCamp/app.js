const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', (req, res) => {
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
  res.render('campgrounds', { campAreas });
});

app.listen('3000', () => console.log('Starting'));
