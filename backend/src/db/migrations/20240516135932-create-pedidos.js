'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos', {
      idPedido: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCliente: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'clientes',
          key: 'idCliente'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      numeroPedido: {
        type: Sequelize.INTEGER(3).ZEROFILL,
        allowNull: false
      },
      finalizado: {
        allowNull: false,
        type: Sequelize.ENUM('V', 'F'),
        defaultValue: 'F'
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
    await queryInterface.dropTable('pedidos');
  }
};
