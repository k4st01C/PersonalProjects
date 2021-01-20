const express = require('express'),
  mongoose = require('mongoose'),
  app = express(),
  bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/user.js');
const Campsite = require('./models/campsite.js');
const Comment = require('./models/comment.js');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', (req, res) => {
  Campsite.find({}, (err, campAreas) => {
    if (err) console.log(err);
    else res.render('index', { campAreas });
  });
});

app.post('/campgrounds', (req, res) => {
  const title = req.body.title;
  const img = req.body.img;
  const article = req.body.article;

  Campsite.create({ title, img, article }, (err, campsite) => {
    if (err) {
      console.log(err);
    } else res.redirect('/campgrounds');
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

app.get('/campgrounds/:id', (req, res) => {
  Campsite.findById(req.params.id, (err, campArea) => {
    if (err) console.log(err);
    else {
      res.render('show', { campArea });
    }
  });
});

app.listen('3000', () => console.log('Starting'));
