const express = require('express');
const { getDb, saveDb } = require('./db');

// 创建app实例
const app = express();

// 挂载中间件
app.use(express.json());

app.get('/todos', async (req, res) => {
  try {
    const db = await getDb();
    res.status(200).json(db);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get('/todos/:id', async (req, res) => {
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
    res.status(500).json({
      error: err.message,
    });
  }
});

app.post('/todos', async (req, res) => {
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
    res.status(500).json({
      error: err.message,
    });
  }
});

app.patch('/todos/:id', async (req, res) => {
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
    res.status(500).json({
      error: err.message,
    });
  }
});

app.delete('/todos/:id', async (req, res) => {
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
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`);
});
