'use strict';

module.exports = app => {
  const { STRING, INTEGER, DECIMAL } = app.Sequelize;

  const ProductDetail = app.model.define('product_detail', {
    detail_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_number: {
      type: STRING(32),
      allowNull: true
    },
    size: {
      type: INTEGER(11),
      allowNull: true
    },
    stock: {
      type: STRING(100),
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
  });

  
  ProductDetail.associate = function () {
    ProductDetail.belongsTo(app.model.Product,  {foreignKey: 'product_number', targetKey: 'product_number'})
}

  return ProductDetail;
};
