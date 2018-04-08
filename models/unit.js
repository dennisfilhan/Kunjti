'use strict';
module.exports = (sequelize, DataTypes) => {
  var Unit = sequelize.define('Unit', {
    // modulId: DataTypes.INTEGER,
    description: DataTypes.STRING,
    passkey: DataTypes.STRING,
    bobot: DataTypes.INTEGER,
    file: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {});
  Unit.associate = function(models) {
    // associations can be defined here
    models.Unit.belongsTo(models.Modul, {
      onDelete: 'CASCADE',
      foreignKey: 'modulId'
    });
    models.Unit.hasOne(models.Quiz,{
      onDelete: 'CASCADE',
      foreignKey: 'unitId'
    });
    models.Unit.hasOne(models.Document, {
      onDelete: 'CASCADE',
      foreignKey: 'unitId'
    });
    models.Unit.hasOne(models.Attachment, {
      onDelete: 'CASCADE',
      foreignKey: {name: 'unitId', allowNull: true}
    });
  };
  return Unit;
};