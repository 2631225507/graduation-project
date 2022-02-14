'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Area = app.model.define('area', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: STRING,
    name: STRING,
    city_code: STRING
  },{
    createdAt: false,
    updatedAt: false,
});

  return Area;
};
