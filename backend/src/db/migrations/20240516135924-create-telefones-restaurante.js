'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('telefonesRestaurante', {
      idTelefone: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idRestaurante: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurantes',
          key: 'idRestaurante'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      telefone: {
        allowNull: false,
        unique: true,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('telefonesRestaurantes');
  }
};
