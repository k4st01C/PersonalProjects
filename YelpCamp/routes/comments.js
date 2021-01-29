const express = require('express'),
	Campsite = require('../models/comment.js'),
	router = express.router();

router.get('/campgrounds/:id/comments/new', isLoggedin, (req, res) => {
	Campsite.findById(req.params.id, (err, site) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			res.render('comments/new.ejs', { site });
		}
	});
});

router.post('/campgrounds/:id/comments', isLoggedin, (req, res) => {
	//! addded isloggedin to ensure no post requests are made to hidden routes
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

module.exports = router;
