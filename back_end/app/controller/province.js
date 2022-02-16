'use strict';

const Controller = require('egg').Controller;

/**
* @controller Province省份
*/
class Province extends Controller {

  /**
* @summary 查询省份
* @description 查询所有省份数据
* @router get /api/provice
* @response 200 ProvinceResponse 返回结果.
*/
  async find() {
    const { ctx } = this;
    const res = await ctx.service.province.find();
    if (res) {
      ctx.body = { code: 200, msg: '查询成功', data: res }
    } else {
      ctx.body = { code: IOError, msg: '查询失败' }
    }
  }

}

module.exports = Province;
