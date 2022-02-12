'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt } = app;
  
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/info', controller.user.getInfo);
  router.post('/api/user/logout', controller.user.logout);

};
