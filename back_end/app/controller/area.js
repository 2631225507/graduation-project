'use strict';

const Controller = require('egg').Controller;

class Area extends Controller {
  async find() {
    const { ctx } = this;
    const { code } = ctx.query
    ctx.validate({
      code: { type: 'string', required: true },
    }, ctx.query)
    ctx.body = await ctx.service.area.find(code);
  }

}

module.exports = Area;
