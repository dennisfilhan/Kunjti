'use strict';
module.exports = (sequelize, DataTypes) => {
  var Praktikan = sequelize.define('Praktikan', {
    // nim: DataTypes.STRING,
    nama: DataTypes.STRING,
    kelas: DataTypes.STRING
  }, {});
  Praktikan.associate = function(models) {
    // associations can be defined here
    models.Praktikan.hasMany(models.Praktikan_Shift_Assign, {
    	foreignKey: 'id'
    });
    models.Praktikan.hasMany(models.Nilai, {
      foreignKey: 'id'
    });
    
  };
  return Praktikan;
};