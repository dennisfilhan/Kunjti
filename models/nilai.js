'use strict';
module.exports = (sequelize, DataTypes) => {
  var Nilai = sequelize.define('Nilai', {
    praktikanId: DataTypes.STRING,
    praktikanUnitId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    asistenId: DataTypes.INTEGER
  }, {});
  Nilai.associate = function(models) {
    // associations can be defined here
    models.Nilai.belongsTo(models.Praktikan, {foreignKey:'id'});
    models.Nilai.belongsTo(models.Praktikan_Unit_Assign, {foreignKey:'praktikanUnitId'});
    models.Nilai.belongsTo(models.Asisten, {foreignKey:'asistenId'});
  };
  return Nilai;
};