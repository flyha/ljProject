const express = require('express');
const morgan = require('morgan');

const app = express();

// app.use(morgan('tiny'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000/`);
});
