'use strict';
const Service = require('egg').Service;

class StaffService extends Service {
    // 查询员工信息
    async page(query) {
        const { app, ctx } = this;
        const { limit, page } = query;
        const Op = app.Sequelize.Op;
        const where = {}
        if (query.staff_name) {
            where.staff_name = { [Op.like]: `%${query.staff_name}%` }
        }
        try {
            return await ctx.model.Staff.findAndCountAll({
                where,
                limit: parseInt(limit),
                offset: (page - 1) * limit
            });
        } catch (error) {
            return false
        }
    }

    // 添加员工信息
    async create(body) {
        const { ctx } = this
        try {
            await ctx.model.Staff.create(body)
            return true
        } catch (error) {
            console.log(error);

            return false
        }
    }

    // 修改员工信息
    async update(body) {
        const { ctx } = this;
        body.updated_at = ctx.helper.formatTime(new Date());
        try {
            return await ctx.model.Staff.update(body, {
                where: {
                    staff_id: body.staff_id,
                },
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // 删除员工信息
    async delete({ staff_id }) {
        const { ctx } = this;
        try {
            await ctx.model.Staff.destroy({
                where: {
                    staff_id,
                },
            });
            return { success: true };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }
}

module.exports = StaffService;
