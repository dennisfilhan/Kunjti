'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Nilais', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      praktikanId: {
        type: Sequelize.STRING,
        onDelete: 'CASCADE',
        references: {
          model: 'Praktikans', key: 'id'
        }
      },
      praktikanUnitId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Praktikan_Unit_Assigns', key: 'id'
        }
      },
      score: {
        type: Sequelize.INTEGER
      },
      asistenId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Asistens', key: 'id'
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
    return queryInterface.dropTable('Nilais');
  }
};