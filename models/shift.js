'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shift = sequelize.define('Shift', {
    alias: DataTypes.STRING,
    location: DataTypes.STRING,
    everyday: DataTypes.STRING,
    time_in: DataTypes.INTEGER,
    time_out: DataTypes.INTEGER,
    praktikumId: DataTypes.INTEGER
  }, {});
  Shift.associate = function(models) {
    // associations can be defined here
    models.Shift.belongsTo(models.Praktikum, {
      foreignKey: 'id'
    });
  };
  return Shift;
};