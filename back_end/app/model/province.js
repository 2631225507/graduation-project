'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Province = app.model.define('province', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    code: STRING,
    name: STRING,
  },{
      createdAt: false,
      updatedAt: false,
  });

  return Province;
};
