/* eslint-disable no-unused-vars */

const express = require('express'),
	User = require('../models/user.js'),
	passport = require('passport'),
	router = express.Router();

router.get('/', (req, res) => {
	res.render('home');
});

router.get('/register', (req, res) => {
	res.render('register');
});

router.post('/register', (req, res) => {
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

router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login',
	}),
);

router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/campgrounds');
});

module.exports = router;
