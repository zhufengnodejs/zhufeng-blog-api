'use strict';

const BaseController = require('./base');
class UserController extends BaseController {
  async signup() {
    let { ctx,app } = this;
    let user = ctx.request.body;
    try {
      let doc = await ctx.model.User.create(user);
      this.success('success');
    } catch (error) {
      this.error(error);
    }
  }

  async signin() {
    let { ctx ,app} = this;
    let user=ctx.request.body;
    try {
      let doc = await ctx.model.User.findOne(user);
      if (doc) {
        let token = app.jwt.sign({user_id:doc._id,isAdmin:true}, app.config.jwt.secret,{expiresIn:app.config.jwt.expiresIn});
        console.log('token',token);
        this.success(token);
      } else {
        this.error('用户名或密码错误!');
      }
    } catch (error) {
      this.error(error);
    }
  }

  async signout() {
    let { ctx } = this;
    ctx.session.user = null;
    this.success('success');
  }
}

module.exports = UserController;
