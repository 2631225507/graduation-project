'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Warehousing = app.model.define('warehousing', {
    chargeback_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: INTEGER(11),
      allowNull: true
    },
    order_number: {
      type: STRING(32),
      allowNull: true
    },
    client_name: {
      type: STRING(32),
      allowNull: true
    },
    signing_time: {
      type: DATE,
      allowNull: true
    },
    tallying_staff: {
      type: STRING(32),
      allowNull: true
    },
    staff_id: {
      type: INTEGER(11),
      allowNull: true
    },
    tallying_staff: {
      type: STRING(32),
      allowNull: true
    },
    shelf_id: {
      type: INTEGER(11),
      allowNull: true
    },
    save_shelf: {
      type: STRING(32),
      allowNull: true
    }
  });

  Warehousing.associate = function () {
    Warehousing.hasMany(app.model.WarehousingDetail, { foreignKey: 'chargeback_id' })
  }

  return Warehousing;
};
