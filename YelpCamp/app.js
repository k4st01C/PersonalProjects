const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	app = express(),
	User = require('./models/user.js'),
	Campsite = require('./models/campsite.js'),
	Comment = require('./models/comment.js'),
	seedDB = require('./seeds.js');

const isLoggedin = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
};

/* -------------------------------------------------------------------------- */
/*                                CONFIGURATION                               */
/* -------------------------------------------------------------------------- */

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
seedDB();

/* --------------------------------- MIDDLEWARE -------------------------------- */
app.use(
	require('express-session')({
		secret: 'kemalaydik',
		resave: false,
		saveUninitialized: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session());

/* -------------------------------- PASSPORT -------------------------------- */

passport.use(new LocalStrategy(User.authenticate())); //!passport-local-mongoose plugin method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.get('/', (req, res) => {
	res.render('home');
});

/* ------------------------ CAMPGROUNDS RESTFUL ROUTE ----------------------- */

app.get('/campgrounds', isLoggedin, (req, res) => {
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

/* ------------------------- COMMENTS RESTFUL ROUTE ------------------------- */

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

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	const newUser = new User({ username: req.body.username });
	User.register(newUser, req.body.password, (err, user) => {
		if (err) {
			console.log(err);
			return res.redirect('/register');
		}
		passport.authenticate('local')(req, res, () => {
			res.redirect('/campgrounds');
		});
	});
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login',
	}),
);

app.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

/* -------------------------------------------------------------------------- */

app.listen('3000', () => console.log('Starting'));
