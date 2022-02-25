'use strict';
const moment = require('moment');
const Service = require('egg').Service;

class ChartService extends Service {
    // 获取订单
    async getCustomerStatistics(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.client_id) {
            where.client_id = { [Op.like]: `%${query.client_id}%` }
        }
        if (query.created_at) {
            const dataTime = Array.from(query.created_at)
            const start = moment(new Date(dataTime[0]),moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss');
            const end = moment(new Date(dataTime[1]),moment.ISO_8601).format('YYYY-MM-DD HH:mm:ss');
            const time = [start,end]
            // console.log(time);
            // where.created_at = { [Op.between]: `${time}` }
        }
        return await ctx.model.Order.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.OrderDetail,
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        });
    }
}

module.exports = ChartService;
