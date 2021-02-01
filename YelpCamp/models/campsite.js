const mongoose = require('mongoose');
const campsiteSchema = new mongoose.Schema({
	title: String,
	img: String,
	article: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			Ref: 'User',
		},
		username: String,
	},
});

module.exports = mongoose.model('Campsite', campsiteSchema);
