const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  campsites:[{type:mongoose.Schema.Types.ObjectId, ref:'Campsite'}]

});

module.exports=mongoose.model('User',userSchema)