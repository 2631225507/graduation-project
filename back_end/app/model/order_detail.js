/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order_detail', {
    detail_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    goods: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    size: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    stock: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'order_detail'
  });

  Model.associate = function() {

  }

  return Model;
};
