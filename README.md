koa-markdown
============

[![Build Status](https://secure.travis-ci.org/koajs/koa-markdown.png)](http://travis-ci.org/koajs/koa-markdown)

Auto convert markdown to html for koa. Inspired by [connect-markdown](https://github.com/expressjs/connect-markdown).
Powered by [remarkable](https://github.com/jonschlinkert/remarkable).

[![NPM](https://nodei.co/npm/koa-markdown.png?downloads=true)](https://nodei.co/npm/koa-markdown/)

## Usage

```js
const Koa = require('koa');
const markdown = require('koa-markdown');
const path = require('path');

const app = new Koa();
app.use(markdown({
  root: path.join(__dirname, '/docs'),
  baseUrl: '/docs'
}));

app.listen(7001);
```

Or you can checkout the [example](https://github.com/koajs/koa-markdown/tree/master/example).

## Options

* **root**: the markdown file root directory (required)
* **baseUrl**: base url of koa-markdown (required)
* **layout**: layout html file, default is `root`/layout.html
* **titleHolder**: title place holder in layout.html, default is {TITLE}
* **bodyHolder**: body place holder in layout.html, default is {BODY}
* **indexName**: request base url will get `indexName`.md, default is 'index'
* **cache**: cache the html page, default is `false`
* **render**: custom render function, default is `markdown-it.render`
* **mdOptions**: markdown-it options, by defualt, `koa-markdown` is using `markdown-it` as it's render.

## Licences

MIT
