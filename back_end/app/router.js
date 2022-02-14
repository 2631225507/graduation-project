'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;

  router.post('/api/user/login', controller.user.login); //登录
  router.post('/api/user/info', controller.user.getInfo);
  router.post('/api/user/logout', controller.user.logout);

  router.get('/api/provice',  controller.province.find); //获取省份
  router.get('/api/city',  controller.city.find); //获取市
  router.get('/api/area',  controller.area.find); //获取区

  router.get('/api/shelvesInfo',  controller.goodsShelves.page); //获取货架信息
  router.post('/api/shelves/create',  controller.goodsShelves.create); //添加货架信息
  router.post('/api/shelves/update',  controller.goodsShelves.update); //修改货架信息
  router.post('/api/shelves/delete',  controller.goodsShelves.delete); //修改货架信息

};
