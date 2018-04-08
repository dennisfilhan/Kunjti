'use strict';
module.exports = (sequelize, DataTypes) => {
  var Attachment = sequelize.define('Attachment', {
    unitId: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    filename: DataTypes.STRING,
    mimetype: DataTypes.STRING,
    size: DataTypes.INTEGER,
    destination: DataTypes.STRING
  }, {});
  Attachment.associate = function(models) {
    // associations can be defined here
    models.Attachment.belongsTo(models.Unit,{
      foreignKey: {
        name: 'id', allowNull: true
      }
    });
  };
  return Attachment;
};