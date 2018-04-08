'use strict';
module.exports = (sequelize, DataTypes) => {
  var Asisten = sequelize.define('Asisten', {
    fullname: DataTypes.STRING,
    codename: DataTypes.STRING,
    labId: DataTypes.INTEGER
  }, {});
  Asisten.associate = function(models) {
    // associations can be defined here
    models.Asisten.belongsTo(models.Lab, {foreignKey: 'labId'});
    models.Asisten.hasMany(models.Asisten_Praktikum_Assign, {foreignKey: 'asistenId'});
    models.Asisten.hasMany(models.Nilai, {foreignKey: 'asistenId'});
  };
  return Asisten;
};