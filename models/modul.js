'use strict';
module.exports = (sequelize, DataTypes) => {
  var Modul = sequelize.define('Modul', {
    nomor: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Modul.associate = function(models) {
    // associations can be defined here
    models.Modul.belongsTo(models.Praktikum, {
      onDelete: 'CASCADE',
      foreignKey: 'praktikumId'
    });
    models.Modul.hasMany(models.Unit, {
      foreignKey: 'modulId'
    });
  };
  return Modul;
};