const Koa = require('koa');
const markdown = require('..');
const app = new Koa();
const path = require('path');

app.use(markdown({
  baseUrl: '/docs',
  root: path.join(__dirname, '/docs'),
  layout: path.join(__dirname, '/docs/layout.html'),
  cache: false,
  indexName: 'readme'
}));

app.use((ctx, next) => {
  ctx.status = 404;
  ctx.body = 'page not found';
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(7001);
  console.log('app listening on 7001, visit http://localhost:7001/docs to visit');
}

module.exports = app.callback();
