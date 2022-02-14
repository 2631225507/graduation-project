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

        ctx.body = await ctx.service.goodsShelves.page(query)
    }

    // 添加货架信息
    async create() {
        const { ctx } = this;
        const body = ctx.request.body
        const res = await ctx.service.goodsShelves.create(body)
        if (res) {
            ctx.body = { success: true, msg: '添加成功' }
        } else {
            ctx.body = { success: false, msg: '添加失败' }
        }
    }

    // 修改货架信息
    async update() {
        const { ctx } = this;
        const body = ctx.request.body;

        ctx.validate({
            id: { type: 'integer', required: true },
        }, body);

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

        ctx.validate({
            id: { type: 'integer', required: true },
        }, body);

        const res = await ctx.service.goodsShelves.delete(body);
        if (res.success) {
            this.success('删除成功');
        } else {
            this.error('删除失败 ' + (res.msg || ''));
        }
    }
}

module.exports = GoodsShelvesController;

