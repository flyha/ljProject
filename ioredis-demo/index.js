const ioredis = require('ioredis');

const redis = new ioredis({
  port: 6379,
  host: '127.0.0.1',
  showFriendlyErrorStack: true,
});

async function main() {
  try {
    await redis.set('adbs');
    console.log('OK');
  } catch (err) {
    console.log('操作失败', err);
  }
}

main();

// redis.get('Jack').then((res) => {
//   console.log(res, 'res');
// });

// async function main() {
//   try {
//     const ret = await redis.get('foo');
//     console.log(ret);
//   } catch (error) {
//     console.log(error, '操作失败');
//   }
// }

// main();

// redis
//   .get('foo')
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log('获取失败', err);
//   });

// 2. 操作 Redis 数据库
// redis.set('foo', 'bar', (err, ret) => {
//   if (err) {
//     return console.log('写入失败', err);
//   }
//   console.log('写入成功', ret);
// });

// redis.get('foo', (err, ret) => {
//   if (err) {
//     return console.log('获取失败', err);
//   }
//   console.log(ret);
// });
