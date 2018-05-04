'use strict';

const BaseController = require('./base');

class ArticleController extends BaseController {
  async index() {
    let { ctx } = this;
    let { pageNum = 1, pageSize = 10, keyword } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 1 : parseInt(pageSize);
    let query = {};
    if (keyword) {
      query.title = new RegExp(keyword);
    }
    let total = await ctx.model.Article.count(query);
    let items = await ctx.model.Article.find(query).populate('category').populate('comments').skip((pageNum - 1) * pageSize).limit(pageSize);
    this.success({
      items,
      pageNum,
      pageSize,
      total,
      pageCount: Math.ceil(total / pageSize)
    });
  }

  async create() {
    let { ctx } = this;
    let article = ctx.request.body;
    article.user=this.user._id;
    try {
      let doc=await ctx.model.Article.create(article);
      this.success('success');
    } catch (error) {
      this.error(error);
    }
  }

  async update() {
    let { ctx } = this;
    let id = ctx.params.id;
    let article = ctx.request.body;
    try {
      let result = await ctx.model.Article.findByIdAndUpdate(id, article);
      this.success('success');
    } catch (err) {
      this.error(error);
    }
  }

  async destroy() {
    let { ctx } = this;
    let {ids}=ctx.request.body;
    try {
      await ctx.model.Article.remove({_id: {$in:ids}});
      this.success('success');
    } catch (error) {
      this.error(error);
    }
  }

  async updatePv() {
    let { ctx } = this;
    let id = ctx.params.id;
    try {
      let result=await ctx.model.Article.findByIdAndUpdate(id,{$inc: {pv:1}});
      this.success('success');
    } catch (err) {
      ctx.body = {
        "code": 1,
        "message": err.toString()
      };
    }
  }

  async comment() {
    let { ctx } = this;
    let id=ctx.params.id;
    let comment=ctx.request.body;
    comment.user=this.user._id;;
    try {
      let result=await ctx.model.Article.findByIdAndUpdate(id,{$push: {comments:comment}});
      this.success('success');
    } catch (err) {
      this.error(error);
    }
  }
}

module.exports = ArticleController;