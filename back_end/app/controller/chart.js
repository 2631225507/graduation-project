'use strict';
const Controller = require('./base');

class ChartController extends Controller {
    // 获取订单
    async getCustomerStatistics() {
        const { ctx } = this;
        // const query = ctx.query
        const query =ctx.request.body;
        const res = await ctx.service.chart.getCustomerStatistics(query);
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: 'IOError', msg: '查询失败' }
        }
    }
}

module.exports = ChartController;
