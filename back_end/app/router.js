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
  router.get('/api/duties',  controller.enum.find); //获取职位

  router.get('/api/shelvesInfo',  controller.goodsShelves.page); //获取货架信息
  router.post('/api/shelves/create',  controller.goodsShelves.create); //添加货架信息
  router.post('/api/shelves/update',  controller.goodsShelves.update); //修改货架信息
  router.post('/api/shelves/delete',  controller.goodsShelves.delete); //删除货架信息

  router.get('/api/staffInfo',  controller.staff.page); //获取员工信息
  router.post('/api/staff/create',  controller.staff.create); //添加员工信息
  router.post('/api/staff/update',  controller.staff.update); //修改员工信息
  router.post('/api/staff/delete',  controller.staff.delete); //删除员工信息

  router.get('/api/productInfo',  controller.product.page); //获取产品信息
  router.post('/api/product/create',  controller.product.create); //添加产品信息
  router.post('/api/product/update',  controller.product.update); //修改产品信息
  router.post('/api/product/delete',  controller.product.delete); //删除产品信息
  router.post('/api/product-datail/delete',  controller.product.deleteDetail); //删除产品详情信息

};
