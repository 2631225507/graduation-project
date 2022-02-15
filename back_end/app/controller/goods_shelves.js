'use strict';
const Controller = require('./base');

class GoodsShelvesController extends Controller {
    // 查询货架信息
    async page() {
        const { ctx } = this;
        const query = ctx.query

        ctx.validate({
            limit: { type: 'string', required: true },
            page: { type: 'string', required: true }
        }, ctx.query)

        const res = await ctx.service.goodsShelves.page(query)
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: IOError, msg: '查询失败', data: [] }
        }
    }

    // 添加货架信息
    async create() {
        const { ctx } = this;
        const body = ctx.request.body
        const res = await ctx.service.goodsShelves.create(body)
        if (res) {
            this.success('添加成功');
        } else {
            this.error('添加失败');
        }
    }

    // 修改货架信息
    async update() {
        const { ctx } = this;
        const body = ctx.request.body;

        const res = await ctx.service.goodsShelves.update(body);
        if (res) {
            this.success('修改成功');
        } else {
            this.error('修改失败');
        }
    }

    // 删除货架信息
    async delete() {
        const { ctx } = this;
        const body = ctx.request.body;

        const res = await ctx.service.goodsShelves.delete(body);
        if (res.success) {
            this.success('删除成功');
        } else {
            this.error('删除失败 ' + (res.msg || ''));
        }
    }
}

module.exports = GoodsShelvesController;

