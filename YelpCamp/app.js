const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/yelpCamp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const campSiteSchema = new mongoose.Schema({
  name: String,
  img: String,
});

const CampSite = mongoose.model('CampSite', campSiteSchema);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', (req, res) => {
  CampSite.find({}, (err, campAreas) => {
    if (err) console.log(err);
    res.render('campgrounds', { campAreas });
  });
});

app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const img = req.body.img;

  const campsite = new CampSite({
    name: name,
    img: img,
  });

  campsite.save((err, campSite) => {
    if (err) console.log(err);
  });
  res.redirect('/campgrounds')
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

app.listen('3000', () => console.log('Starting'));
