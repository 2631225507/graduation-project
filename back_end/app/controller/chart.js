'use strict';
const Controller = require('./base');

class ChartController extends Controller {
    // 获取客户数据统计
    async getCustomerStatistics() {
        const { ctx } = this;
        // const query = ctx.query
        const query = ctx.request.body;
        const res = await ctx.service.chart.getCustomerStatistics(query);
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: 'IOError', msg: '查询失败' }
        }
    }

    // 获取首页年度数据
    // （1）获取入库数据
    async getReturninfo() {
        const { ctx } = this;
        const query = ctx.request.body;
        const res = await ctx.service.chart.getReturninfo(query);
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: 'IOError', msg: '查询失败' }
        }
    }

    // （2）获取订单总数
    async getOrderTotal() {
        const { ctx } = this;
        const query = ctx.request.body;
        const res = await ctx.service.chart.getOrderTotal(query);
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: 'IOError', msg: '查询失败' }
        }
    }
}

module.exports = ChartController;
