'use strict';

const Controller = require('egg').Controller;
const { User } = require('../model');

class UserController extends Controller {
  async signup() {
    let { ctx } = this;
    let user = ctx.request.body;
    try {
      let doc = await User.create(user);
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

  async signin() {
    let { ctx } = this;
    let user = ctx.request.body;
    try {
      let doc = await User.findOne(user);
      if (doc) {
        ctx.session.user = doc;
        ctx.body = {
          "code": 0,
          "message": "success"
        };
      } else {
        ctx.body = {
          "code": 1,
          "message": '用户名或密码错误!'
        };
      }
    } catch (err) {
      ctx.body = {
        "code": 1,
        "message": err.toString()
      };
    }
  }

  async signout() {
    let { ctx } = this;
    ctx.session.user = null;
    ctx.body = {
      "code": 0,
      "message": "success"
    }
  }
}

module.exports = UserController;
