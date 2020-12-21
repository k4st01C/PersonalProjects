const axios = require('axios');
const express = require('express');
const app = express();

const movies

axios
  .get('http://www.omdbapi.com/', {
    params: {
      apikey: '8e9a10f',
      s: 'tes',
      plot: 'full',
    },
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

app.get('/', (req, res) => {
  res.send;
});

app.listen('3000', () => {
  console.log('server starting');
});
