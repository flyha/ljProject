const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/', (req, res) => {
  res.send('post / ');
});

app.put('/user', (req, res) => {
  res.send('put user');
});

app.delete('/user', (req, res) => {
  res.send('delete user');
});

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000/`);
});
