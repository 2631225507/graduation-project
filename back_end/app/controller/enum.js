'use strict';

const Controller = require('egg').Controller;

class Enum extends Controller {
    async find() {
        const { ctx } = this;
        const res = await ctx.service.enum.find();
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: IOError, msg: '查询失败' }
        }
    }


}

module.exports = Enum;
