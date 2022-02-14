'use strict';

const Controller = require('egg').Controller;

class City extends Controller {
  async find() {
    const { ctx } = this;
    const { code } = ctx.query
    ctx.validate({
      code: { type: 'string', required: true },
    }, ctx.query)
    ctx.body = await ctx.service.city.find(code);
  }

}

module.exports = City;
