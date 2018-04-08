'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unitId: {
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      filename: {
        type: Sequelize.STRING
      },
      mimetype: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      destination: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Attachments');
  }
};