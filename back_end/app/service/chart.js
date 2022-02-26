'use strict';
const Service = require('egg').Service;

class ChartService extends Service {
    // 获取客户数据统计
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
            const start = ctx.helper.formatTime(dataTime[0]);
            const end = ctx.helper.formatTime(dataTime[1]);
            where.created_at = { [Op.between]: [new Date(start).toISOString(), new Date(end).toISOString()] }

        }
        return await ctx.model.Order.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.OrderDetail,
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        });
    }

    // 获取首页年度数据
    // （1）获取入库数据
    async getReturninfo(query) {
        const { app, ctx } = this;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.start && query.end) {
            where.created_at = { [Op.between]: [new Date(query.start).toISOString(), new Date(query.end).toISOString()] }
        }
        return await ctx.model.Warehousing.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.WarehousingDetail,
            where,
            limit: 999,
            offset: 0,
        });
    }

    // （2）获取订单总数
    async getOrderTotal(query) {
        const { app, ctx } = this;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.start && query.end) {
            where.created_at = { [Op.between]: [new Date(query.start).toISOString(), new Date(query.end).toISOString()] }
        }
        return await ctx.model.Order.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.OrderDetail,
            where,
            limit: 999,
            offset: 0,
        });
    }
}

module.exports = ChartService;
