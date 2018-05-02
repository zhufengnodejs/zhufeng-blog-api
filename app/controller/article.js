'use strict';

const Controller = require('egg').Controller;
const { Article } = require('../model');

class ArticleController extends Controller {
  async add() {
    let { ctx } = this;
    let article = ctx.request.body;
    console.log('ctx.session', ctx.session);
    article.user = ctx.session.user._id;
    try {
      let doc = await Article.create(article);
      ctx.body = {
        "code": 0,
        "message": "success"
      };
    } catch (err) {
      ctx.body = {
        "code": 1,
        "message": err.toString()
      };
    }
  }

  async update() {
    let { ctx } = this;
    let id = ctx.params.id;
    let article = ctx.request.body;
    try {
      let result = await Article.findByIdAndUpdate(id, article);
      ctx.body = {
        "code": 0,
        "message": "success"
      };
    } catch (err) {
      ctx.body = {
        "code": 1,
        "message": err.toString()
      };
    }
  }

  async list() {
    let { ctx } = this;
    let { pageNum = 1, pageSize = 10, keyword } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 1 : parseInt(pageSize);
    let query = {};
    if (keyword) {
      query.title = new RegExp(keyword);
    }
    let total = await Article.count(query);
    let articles = await Article.find(query).skip((pageNum - 1) * pageSize).limit(pageSize);
    ctx.body = {
      code: 0,
      data: {
        articles,
        pageNum,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize)
      }
    };
  }

  async remove() {
    let { ctx } = this;
    let _id = ctx.params.id;
    try {
      await Article.findOneAndRemove({ _id });
      ctx.body = {
        "code": 0,
        "message": "success"
      };
    } catch (error) {
      ctx.body = {
        "code": 1,
        "message": err.toString()
      };
    }
  }


  async discuss() {
    let { ctx } = this;
    let id = ctx.params.id;
    let comment = ctx.request.body;
    comment.user = ctx.session.user._id;
    try {
      await Article.findByIdAndUpdate(id, { $push: { comments: comment } });
      ctx.body = {
        "code": 0,
        "message": "success"
      };
    } catch (error) {
      ctx.body = {
        "code": 1,
        "message": err.toString()
      };
    }
  }
}

module.exports = ArticleController;