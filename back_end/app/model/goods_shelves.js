'use strict';
const base = require('./base');
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const GoodsShelves = app.model.define('goods_shelves',
    Object.assign(base(app), {
      shelf_id: {
        type: INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      area_code: {
        type: STRING(32)
      },
      secondary_code: {
        type: STRING(32)
      },
      number_layers: {
        type: INTEGER(11)
      },
      shelf_number: {
        type: STRING(32)
      },
      access_box: {
        type: INTEGER(11)
      }
    }));

  return GoodsShelves;
};
