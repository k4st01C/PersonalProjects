const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	expressSession = require('express-session'),
	User = require('./models/user.js'),
	app = express();

const isLoggedin=(req,res,next)=>{
	if (req.isAuthenticated()) next();
	res.redirect('/');

};

app.use(
	require('express-session')({
		secret: 'KemalAydıktWFPWNZOR',
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/tinker', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

app.get('/', (req, res) => {
	res.render('home');
});

app.get('/secret',isLoggedin, (req, res) => {
	res.render('secret');
});

/* ---------------------------------- AUTH ROUTES  ---------------------------------- */

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	User.register(
		new User({ username: req.body.login.username }),
		req.body.login.password,
		(err, user) => {
			if (err) res.render('register');
			else {
				passport.authenticate('local')(req, res, () => {
					res.redirect('secret');
				});
			}
		},
	);
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/secret',
		failureRedirect: '/login',
	}),
	(req, res) => {},
);

app.get('/logout', (req, res) => {
	req.logout();
	// res.redirect('/');
	req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});

/* -------------------------------------------------------------------------- */
/*                                   Server                                   */
/* -------------------------------------------------------------------------- */

app.listen('3000', () => console.log('starting..'));
