const express = require('express');

const app = express();

app.get('/', (req, res) => {
  console.log(req.url); //请求地址
  console.log(req.method); //请求方法
  console.log(req.headers); //请求头
  console.log(req.query); //请求参数

  // 设置响应状态码
  // res.statusCode = 201;

  // 结束响应
  // res.end();

  // res.send('Hello world');

  // res.write('a');
  // res.write('b');
  // res.write('c');
  // res.end();

  // res.end('hello world!');

  // res.send({
  //   foo: 'bar',
  // });

  res.cookie('foo', 'bar');
  res.cookie('a', 123);

  res.status(201).send('ok');
});

app.listen(3000, () => {
  console.log(`server running at http://localhost:3000/`);
});
