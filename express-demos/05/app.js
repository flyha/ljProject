const express = require('express');

const app = express();

// todo1
/* app.get('/', (req, res) => {
  console.log(req.method, req.url, Date.now());
  res.send('get /');
});

app.get('/about', (req, res) => {
  console.log(req.method, req.url, Date.now());
  res.send('get /about');
});

app.post('/login', (req, res) => {
  console.log(req.method, req.url, Date.now());
  res.send('post /about');
}); */

// todo2 myLogger函数
/* const myLogger = (req) => {
  console.log(req.method, req.url, Date.now());
};

app.get('/', (req, res) => {
  myLogger(req);
  res.send('get /');
});

app.get('/about', (req, res) => {
  myLogger(req);
  res.send('get /about');
});

app.post('/login', (req, res) => {
  myLogger(req);
  res.send('post /about');
}); */

// todo3
/* app.use((req, res, next) => {
  req.foo = 'bar';
  res.abc = () => {
    console.log('abc');
  };
  console.log(req.url, req.method, Date.now());
  // 交出执行权，往后继续匹配执行
  next();
});

app.get('/', (req, res) => {
  console.log(req.foo);
  res.send('get /');
});

app.get('/about', (req, res) => {
  res.abc();
  res.send('get /about');
});

app.post('/login', (req, res) => {
  res.send('post /login');
}); */

// todo4
function json(options) {
  // 返回一个中间件函数
  return (req, res, next) => {
    console.log(`hello ${options.message}`);
  };
}

app.use(
  json({
    message: 'world',
  })
);

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000/`);
});
