const express = require('express');

const app = express();

// todo1 不做任何限定的中间件
/* app.use(function (req, res, next) {
  console.log('TIme:', Date.now());
  next();
});

// 限定请求路径
app.use('user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

// 限定请求方法 + 请求路径
app.get('/', (req, res) => {
  res.send('hello world');
});

// app.post
// app.put
// app.patch
// app.delete */

// todo2
/* app.use(
  '/user/:id',
  function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log('request Type:', req.method);
    next();
  }
);

app.get('/user/:id', (req, res) => {
  res.send('get /user/:id');
}); */

// todo3 多个路由处理函数
/* app.get(
  '/user/:id',
  function (req, res, next) {
    console.log('ID: ', req.params.id);
    next();
  },
  function (req, res, next) {
    res.send('User Info');
  }
);

app.get('/user/:id', function (req, res, next) {
  // res.end(req.params.id);
  console.log(123);
}); */

// todo4
/* app.get(
  '/user/:id',
  function (req, res, next) {
    // next('route') //跳过当前路由中间件，进入下一个路由
    if (req.params.id === '0') next('route');
    else next();
  },
  function (req, res, next) {
    res.send('regular');
  }
);

app.get('/user/:id', function (req, res, next) {
  res.send('special');
}); */

// todo5 中间件也可以是数组
function logOriginalUrl(req, res, next) {
  console.log('Requset URL:', req.originalUrl);
  next();
}

function logMethod(req, res, next) {
  console.log('Request Type:', req.method);
  next();
}

var logStuff = [logOriginalUrl, logMethod];

app.get('/user/:id', logStuff, function (req, res, next) {
  res.send('User Info');
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000/`);
});
