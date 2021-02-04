module.exports = {
	isLoggedin: (req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			req.flash('error', 'Please Login First');
			res.redirect('/login');
		}
	},

	isOwner: (mongooseModel, modelId) => {
		return (req, res, next) => {
			if (!req.isAuthenticated()) return res.redirect('back');
			mongooseModel.findById(req.params[modelId], (err, foundModelInstance) => {
				if (err) return res.redirect('back');
				if (foundModelInstance.author.id.equals(req.user._id)) return next();
				req.flash('error','You dont have the permission to do that');
				res.redirect('back');
			});
		};
	},
};
