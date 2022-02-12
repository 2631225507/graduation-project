'use strict';
const Controller = require('./base');

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
            this.error('登录失败！账号或密码错误');
        }
    }
    async getInfo() {
        const { ctx } = this;
        const body = ctx.request.body;
        if (body) {
            ctx.body = {
                code: 200,
                success: true,
                data: {
                    avatar: "https://img1.baidu.com/it/u=2698029976,2718168151&fm=253&fmt=auto&app=120&f=JPEG?w=519&h=500",
                    introduction: "我是超级管理员",
                    name: "超级管理员", 
                    roles: ["admin"]
                }
            }
        } else {
            ctx.body = { success: false }
        }
    }

    async logout() {
        const { ctx } = this;
        const body = ctx.request.body;
        if (body) {
            ctx.body = {
                code: 200,
                data: "success"
            }
        } else {
            ctx.body = { success: false }
        }
    }
}

module.exports = UserController;
