const express = require('express'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	flash = require('connect-flash'),
	app = express(),
	User = require('./models/user.js');
// seedDB = require('./seeds.js');

/* -------------------------------------------------------------------------- */
/*                                CONFIGURATION                               */
/* -------------------------------------------------------------------------- */

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
// seedDB();

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
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	//!pass user variable to view engine
	next();
});

passport.use(new LocalStrategy(User.authenticate()));
//!passport-local-mongoose plugin method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.use(require('./routes'));
app.use('/campgrounds', require('./routes/campgrounds.js'));
app.use('/campgrounds/:id/comments', require('./routes/comments.js'));

app.listen('3000', () => console.log('Starting'));
