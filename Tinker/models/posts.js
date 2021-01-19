const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  Content: String,
});


module.exports= new mongoose.model('Post',postSchema)