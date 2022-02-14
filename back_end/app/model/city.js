'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const City = app.model.define('city', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: STRING,
    name: STRING,
    province_code: STRING,
  },{
    createdAt: false,
    updatedAt: false,
});

  return City;
};
