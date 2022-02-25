'use strict';
const Service = require('egg').Service;
const moment = require('moment');
const Sequelize = require('sequelize')
class WarehousingService extends Service {
    // 获取入库信息
    async getWarehousing(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.order_number) {
            where.order_number = { [Op.like]: `%${query.order_number}%` }
        }
        // 用于货架详情
        if (query.shelf_id) {
            where.shelf_id = { [Op.like]: `%${query.shelf_id}%` }
        }
        return await ctx.model.Warehousing.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.WarehousingDetail,
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        });
    }

    // 添加入库信息
    async createWarehousing(body) {
        const { ctx } = this;
        try {
            return await ctx.model.transaction(async t => {
                // 创建入库信息
                const createInfo = await ctx.model.Warehousing.create(body.mainTable, { transaction: t });
                const WarehousingDetailArr = body.infoTable.map(item => {
                    return { chargeback_id: createInfo.chargeback_id, product: item.goods, size: item.size, price: item.price, amount: parseInt(item.order_quantity) };
                });
                // 添加时，货架箱数+1
                await ctx.model.GoodsShelves.update({
                    access_box: Sequelize.literal('`access_box` +1')
                }, {
                    where: {
                        shelf_id: body.mainTable.shelf_id
                    }
                }, { transaction: t });
                // 创建入库详情信息
                const res = await ctx.model.WarehousingDetail.bulkCreate(WarehousingDetailArr, { transaction: t });
                return { success: res.length > 0 };
            });
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    // 修改入库信息
    async updateWarehousing(body) {
        const { ctx } = this;
        body.newValue.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        try {
            // 修改货架时，新货架+1，旧货架-1
            if (body.newValue.shelf_id != body.oldValue.shelf_id) {
                await ctx.model.GoodsShelves.update({
                    access_box: Sequelize.literal('`access_box` +1')
                }, {
                    where: {
                        shelf_id: body.newValue.shelf_id
                    }
                });
                await ctx.model.GoodsShelves.update({
                    access_box: Sequelize.literal('`access_box` -1')
                }, {
                    where: {
                        shelf_id: body.oldValue.shelf_id
                    }
                });
            }
            await ctx.model.Warehousing.update(body.newValue, {
                where: {
                    chargeback_id: body.newValue.chargeback_id
                },
            });
            return true
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 删除入库信息
    async deleteWarehousing({ chargeback_id, shelf_id }) {
        const { ctx } = this;
        try {
            // 删除入库表对应数据
            await ctx.model.Warehousing.destroy({
                where: {
                    chargeback_id,
                },
            });
            // 删除时，货架箱数-1
            await ctx.model.GoodsShelves.update({
                access_box: Sequelize.literal('`access_box` -1')
            }, {
                where: {
                    shelf_id
                }
            });
            // 删除入库详情表关联数据
            await ctx.model.WarehousingDetail.destroy({
                where: {
                    chargeback_id,
                },
            });
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

}

module.exports = WarehousingService;
