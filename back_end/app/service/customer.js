'use strict';
const Service = require('egg').Service;

class CustomertService extends Service {
    // 查询客户信息
    async page(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.customer_name) {
            where.customer_name = { [Op.like]: `%${query.customer_name}%` }
        }
        try {
            return await ctx.model.Customer.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit
            });
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // 添加客户信息
    async create(body) {
        const { ctx } = this
        try {
            await ctx.model.Customer.create(body)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // 修改客户信息
    async update(body) {
        const { ctx } = this;
        body.updated_at = ctx.helper.formatTime(new Date());;
        try {
            await ctx.model.Customer.update(body, {
                where: {
                    customer_id: body.customer_id
                },
            });
            return true
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 删除客户信息
    async delete({ customer_id }) {
        const { ctx } = this;
        try {
            await ctx.model.Customer.destroy({
                where: {
                    customer_id,
                },
            });
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
}

module.exports = CustomertService;
