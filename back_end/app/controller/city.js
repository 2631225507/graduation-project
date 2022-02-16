'use strict';

const Controller = require('egg').Controller;

class City extends Controller {
  async find() {
    const { ctx } = this;
    const { code } = ctx.query
    ctx.validate({
      code: { type: 'string', required: true },
    }, ctx.query)
    const res = await ctx.service.city.find(code);
    if (res) {
      ctx.body = { code: 200, msg: '查询成功', data: res }
    } else {
      ctx.body = { code: IOError, msg: '查询失败' }
    }
  }

}

module.exports = City;
