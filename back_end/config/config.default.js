/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644555565045_6989';

  // add your middleware config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'backstage',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 鉴权
  config.jwt = {
    secret: '2022hhg$yanggo',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
    },
  };

  config.validate = {
    // convert: false,
    // validateRoot: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    password_salt: 'ntihcbRbx1mnFKKW38ZI7hoBMKbe35Me',
  };


  return {
    ...config,
    ...userConfig,
  };
};
