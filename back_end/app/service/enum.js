'use strict';

const Service = require('egg').Service;

class EnumService extends Service {
  async find() {
    const { ctx } = this;
    const enums = await ctx.model.Enum.findAll({
      where: {
        type: 1
      }
    });
    return enums;
  }
}

module.exports = EnumService;
