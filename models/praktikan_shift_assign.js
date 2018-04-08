'use strict';
module.exports = (sequelize, DataTypes) => {
  var Praktikan_Shift_Assign = sequelize.define('Praktikan_Shift_Assign', {
    // praktikanId: DataTypes.INTERGER,
    // shiftId: DataTypes.INTEGER
  }, {});
  Praktikan_Shift_Assign.associate = function(models) {
    // associations can be defined here
    models.Praktikan_Shift_Assign.belongsTo(models.Praktikan, {
    	foreignKey: 'id'
    });
    models.Praktikan_Shift_Assign.belongsTo(models.Shift, {
    	foreignKey: 'shiftId'
    });
  };
  return Praktikan_Shift_Assign;
};