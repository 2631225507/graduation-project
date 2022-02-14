/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('warehousing', {
    chargeback_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    order_number: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    client_name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    signing_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    tallying_staff: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    shelf_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    save_shelf: {
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
    tableName: 'warehousing'
  });

  Model.associate = function() {

  }

  return Model;
};
