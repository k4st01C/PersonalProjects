const express = require('express'),
	router  = express.router();

router.get('/campgrounds', (req, res) => {
	Campsite.find({}, (err, campAreas) => {
		if (err) console.log(err);
		else res.render('campgrounds/index', { campAreas });
	});
});

router.post('/campgrounds', (req, res) => {
	Campsite.create(req.body.campsite, (err, campsite) => {
		if (err) {
			console.log(err);
		} else res.redirect('/campgrounds');
	});
});

router.get('/campgrounds/new', isLoggedin, (req, res) => {
	res.render('campgrounds/new');
});

router.get('/campgrounds/:id', (req, res) => {
	Campsite.findById(req.params.id)
		.populate('comments')
		.exec((err, campArea) => {
			if (err) console.log(err);
			else {
				res.render('campgrounds/show', { campArea });
			}
		});
});


module.exports=router;