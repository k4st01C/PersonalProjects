const mongoose = require('mongoose');
const campsiteSchema = new mongoose.Schema({
	title: String,
	img: String,
	article: String,
	comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Campsite', campsiteSchema);
