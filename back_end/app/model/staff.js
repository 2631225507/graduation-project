'use strict';

module.exports = app => {
  const { STRING, INTEGER,DATE }= app.Sequelize;

  const Staff = app.model.define('staff', {
    staff_id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    staff_name: {
      type: STRING(32),
      allowNull: true
    },
    sex: {
      type: STRING(32),
      allowNull: true
    },
    staff_phone: {
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
    entry_time: {
      type: DATE,
      allowNull: true
    }
  });

  return Staff;
};
