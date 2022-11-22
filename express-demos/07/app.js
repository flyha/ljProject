const express = require('express');
const router = require('./router');

// 创建app实例
const app = express();

// 配置解析表单请求体：application/json
app.use(express.json());

// 解析表单请求体：application/x-www-form-urlencoded
app.use(express.urlencoded());
app.use('/todos', router);

// 在所有的中间件之后挂载错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
  });
});

app.use((req, res, next) => {
  res.status(404).send('404 Not Found.');
});

app.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`);
});
