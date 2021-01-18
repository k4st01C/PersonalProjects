const express = require('express'),
  mongoose = require('mongoose'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  expressSanitizer = require('express-sanitizer'),
  app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

mongoose.connect(
  'mongodb+srv://k45t01c:a1b9c2d8e3f4@cluster0.rbzkm.mongodb.net/restfulBlogs?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

mongoose.set('useFindAndModify', false);

const blogSchema = new mongoose.Schema({
  name: String,
  img: String,
  article: String,
  created: { type: Date, default: Date.now() },
});

const Blog = mongoose.model('Blog', blogSchema);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) res.redirect('/');
    else {
      res.render('index', { blogs });
    }
  });
});

app.get('/blogs/new', (req, res) => {
  res.render('new');
});

app.post('/blogs', (req, res) => {
  const name = req.body.name,
    img = req.body.img,
    article = req.sanitize(req.body.article);
  Blog.create({ name, img, article }, (err) => {
    res.redirect('/blogs');
  });
});

app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) console.log(err);
    else {
      res.render('show', { blog });
    }
  });
});

app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) console.log(err);
    else {
      res.render('edit', { blog });
    }
  });
});

app.put('/blogs/:id', (req, res) => {
  const name = req.body.name,
    img = req.body.img,
    article = req.body.article;

  Blog.findByIdAndUpdate(req.params.id, { name, img, article }, (err, blog) => {
    if (err) console.log(err);
    else {
      res.redirect('/blogs');
    }
  });
});

app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id, (err, blog) => {
    if (err) console.log(err);
    else {
      res.redirect('/blogs');
    }
  });
});

app.listen('3000', () => {
  console.log('starting');
});
