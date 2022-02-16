'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Enum = app.model.define('enum', {
    id: {
      type: INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    lable: {
      type: STRING(32),
      allowNull: true
    },
    type: {
      type: STRING(32),
      allowNull: true
    }
  }, {
    createdAt: false,
    updatedAt: false,
  });

  return Enum;
};
