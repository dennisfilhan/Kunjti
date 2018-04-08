'use strict';
module.exports = (sequelize, DataTypes) => {
  var Praktikan_Unit_Assign = sequelize.define('Praktikan_Unit_Assign', {
    // unitId: DataTypes.INTEGER,
    // praktikan_on_shift: DataTypes.INTEGER
  }, {});
  Praktikan_Unit_Assign.associate = function(models) {
    // associations can be defined here
    models.Praktikan_Unit_Assign.belongsTo(models.Unit, {
    	foreignKey: 'unitId'
    });
    models.Praktikan_Unit_Assign.belongsTo(models.Praktikan_Shift_Assign, {
    	foreignKey: 'praktikan_on_shift'
    });
  };
  return Praktikan_Unit_Assign;
};