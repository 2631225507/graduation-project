'use strict';

const Service = require('egg').Service;

class CityService extends Service {
  async find(code) {
    const { ctx } = this;
    const city = await ctx.model.City.findAll({
      attributes: ['code', 'name'],
      where: {
        province_code:parseInt(code)
      }
    });
    return city;
  }
}

module.exports = CityService;
