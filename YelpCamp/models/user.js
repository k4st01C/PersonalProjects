const mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
	username: String,
	password: String,
});

userSchema.plugin(passportLocalMongoose);
//! Adds methods such as authenticate, serialize, etc. to user...

module.exports = mongoose.model('User', userSchema);
