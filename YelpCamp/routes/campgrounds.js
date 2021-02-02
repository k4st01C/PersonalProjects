/* eslint-disable no-unused-vars */

const express = require('express'),
	Campsite = require('../models/campsite.js'),
	router = express.Router();

const isOwner = (req, res, next) => {
	if (!req.isAuthenticated()) return res.redirect('back');
	Campsite.findById(req.params.id, (err, site) => {
		if (err) return res.redirect('back');
		if (site.author.id.equals(req.user._id)) return next();
		res.redirect('back');
	});
};

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
		else res.render('./campgrounds/index', { campAreas });
	});
});

router.post('/', isLoggedin, (req, res) => {
	req.body.campsite.author = { id: req.user._id, username: req.user.username };
	req.body.campsite.img =
		req.body.campsite.img || 'https://via.placeholder.com/150';
	Campsite.create(req.body.campsite, (err, campsite) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds');
		}
	});
});

router.get('/new', isLoggedin, (req, res) => {
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

router.get('/:id/edit', isOwner, (req, res) => {
	Campsite.findById(req.params.id, (err, campArea) => {
		if (err) return console.log(err);
		res.render('./campgrounds/edit', { campArea });
	});
});

router.put('/:id', isOwner, (req, res) => {
	Campsite.findByIdAndUpdate(req.params.id, req.body.campsite, (err, site) => {
		if (err) return console.log(err);
		res.redirect('/campgrounds/' + req.params.id);
	});
});

router.delete('/:id', isOwner, (req, res) => {
	Campsite.findByIdAndDelete(req.params.id, (err, site) => {
		if (err) return console.log(err);
		res.redirect('/campgrounds');
	});
});

module.exports = router;
