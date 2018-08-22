'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Praktikan_Shift_Assigns', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      praktikanId: {
        type: Sequelize.STRING,
        references: {
          model: 'Praktikans', key: 'id'
        }
      },
      shiftId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Shifts', key: 'id'
        }
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
    return queryInterface.dropTable('Praktikan_Shift_Assigns');
  }
};