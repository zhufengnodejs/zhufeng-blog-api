'use strict';
const BaseController = require('./base');
class CategoriesController extends BaseController {
  //查询分类列表
  async index() {
    let { ctx } = this;
    let { pageNum = 1, pageSize = 10, keyword } = ctx.query;
    pageNum = isNaN(pageNum) ? 1 : parseInt(pageNum);
    pageSize = isNaN(pageSize) ? 1 : parseInt(pageSize);
    let query = {};
    if (keyword) {
      query.title = new RegExp(keyword);
    }
    let total = await ctx.model.Category.count(query);
    let items=await ctx.model.Category.find(query).skip((pageNum-1)*pageSize).limit(pageSize);
    this.success({
      items,
      pageNum,
      pageSize,
      total,
      pageCount: Math.ceil(total / pageSize)
    });
  }
  //添加分类
  async create() {
    let { ctx } = this;
    let category = ctx.request.body;
    try {
      let doc = await ctx.model.Category.create(category);
      this.success('success');
    } catch (err) {
      this.error(error);
    }
  }
  //修改分类
  async update() {
    let { ctx } = this;
    let id = ctx.params.id;
    let category = ctx.request.body;
    try {
      let result = await ctx.model.Category.findByIdAndUpdate(id, category);
      this.success('success');
    } catch (err) {
      this.error(error);
    }
  }
  //删除分类
  async destroy() {
    let { ctx } = this;
    let id=ctx.params.id;
    let {ids=[]}=ctx.request.body;
    ids.push(id);
    try {
      await ctx.model.Category.remove({_id: {$in:ids}});
      this.success('success');
    } catch (error) {
      this.error(error);
    }
  }
}

module.exports = CategoriesController;