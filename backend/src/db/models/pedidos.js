'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pedidos extends Model {

    static associate(models) {

      this.belongsTo(models.clientes, {
        foreignKey: {
          name: 'idCliente',
          allowNull: false
        }
      })

      this.belongsToMany(models.pratos, {
        through: models.pedidoPratos,
        foreignKey: {
          name: 'idPedido',
          allowNull: false
        }
      })

      this.hasMany(models.pedidoPratos, {
        as: 'pedido_pedidoPrato',
        foreignKey: {
          name: 'idPedido',
          allowNull: false
        }

      })
    }
  }

  pedidos.init({
    idPedido: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idCliente: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'clientes',
        key: 'idCliente'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    numeroPedido: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    finalizado: {
      allowNull: false,
      type: DataTypes.ENUM('V', 'F'),
      defaultValue: 'F'
    }
  }, {
    sequelize,
    modelName: 'pedidos',
  });
  return pedidos;
};
