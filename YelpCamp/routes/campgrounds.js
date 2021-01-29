/* eslint-disable no-unused-vars */

const express = require('express'),
	Campsite = require('../models/campsite.js'),
	router = express.Router();

const isLoggedin = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
};

router.get('/', (req, res) => {
	Campsite.find({}, (err, campAreas) => {
		if (err) console.log(err);
		else res.render('campgrounds/index', { campAreas });
	});
});

router.post('/', (req, res) => {
	Campsite.create(req.body.campsite, (err, campsite) => {
		if (err) {
			console.log(err);
		} else res.redirect('/');
	});
});

router.get('/new', isLoggedin, (req, res) => {
	res.render('campgrounds/new');
});

router.get('/:id', (req, res) => {
	Campsite.findById(req.params.id)
		.populate('comments')
		.exec((err, campArea) => {
			if (err) console.log(err);
			else {
				res.render('campgrounds/show', { campArea });
			}
		});
});

module.exports = router;
