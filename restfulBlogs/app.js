const express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  app = express();

app.set('view engine',ejs);
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/restfulBlogs');

const blogSchema=new mongoose.Schema({
    name:String,
    img:String,
    article:String,
    
});

mongoose.model('Blog',blogSchema);





app.get('/', (req, res) => {
  res.render('home');
});

app.get('/blogs', (req, res) => {
  res.render('home');
});




app.listen('3000', () => {
  console.log('starting');
});
