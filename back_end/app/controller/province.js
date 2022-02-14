'use strict';

const Controller = require('egg').Controller;

class Province extends Controller {
  async find() {
    const { ctx } = this;
    ctx.body = await ctx.service.province.find();
  }

}

module.exports = Province;
