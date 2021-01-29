app.get('/', (req, res) => {
	res.render('home');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
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

app.get('/login', (req, res) => {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campgrounds',
		failureRedirect: '/login',
	}),
);

a=3;

app.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/campgrounds');
});
