const app = require('express')();


app.get('/', (req, res) => {
  res.send('nabeer');
});

app.get('*', (req, res) => {
  res.send('Page not found');
});

app.listen(3000, () => console.log('starting..'));
