'use strict';

const Service = require('egg').Service;

class AreaService extends Service {
  async find(code) {
    const { ctx } = this;
    const area = await ctx.model.Area.findAll({
      attributes: ['code', 'name'],
      where: {
        city_code:parseInt(code)
      }
    });
    return area;
  }
}

module.exports = AreaService;
