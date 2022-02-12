'use strict';
const md5 = require('md5');
const Service = require('egg').Service;

class UserService extends Service {
  async login({ username, password }) {
    const { app, ctx } = this;
    password = md5(md5(password) + app.config.password_salt);

    const user = await ctx.model.User.findOne({
      where: { username, password },
    });

    if (!user) {
      return false;
    }

    if (user.password === password) {
      const token = app.jwt.sign({
        userid: user.id,
        username: user.username
      }, app.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 7 });
      return token;
    }
    return false;
  }

}

module.exports = UserService;