'use strict';
const base = require('./base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const OrderDetail = app.model.define('order_detail', {
    detail_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    goods: {
      type: STRING(32),
      allowNull: true
    },
    size: {
      type: INTEGER(5),
      allowNull: true
    },
    stock: {
      type: INTEGER(11),
      allowNull: true
    },
    price: {
      type: INTEGER(11),
      allowNull: true
    },
    order_quantity: {
      type: INTEGER(11),
      allowNull: true
    },
    order_id: {
      type: INTEGER(11),
      allowNull: false
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  OrderDetail.associate = function () {
    OrderDetail.belongsTo(app.model.Order, { foreignKey: 'order_id' })
  }

  return OrderDetail;
};
