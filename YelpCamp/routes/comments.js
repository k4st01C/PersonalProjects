const express = require('express'),
	Campsite = require('../models/campsite.js'),
	Comment = require('../models/comment.js'),
	mwIsOwner=require('../middleware').isOwner(Comment,'commentId'),
	mwLoggedIn=require('../middleware').isLoggedin,
	router = express.Router({ mergeParams: true });
//!merges params from comments and campgrounds

router.get('/new', mwLoggedIn, (req, res) => {
	Campsite.findById(req.params.id, (err, site) => {
		if (err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			res.render('comments/new.ejs', { site });
		}
	});
});

router.post('/', mwLoggedIn, (req, res) => {
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
					req.flash('success','New Comment')
					res.redirect(`/campgrounds/${site._id}`);
				}
			});
		}
	});
});

router.get('/:commentId/edit', mwIsOwner, (req, res) => {
	Comment.findById(req.params.commentId, (err, comment) => {
		if (err) return res.redirect('back');
		res.render('./comments/edit', { comment, id: req.params.id });
	});
});

router.put('/:commentId', mwIsOwner, (req, res) => {
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, (err) => {
		if (err) return res.redirect('back');
		res.redirect('/campgrounds/' + req.params.id);
	});
});

router.delete('/:commentId', mwIsOwner, (req, res) => {
	Comment.findByIdAndDelete(req.params.commentId, (err) => {
		if (err) return console.log(err);
		req.flash('error', 'Comment Deleted');
		res.redirect('back');
	});
});

module.exports = router;
