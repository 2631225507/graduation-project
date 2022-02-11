'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async find(id) {
    try {
      await ctx.model.User.findOne({ where: { id }});
      return true;
    } catch (error) {
      return false;
    }
  }

}

module.exports = UserService;