'use strict';
const base = require('./base');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const WarehousingDetail = app.model.define('warehousing_detail', {
    detail_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    chargeback_id: {
      type: INTEGER(11),
      allowNull: true
    },
    product: {
      type: STRING(100),
      allowNull: true
    },
    size: {
      type: INTEGER(11),
      allowNull: true
    },
    amount: {
      type: INTEGER(11),
      allowNull: true
    },
    price: {
      type: INTEGER(11),
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false
  });

  WarehousingDetail.associate = function () {
    WarehousingDetail.belongsTo(app.model.Warehousing, { foreignKey: 'chargeback_id' })
  }

  return WarehousingDetail;
};
