'use strict';
const Service = require('egg').Service;
const Sequelize = require('sequelize')

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
        if ((query.is_into??''!='')) {
            where.is_into = { [Op.eq]: `${query.is_into}` }
        }
        if ((query.operator_id??''!='')) {
            where.operator_id = { [Op.eq]: `${query.operator_id}` }
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
                for (let i = 0; i < body.infoTable.length; i++) {
                    await ctx.model.ProductDetail.update({
                        stock: body.infoTable[i].surplus
                    }, {
                        where: {
                            detail_id: body.infoTable[i].detail_id
                        },
                    }, { transaction: t });
                }
                // 创建订单详情信息
                const res = await ctx.model.OrderDetail.bulkCreate(OrderDetailArr, { transaction: t });

                return { success: res.length > 0 };
            });
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    // 修改订单
    async updateOrder(body) {
        const { ctx } = this;
        body.updated_at = ctx.helper.formatTime(new Date());
        try {
            await ctx.model.Order.update(body, {
                where: {
                    order_id: body.order_id
                },
            });
            return true
        } catch (error) {
            console.log(error);
            return null;
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

    // 出库
    async exWarehouse(body) {
        const { ctx } = this;
        body.updated_at = ctx.helper.formatTime(new Date());;
        try {
            await ctx.model.Order.update({
                is_issue: body.is_issue,
                delivery_time: body.updated_at,
                updated_at: body.updated_at
            }, {
                where: {
                    order_id: body.order_id
                },
            });
            return true
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 订单是否入库
    async updateInto(body) {
        const { ctx } = this;
        body.updated_at = ctx.helper.formatTime(new Date());;
        try {
            await ctx.model.Order.update({
                is_into: body.is_into,
                updated_at: body.updated_at
            }, {
                where: {
                    order_id: body.order_id
                },
            });
            return true
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = OrderService;
