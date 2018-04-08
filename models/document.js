'use strict';
module.exports = (sequelize, DataTypes) => {
  var Document = sequelize.define('Document', {
    nama: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Document.associate = function(models) {
    // associations can be defined here
    models.Document.belongsTo(models.Unit, {
      OnDelete: 'CASCADE',
      foreignKey: 'id'
    });
  };
  return Document;
};