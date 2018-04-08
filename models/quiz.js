'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quiz = sequelize.define('Quiz', {
    nama: DataTypes.STRING,
    jumlah_soal: DataTypes.INTEGER,
    timelimit: DataTypes.INTEGER,
    type: DataTypes.STRING,
    answerkey: DataTypes.STRING
  }, {});
  Quiz.associate = function(models) {
    // associations can be defined here
    models.Quiz.belongsTo(models.Unit, {
      OnDelete: 'CASCADE',
      foreignKey: 'id'
    });
  };
  return Quiz;
};