const bodyParser = require('body-parser');

const express  = require('express'),
      mongoose = require('mongoose'),
      app      = express();

mongoose.connect('mongodb://localhost:27107/tinker',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const parser=bodyParser.urlencoded({ extended: true });
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('', (req, res) => {
	res.render('home');
});

app.get('/secret', (req, res) => {
	res.render('secret');
});

app.post('/',parser,(req,res)=>res.send(req));

app.listen('3000', () => console.log('starting..'));
 