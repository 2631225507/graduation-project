'use strict';

const Service = require('egg').Service;

class ProvinceService extends Service {
  async find() {
    const { ctx } = this;
    const province = await ctx.model.Province.findAll({
      attributes: ['code', 'name'],
    });
    return province;
  }
}

module.exports = ProvinceService;
