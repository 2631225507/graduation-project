/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('customer', {
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    customer_name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    customer_phone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    promoting_products: {
      type: DataTypes.STRING(255),
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'customer'
  });

  Model.associate = function() {

  }

  return Model;
};
