/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('staff', {
    staff_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    staff_name: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    sex: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    staff_phone: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    duties_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    duties: {
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
    entry_time: {
      type: DataTypes.DATE,
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
    tableName: 'staff'
  });

  Model.associate = function() {

  }

  return Model;
};
