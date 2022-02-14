/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order', {
    order_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    order_number: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    client_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    client_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    client_phone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    goods_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    delivery_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    operator: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    province_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    province: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    area_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    detail_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    is_issue: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'order'
  });

  Model.associate = function() {

  }

  return Model;
};
