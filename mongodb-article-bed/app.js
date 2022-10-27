const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');

const connectUri = 'mongodb://localhost:27017';
const dbClient = new MongoClient(connectUri);

const app = express();

// 配置解析请求体数据 application/json
// 它会把解析到的请求体数据放到 req.body 中
// 注意：一定要在使用之前就挂载这个中间件
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/articles', async (req, res, next) => {
  try {
    // 1. 获取客户端表单数据
    const { article } = req.body;

    // 2. 数据验证
    if (!article || !article.title || !article.description || !article.body) {
      return res.status(422).json({
        error: '请求参数不符合规则要求',
      });
    }

    await dbClient.connect();
    const collection = dbClient.db('test').collection('articles');
    article.createdAt = new Date();
    article.updatedAt = new Date();

    const ret = await collection.insertOne(article);

    article._id = ret.insertedId;
    res.status(201).json({ article });
  } catch (error) {
    next(error);
  }
});

app.get('/articles', async (req, res, next) => {
  try {
    let { _page = 1, _size = 10 } = req.query;
    _page = Number.parseInt(_page);
    _size = Number.parseInt(_size);

    await dbClient.connect();
    const collection = dbClient.db('test').collection('articles');
    const ret = collection
      .find()
      .skip((_page - 1) * _size)
      .limit(_size);

    const articles = await ret.toArray();
    const articlesCount = await collection.countDocuments();
    res.status(200).json({
      articles,
      articlesCount,
    });
  } catch (error) {
    next(err);
  }
});

app.patch('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db('test').collection('articles');

    await collection.updateOne(
      {
        _id: ObjectID(req.params.id),
      },
      {
        $set: req.body.article,
      }
    );

    const article = await await collection.findOne({
      _id: ObjectID(req.params.id),
    });

    res.status(201).json({
      article,
    });
  } catch (err) {
    next(err);
  }
});

app.delete('/articles/:id', async (req, res, next) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db('test').collection('articles');
    await collection.deleteOne({
      _id: ObjectID(req.params.id),
    });
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
});

// 它之前的所有路由中调用 next(err) 就会进入这里
// 注意：4个参数，缺一不可
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log('app listenning at port 3000.');
});