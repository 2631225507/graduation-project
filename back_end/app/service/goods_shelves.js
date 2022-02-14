'use strict';
const moment = require('moment');
const Service = require('egg').Service;

class GoodsShelvesService extends Service {
    // 查询货架信息
    async page(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.shelf_number) {
            where.shelf_number = { [Op.like]: `%${query.shelf_number}%` }
        }
        try {
            return await ctx.model.GoodsShelves.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit
            });
        } catch (error) {
            return false
        }
    }

    // 添加货架信息
    async create(body) {
        const { ctx } = this
        try {
            await ctx.model.GoodsShelves.create(body)
            return true
        } catch (error) {
            return false
        }
    }

    // 修改货架信息
    async update(body) {
        const { ctx } = this;
        body.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        try {
            return await ctx.model.GoodsShelves.update(body, {
                where: {
                    shelf_id: body.id,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 删除货架信息
    async delete(body) {
        const { ctx } = this;
        try {
          await ctx.model.GoodsShelves.destroy({
            where: {
                shelf_id: body.id,
            },
          });
          return { success: true };
        } catch (error) {
          console.log(error);
          return { success: false };
        }
      }
}

module.exports = GoodsShelvesService;
