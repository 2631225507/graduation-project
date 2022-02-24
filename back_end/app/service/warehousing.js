'use strict';
const Service = require('egg').Service;
const moment = require('moment');

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
        return await ctx.model.Warehousing.findAndCountAll({
            distinct: true, // 不加distinct，count和实际不符
            include: ctx.model.WarehousingDetail,
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit,
        });
    }

    // // 添加入库信息
    async createWarehousing(body) {
        const { ctx } = this;
        try {
            return await ctx.model.transaction(async t => {
                // 创建订单信息
                const createInto = await ctx.model.Warehousing.create(body.mainTable, { transaction: t });
                const WarehousingDetailArr = body.infoTable.map(item => {
                    return { chargeback_id: createInto.chargeback_id, product: item.goods, size: item.size, price: item.price, amount: parseInt(item.order_quantity) };
                });
                // 创建订单详情信息
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
        body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        try {
            await ctx.model.Warehousing.update(body, {
                where: {
                    chargeback_id: body.chargeback_id
                },
            });
            return true
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 删除入库信息
    async deleteWarehousing({ chargeback_id }) {
        const { ctx } = this;
        try {
            await ctx.model.Warehousing.destroy({
                where: {
                    chargeback_id,
                },
            });
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
