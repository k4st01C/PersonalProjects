const axios = require('axios');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  axios
    .get('http://www.omdbapi.com/', {
      params: {
        apikey: '8e9a10f',
        s: 'tes',
      },
    })
    .then(function (response) {
      res.render('results',{results:response.data.Search});
      console.log(response.data.Search);
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

app.listen('3000', () => {
  console.log('server starting');
});
