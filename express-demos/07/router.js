const express = require('express');
const { getDb, saveDb } = require('./db');

// 1. 创建路由实例
// 路由实例其实就相当于一个 mini Express 实例
const router = express.Router();

// 2. 配置路由
router.get('/', async (req, res, next) => {
  try {
    const db = await getDb();
    res.status(200).json(db);
  } catch (err) {
    // res.status(500).json({
    //   error: err.message,
    // });
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const db = await getDb();

    const ret = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );
    if (!ret) {
      return res.status(404).end();
    }

    res.status(200).json(ret);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, err) => {
  try {
    const todo = req.body;

    // 数据验证
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field title is required.',
      });
    }

    const db = await getDb();
    const lastTodo = db.todos[db.todos.length - 1];
    todo.id = lastTodo ? lastTodo.id + 1 : 1;
    db.todos.push(todo);
    console.log(db);
    await saveDb(db);

    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', async (req, res, err) => {
  try {
    const todo = req.body;
    const db = await getDb();

    const ret = db.todos.find(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );

    if (!ret) {
      return res.status(404).end();
    }

    Object.assign(ret, todo);
    await saveDb(db);

    res.status(201).json(ret);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, err) => {
  try {
    const db = await getDb();

    const todoIndex = db.todos.findIndex(
      (todo) => todo.id === Number.parseInt(req.params.id)
    );
    if (todoIndex === -1) {
      return res.status(404).end();
    }

    db.todos.splice(todoIndex, 1);

    await saveDb(db);
    res.status(204).end();
  } catch (error) {
    next(err);
  }
});

module.exports = router;
