'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class clientes extends Model {

    static associate(models) {

      this.hasMany(models.pedidos, {
        foreignKey: {
          name: 'idCliente',
          allowNull: false
        }
      })
    }
  }

  clientes.init({
    idCliente: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    telefone: {
      allowNull: false,
      type: DataTypes.STRING
    },
    mesa: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'clientes',
  });
  return clientes;
};
