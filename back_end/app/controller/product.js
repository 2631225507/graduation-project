'use strict';
const Controller = require('./base');

class ProductController extends Controller {
    // 查询产品信息
    async page() {
        const { ctx } = this;
        const query = ctx.query

        ctx.validate({
            limit: { type: 'string', required: true },
            page: { type: 'string', required: true }
        }, ctx.query)

        const res = await ctx.service.product.page(query)
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: 'IOError', msg: '查询失败' }
        }
    }

    // 添加产品信息
    async create() {
        const { ctx } = this;
        const body = ctx.request.body
        const product = {
            product_number:body.product_number,
            product_name:body.product_name,
            img:body.img,
            price:body.price,
            type:body.type
        }
        const info = body.product_details
        info.forEach(item => {
            item['product_number'] = body.product_number
        });
        const res = await ctx.service.product.create(product,info)
        if (res) {
            this.success('添加成功');
        } else {
            this.error('添加失败');
        }
    }

    // 修改产品信息
    async update() {
        const { ctx } = this;
        const body = ctx.request.body;
        const product_id =body.product_id
        const product_number =body.product_number
        const product = {
            product_name:body.product_name,
            img:body.img,
            price:body.price,
            type:body.type
        }
        const info = body.product_details
        info.forEach(item => {
            item['product_number'] = product_number
        });
        const res = await ctx.service.product.update(product_id,product_number,product,info);
        if (res) {
            this.success('修改成功');
        } else {
            this.error('修改失败');
        }
    }

    // 删除产品信息
    async delete() {
        const { ctx } = this;
        const body = ctx.request.body;
        const res = await ctx.service.product.delete(body);
        if (res.success) {
            this.success('删除成功');
        } else {
            this.error('删除失败 ' + (res.msg || ''));
        }
    }

    // 删除产品详情的信息
    async deleteDetail() {
        const { ctx } = this;
        const body = ctx.request.body;
        const res = await ctx.service.product.deleteDetail(body);
        if (res.success) {
            this.success('删除成功');
        } else {
            this.error('删除失败 ' + (res.msg || ''));
        }
    }
}

module.exports = ProductController;

