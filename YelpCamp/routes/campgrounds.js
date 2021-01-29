


app.get('/campgrounds', (req, res) => {
	Campsite.find({}, (err, campAreas) => {
		if (err) console.log(err);
		else res.render('campgrounds/index', { campAreas });
	});
});

app.post('/campgrounds', (req, res) => {
	Campsite.create(req.body.campsite, (err, campsite) => {
		if (err) {
			console.log(err);
		} else res.redirect('/campgrounds');
	});
});

app.get('/campgrounds/new', isLoggedin, (req, res) => {
	res.render('campgrounds/new');
});

app.get('/campgrounds/:id', (req, res) => {
	Campsite.findById(req.params.id)
		.populate('comments')
		.exec((err, campArea) => {
			if (err) console.log(err);
			else {
				res.render('campgrounds/show', { campArea });
			}
		});
});