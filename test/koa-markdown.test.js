/*!
 * koa-markdown - test/koa-markdown.test.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';
/* eslint-env mocha */

/**
 * Module dependencies.
 */

const should = require('should');
const path = require('path');
const Koa = require('koa');
const app = require('../example/app');
const request = require('supertest');
const markdown = require('..');

describe('test/koa-markdown.test.js', () => {
  it('should error with out options', () => {
    (() => {
      markdown();
    }).should.throw('options.root required');
    (() => {
      markdown({baseUrl: '/docs'});
    }).should.throw('options.root required');
  });

  it('should render with $& content', done => {
    request(app)
    .get('/docs/replace')
    .expect(/\$&amp;test/)
    .expect(200, done);
  });

  it('should render $ alone', done => {
    request(app)
      .get('/docs/replace-alone')
      .expect(/\${1}/g)
      .expect(res => {
        const testRegEx = /\${2}/g;

        if (true === testRegEx.test(res.text)) {
          throw new Error('Found double dollar signs $$');
        }
      })
      .expect(200, done);
  });

  it('should request path not match 404', done => {
    request(app)
    .get('/docsabc')
    .expect(404, done);
  });

  it('should request method not match 404', done => {
    request(app)
    .post('/docs')
    .expect(404, done);
  });

  it('should request not exist file 404', done => {
    request(app)
    .get('/docs/not_exist')
    .expect(404, done);
  });

  it('should request /docs as index ok', done => {
    request(app)
    .get('/docs')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(/<title>koa-markdown<\/title>/)
    .expect(200, done);
  });

  it('should request /docs/ as index ok', done => {
    request(app)
    .get('/docs/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(/<title>koa-markdown<\/title>/)
    .expect(200, done);
  });

  it('should request /docs/index ok', done => {
    request(app)
    .get('/docs/index')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200, done);
  });

  it('should request folder /docs/f/ ok', done => {
    request(app)
    .get('/docs/f/')
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(200, done);
  });

  it('should request /docs/index/ 404', done => {
    request(app)
    .get('/docs/index/')
    .expect(404, done);
  });

  describe('custom options.render', () => {
    it('should work', done => {
      const app = new Koa();
      const docs = path.join(__dirname, '..', 'example', 'docs');
      app.use(markdown({
        baseUrl: '/docs',
        root: docs,
        cache: true,
        render: content => {
          return 'hack content, length ' + content.length;
        }
      }));

      request(app.listen())
      .get('/docs')
      .expect(200)
      .expect(/hack content, length 352/, err => {
        should.not.exist(err);

        // should get from cache
        request(app.listen())
        .get('/docs')
        .expect(200)
        .expect(/hack content, length 352/, done);
      });
    });
  });
});
