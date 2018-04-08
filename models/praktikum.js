'use strict';
module.exports = (sequelize, DataTypes) => {
  var Praktikum = sequelize.define('Praktikum', {
    lab: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    periode: DataTypes.STRING,
    angkatan: DataTypes.INTEGER,
    jumlah_modul: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {});
  Praktikum.associate = function(models) {
    // associations can be defined here
    models.Praktikum.belongsTo(models.Lab, {
      foreignKey: 'lab' 
    });
    models.Praktikum.hasMany(models.Modul, {
      foreignKey: 'praktikumId'
    });
    models.Praktikum.hasMany(models.Shift);
    models.Praktikum.hasMany(models.Asisten_Praktikum_Assign);
  };
  return Praktikum;
};