'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Product = app.model.define('product',
    Object.assign(base(app), {
      product_id: {
        type: INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      product_number: {
        type: STRING(32),
        allowNull: true
      },
      product_name: {
        type: STRING(100),
        allowNull: true
      },
      type: {
        type: STRING(32),
        allowNull: true
      },
      img: {
        type: STRING(255),
        allowNull: true
      },
      price: {
        type: INTEGER(20),
        allowNull: true
      }
    }))

  Product.associate = function () {
    Product.hasMany(app.model.ProductDetail, { foreignKey: 'product_number', sourceKey: 'product_number' });
  }

  return Product;
};
