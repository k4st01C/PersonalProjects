const express = require('express'),
	Campsite = require('../models/campsite.js'),
	Comment = require('../models/comment.js'),
	router = express.Router({ mergeParams: true });
//!merges params from comments and campgrounds

const isLoggedin = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect('/login');
	}
};

router.get('/new', isLoggedin, (req, res) => {
	Campsite.findById(req.params.id, (err, site) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			res.render('comments/new.ejs', { site });
		}
	});
});

router.post('/', isLoggedin, (req, res) => {
	//! addded isloggedin to ensure no post requests are made to hidden routes
	Campsite.findById(req.params.id, (err, site) => {
		if (err) console.log(err);
		else {
			Comment.create(req.body.comment, (err, comment) => {
				if (err) console.log(err);
				else {
					comment.author = { id: req.user._id, username: req.user.username };
					comment.save();
					site.comments.push(comment._id);
					site.save();
					res.redirect(`/campgrounds/${site._id}`);
				}
			});
		}
	});
});

module.exports = router;
