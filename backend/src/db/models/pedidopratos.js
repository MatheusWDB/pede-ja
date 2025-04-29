'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pedidoPratos extends Model {

    static associate(models) {

      this.belongsTo(models.pedidos, {
        foreignKey: {
          name: 'idPedido',
          allowNull: false
        }
      })
      this.belongsTo(models.pratos, {
        foreignKey: {
          name: 'idPrato',
          allowNull: false
        }
      })
    }
  }

  pedidoPratos.init({
    idPedido: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'pedidos',
        key: 'idPedido'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    idPrato: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'pratos',
        key: 'idPrato'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    quantidade: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    observacao: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'pedidoPratos',
    tableName: 'pedidoPratos'
  });
  return pedidoPratos;
};
