// Dependancies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Configuration
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Data
const friends = ['Ali', 'Veli', 'Deli'];

app.get('/', (req, res) => {
  res.send('naber');
});

app.get('/friends', (req, res) => {
  res.render('friends', { friends });
});

app.post('/addFriend', (req, res) => {
  friends.push(req.body.name);
  res.redirect('/friends');
});

app.listen('3000', () => console.log('Server Started!!'));
