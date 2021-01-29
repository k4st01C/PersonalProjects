const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	app = express(),
	User = require('./models/user.js'),
	seedDB = require('./seeds.js');

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
app.use((req, res, next) => {
	res.locals.currentUser = req.user; //!pass variables to view enginer
	next();
});

passport.use(new LocalStrategy(User.authenticate())); //!passport-local-mongoose plugin method
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.use(require('./routes/index.js'));
app.use('/campgrounds', require('./routes/campgrounds.js'));
app.use('/campgrounds/:id/comments', require('./routes/comments.js'));

app.listen('3000', () => console.log('Starting'));
