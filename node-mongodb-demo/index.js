const { MongoClient, ObjectID } = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017', {});

async function run() {
  try {
    // 开始连接
    await client.connect();

    const dbTest = client.db('myDb');
    const inventoryCollection = dbTest.collection('inventory');

    // 创建文档
    // const ret = await inventoryCollection.insertOne({
    //   a: 1,
    //   b: '2',
    //   c: true,
    //   d: [1, 2, 3],
    // });
    // console.log(ret);

    // 查询文档
    // const ret = await inventoryCollection.findOne({ item: 'planner' });
    // console.log(ret);

    // const ret = await inventoryCollection.find({ item: 'planner' });
    // console.log(await ret.toArray());

    // 更新文档
    // const ret = await inventoryCollection.updateOne(
    //   {
    //     item: 'planner',
    //   },
    //   {
    //     $set: {
    //       qty: 1000,
    //     },
    //   }
    // );
    // console.log(ret);

    // 删除文档
    const ret = await inventoryCollection.deleteOne({
      _id: ObjectID('6358f8210760d572323962ad'),
    });
    console.log(ret);
  } catch (error) {
    console.log('连接失败', error);
  } finally {
    await client.close();
  }
}

run();
