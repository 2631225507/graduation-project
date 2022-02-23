'use strict';
const Controller = require('./base');

class OrderController extends Controller {
    // 获取订单
    async getOrder() {
        const { ctx } = this;
        const query = ctx.query
        const res = await ctx.service.order.getOrder(query);
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: 'IOError', msg: '查询失败' }
        }
    }

    // 添加订单
    async createOrder() {
        const { ctx } = this;
        const body = ctx.request.body;
        console.log(body, 1111);
        body.mainTable.goods_name = body.mainTable.goods_name.join();
        const res = await ctx.service.order.createOrder(body);
        if (res.success) {
            this.success('添加成功');
        } else {
            this.error('添加失败 ' + (res.msg || ''));
        }
    }

     // 删除订单
     async deleteOrder() {
        const { ctx } = this;
        const body = ctx.request.body;
        const res = await ctx.service.order.deleteOrder(body);
        if (res.success) {
            this.success('删除成功');
        } else {
            this.error('删除失败 ' + (res.msg || ''));
        }
    }
}

module.exports = OrderController;
