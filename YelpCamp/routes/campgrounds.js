/* eslint-disable no-unused-vars */

const express = require('express'),
	Campsite = require('../models/campsite.js'),
	mwIsOwner = require('../middleware').isOwner(Campsite, 'id'),
	mwLoggedIn = require('../middleware').isLoggedin,
	router = express.Router();

router.get('/', (req, res) => {
	Campsite.find({}, (err, campAreas) => {
		if (err) console.log(err);
		else res.render('./campgrounds/index', { campAreas });
	});
});

router.post('/', mwLoggedIn, (req, res) => {
	req.body.campsite.author = { id: req.user._id, username: req.user.username };
	req.body.campsite.img =
		req.body.campsite.img || 'https://via.placeholder.com/150';
	Campsite.create(req.body.campsite, (err, campsite) => {
		if (err) {
			console.log(err);
		} else {
			req.flash('success', 'campground created');
			res.redirect('/campgrounds');
		}
	});
});

router.get('/new', mwLoggedIn, (req, res) => {
	res.render('./campgrounds/new');
});

router.get('/:id', (req, res) => {
	Campsite.findById(req.params.id)
		.populate('comments')
		.exec((err, campArea) => {
			if (err) console.log(err);
			else {
				res.render('./campgrounds/show', { campArea });
			}
		});
});

router.get('/:id/edit', mwIsOwner, (req, res) => {
	Campsite.findById(req.params.id, (err, campArea) => {
		if (err) return console.log(err);
		res.render('./campgrounds/edit', { campArea });
	});
});

router.put('/:id', mwIsOwner, (req, res) => {
	Campsite.findByIdAndUpdate(req.params.id, req.body.campsite, (err, site) => {
		if (err) return console.log(err);
		res.redirect('/campgrounds/' + req.params.id);
	});
});

router.delete('/:id', mwIsOwner, (req, res) => {
	Campsite.findByIdAndDelete(req.params.id, (err, site) => {
		if (err) return console.log(err);
		req.flash('error', 'Campground Deleted');
		res.redirect('/');
	});
});

module.exports = router;
