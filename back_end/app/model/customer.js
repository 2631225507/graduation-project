'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Customer = app.model.define('customer', {
    customer_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    customer_name: {
      type: STRING(32),
      allowNull: true
    },
    customer_phone: {
      type: STRING(32),
      allowNull: true
    },
    promoting_id: {
      type: STRING(255),
      allowNull: true
    },
    promoting_products: {
      type: STRING(255),
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
    }
  });

  return Customer;
};
