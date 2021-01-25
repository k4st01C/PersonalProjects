const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	app = express(),
	User = require('./models/user.js'),
	Campsite = require('./models/campsite.js'),
	Comment = require('./models/comment.js'),
	seedDB = require('./seeds.js');

/* -------------------------------------------------------------------------- */
/*                                CONFIGURATION                               */
/* -------------------------------------------------------------------------- */

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
	require('express-session')({
		secret: 'kemalaydik',
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	}),
);
app.use(passport.session());
seedDB();

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

/* -------------------------------- PASSPORT -------------------------------- */

passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, user);
		});
	}),
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
	  done(err, user);
	});
  });

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

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

/* ------------------------------- AUTH ROUTES ------------------------------ */

app.get('/login',(req,res)=>{
	res.render('login')
})

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


app.listen('3000', () => console.log('Starting'));
