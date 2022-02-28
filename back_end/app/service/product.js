'use strict';
const Service = require('egg').Service;

class ProductService extends Service {
    // 查询产品信息
    async page(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.product_name) {
            where.product_name = { [Op.like]: `%${query.product_name}%` }
        }
        try {
            return await ctx.model.Product.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit,
                include: [{
                    model: ctx.model.ProductDetail,
                }],
                // raw:true 
            });
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // 添加产品信息
    async create(product, info) {
        const { ctx } = this
        try {
            const data = await ctx.model.Product.create(product)
            const dataInfo = await ctx.model.ProductDetail.bulkCreate(info)
            return data && dataInfo
        } catch (error) {
            console.log(error);
            return false
        }
    }

    // 修改产品信息
    async update(product_id, product_number, product, info) {
        const { ctx } = this;
        product.updated_at = ctx.helper.formatTime(new Date());
        try {
            const data = await ctx.model.Product.update(product, {
                where: {
                    product_id
                },
            });
            const deleteInfo = await ctx.model.ProductDetail.destroy({
                where: {
                    product_number
                },
            });
            const dataInfo = await ctx.model.ProductDetail.bulkCreate(info)
            return true
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 删除产品信息
    async delete({ product_id, product_number }) {
        const { ctx } = this;
        try {
            await ctx.model.Product.destroy({
                where: {
                    product_id,
                },
            });
            await ctx.model.ProductDetail.destroy({
                where: {
                    product_number,
                },
            });
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    // 删除产品详情的信息
    async deleteDetail({ detail_id }) {
        const { ctx } = this;
        try {
            await ctx.model.ProductDetail.destroy({
                where: {
                    detail_id,
                },
            });
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
}

module.exports = ProductService;
