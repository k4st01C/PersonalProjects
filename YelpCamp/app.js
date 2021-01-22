const campsite = require('./models/campsite.js');

const express    = require('express'),
      mongoose   = require('mongoose'),
      app        = express(),
      bodyParser = require('body-parser'),
      User       = require('./models/user.js'),
      Campsite   = require('./models/campsite.js'),
      Comment    = require('./models/comment.js'),
      seedDB     = require('./seeds.js');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
seedDB();

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
	useNewUrlParser   : true,
	useUnifiedTopology: true,
});

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/campgrounds', (req, res) => {
	Campsite.find({}, (err, campAreas) => {
		if (err) console.log(err);
		else res.render('campgrounds/index', { campAreas });
	});
});

app.post('/campgrounds', (req, res) => {
	Campsite.create(req.body.campsite, (err, campsite) => {
		if (err) {
			console.log(err);
		} else res.redirect('/campgrounds');
	});
});

app.get('/campgrounds/new', (req, res) => {
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
	Campsite.findById(req.params.id)
		.populate('comments')
		.exec((err, campArea) => {
			if (err) console.log(err);
			else {
				res.render('campgrounds/show', { campArea });
			}
		});
});

app.get('/campgrounds/:id/comments/new', (req, res) => {
	Campsite.findById(req.params.id, (err, site) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			res.render('comments/new.ejs', { site });
		}
	});
});

app.post('/campgrounds/:id/comments', (req, res) => {
	Campsite.findById(req.params.id, (err, site) => {
		if (err) console.log(err);
		else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) console.log(err);
				else {
					site.comments.push(comment._id);
					site.save();
				}
			});
			res.redirect(`/campgrounds/${req.params.id}`);
		}
	});
});

app.listen('3000', () => console.log('Starting'));
