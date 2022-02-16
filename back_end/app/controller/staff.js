'use strict';
const Controller = require('./base');

class StaffController extends Controller {
    // 查询员工信息
    async page() {
        const { ctx } = this;
        const query = ctx.query

        ctx.validate({
            limit: { type: 'string', required: true },
            page: { type: 'string', required: true }
        }, ctx.query)

        const res = await ctx.service.staff.page(query)
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: IOError, msg: '查询失败' }
        }
    }

    // 添加员工信息
    async create() {
        const { ctx } = this;
        const body = ctx.request.body
        const res = await ctx.service.staff.create(body)
        if (res) {
            this.success('添加成功');
        } else {
            this.error('添加失败');
        }
    }

    // 修改员工信息
    async update() {
        const { ctx } = this;
        const body = ctx.request.body;

        const res = await ctx.service.staff.update(body);
        if (res) {
            this.success('修改成功');
        } else {
            this.error('修改失败');
        }
    }

    // 删除员工信息
    async delete() {
        const { ctx } = this;
        const body = ctx.request.body;
        const res = await ctx.service.staff.delete(body);
        if (res.success) {
            this.success('删除成功');
        } else {
            this.error('删除失败 ' + (res.msg || ''));
        }
    }
}

module.exports = StaffController;

