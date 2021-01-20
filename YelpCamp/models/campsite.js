const mongoose = require('mongoose');
const campsiteSchema = new mongoose.Schema({
  title: String,
  img: String,
  article: String,
});

module.exports=mongoose.model('campsite',campsiteSchema);