'use strict';

module.exports = {
  baseResponse: {
    code: { type: 'number', description: '返回状态码' },
    msg: { type: 'string', description: '返回信息' },
    success: { type: 'boolean', description: 'true代表操作成功，false代表操作失败' },
  },
};
