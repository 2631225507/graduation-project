/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('product_detail', {
    detail_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    size: {
      type: "DOUBLE",
      allowNull: true
    },
    stock: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'product_detail'
  });

  Model.associate = function() {

  }

  return Model;
};
