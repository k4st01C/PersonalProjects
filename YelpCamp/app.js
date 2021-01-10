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

const campSiteSchema = new mongoose.Schema({
  name: String,
  img: String,
  description:String,
});

const CampSite = mongoose.model('CampSite', campSiteSchema);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campgrounds', (req, res) => {
  CampSite.find({}, (err, campAreas) => {
    if (err) console.log(err);
    else res.render('index', { campAreas });
  });
});
 
app.post('/campgrounds', (req, res) => {
   const name = req.body.name;
  const img = req.body.img;
  const description = req.body.description;

  CampSite.create({ name, img, description }, (err, campsite) => {
    if (err) {

      console.log(err);
    } else res.redirect('/campgrounds');
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
});

app.get('/campgrounds/:id', (req,res)=>{
  CampSite.findById(req.params.id,(err,campArea)=>{
    if (err) console.log(err);
    else {
      res.render('show',{campArea})

    }
  })
})

app.listen('3000', () => console.log('Starting'));
  