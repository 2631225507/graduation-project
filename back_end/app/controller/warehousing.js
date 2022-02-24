'use strict';
const Controller = require('./base');

class WarehousingController extends Controller {
    // 获取入库信息
    async getWarehousing() {
        const { ctx } = this;
        const query = ctx.query
        const res = await ctx.service.warehousing.getWarehousing(query);
        if (res) {
            ctx.body = { code: 200, msg: '查询成功', data: res }
        } else {
            ctx.body = { code: 'IOError', msg: '查询失败' }
        }
    }

    // 添加入库信息
    async createWarehousing() {
        const { ctx } = this;
        const body = ctx.request.body;
        const res = await ctx.service.warehousing.createWarehousing(body);
        if (res.success) {
            this.success('添加成功');
        } else {
            this.error('添加失败 ' + (res.msg || ''));
        }
    }

    // 修改入库信息
    async updateWarehousing() {
        const { ctx } = this;
        const body = ctx.request.body;
        const res = await ctx.service.warehousing.updateWarehousing(body);
        if (res) {
            this.success('修改成功');
        } else {
            this.error('修改失败');
        }
    }

     // 删除入库信息
     async deleteWarehousing() {
        const { ctx } = this;
        const body = ctx.request.body;
        const res = await ctx.service.warehousing.deleteWarehousing(body);
        if (res.success) {
            this.success('删除成功');
        } else {
            this.error('删除失败 ' + (res.msg || ''));
        }
    }
}

module.exports = WarehousingController;
