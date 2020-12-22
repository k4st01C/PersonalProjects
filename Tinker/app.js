const axios = require('axios');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  const search=req.query.search
  console.log(req.query);
  axios
    .get('http://www.omdbapi.com/', {
      params: {
        apikey: '8e9a10f',
        s: search,
      },
    })
    .then(function (response) {
      res.render('results',{results:response.data.Search});
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

app.get('/search',(req,res)=>{
  res.render('search')
})

app.listen('3000', () => {
  console.log('server starting');
});
