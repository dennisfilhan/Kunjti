'use strict';
module.exports = (sequelize, DataTypes) => {
  var Asisten_Praktikum_Assign = sequelize.define('Asisten_Praktikum_Assign', {
    // asistenId: DataTypes.INTEGER,
    // praktikumId: DataTypes.INTEGER
  }, {});
  Asisten_Praktikum_Assign.associate = function(models) {
    // associations can be defined here
    models.Asisten_Praktikum_Assign.belongsTo(models.Asisten, {foreignKey:'asistenId'});
    models.Asisten_Praktikum_Assign.belongsTo(models.Praktikum, {foreignKey:'praktikumId'});
  };
  return Asisten_Praktikum_Assign;
};