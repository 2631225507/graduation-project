'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const body = ctx.request.body;
        ctx.validate({
            username: { type: 'string', required: true },
            password: { type: 'string', required: true },
        }, body);

        const res = await ctx.service.user.login(body);
        if (res) {
            this.success(res);
        } else {
            this.error('登录失败！');
        }
    }
}

module.exports = UserController;
