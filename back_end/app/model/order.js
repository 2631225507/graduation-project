'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Order = app.model.define('order', {
    order_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_number: {
      type: STRING(32),
      allowNull: true
    },
    client_id: {
      type: INTEGER(11),
      allowNull: true
    },
    client_name: {
      type: STRING(100),
      allowNull: true
    },
    client_phone: {
      type: STRING(32),
      allowNull: true
    },
    goods_name: {
      type: STRING(255),
      allowNull: true
    },
    delivery_time: {
      type: DATE,
      allowNull: true
    },
    operator_id: {
      type: INTEGER(11),
      allowNull: true
    },
    operator: {
      type: STRING(32),
      allowNull: true
    },
    province_id: {
      type: INTEGER(11),
      allowNull: true
    },
    province: {
      type: STRING(32),
      allowNull: true
    },
    city_id: {
      type: INTEGER(11),
      allowNull: true
    },
    city: {
      type: STRING(32),
      allowNull: true
    },
    area_id: {
      type: INTEGER(11),
      allowNull: true
    },
    area: {
      type: STRING(32),
      allowNull: true
    },
    detail_address: {
      type: STRING(255),
      allowNull: true
    },
    is_issue: {
      type: STRING(5),
      allowNull: true
    }
  });

  Order.associate = function () {
    Order.hasMany(app.model.OrderDetail, { foreignKey: 'order_id' })
  }

  return Order;
};
