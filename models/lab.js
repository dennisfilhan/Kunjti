'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lab = sequelize.define('Lab', {
    nama: DataTypes.STRING,
    nickname: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Lab.associate = function(models) {
    // associations can be defined here
    models.Lab.hasMany(models.Praktikum, {
    	foreignKey: 'lab'
    });
  };
  return Lab;
};