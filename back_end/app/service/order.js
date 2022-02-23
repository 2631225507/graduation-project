'use strict';
const Service = require('egg').Service;

class OrderService extends Service {
    // 获取订单
    async getOrder(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.order_number) {
            where.order_number = { [Op.like]: `%${query.order_number}%` }
        }
        return await ctx.model.Order.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.OrderDetail,
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        });
    }

    // 添加订单
    async createOrder(body) {
        const { ctx } = this;

        try {
            return await ctx.model.transaction(async t => {
                // 创建订单信息
                const createOrder = await ctx.model.Order.create(body.mainTable, { transaction: t });
                const OrderDetailArr = body.infoTable.map(item => {
                    return { order_id: createOrder.order_id, goods: item.goods, size: item.size, stock: parseInt(item.stock), price: item.price, order_quantity: parseInt(item.order_quantity) };
                });
                // 创建订单详情信息
                const res = await ctx.model.OrderDetail.bulkCreate(OrderDetailArr, { transaction: t });

                return { success: res.length > 0 };
            });
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    // 删除订单
    async deleteOrder({ order_id }) {
        const { ctx } = this;
        try {
            await ctx.model.Order.destroy({
                where: {
                    order_id,
                },
            });
            await ctx.model.OrderDetail.destroy({
                where: {
                    order_id,
                },
            });
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

}

module.exports = OrderService;
