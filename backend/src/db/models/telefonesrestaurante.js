'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class telefonesRestaurante extends Model {
    static associate(models) {
      this.belongsTo(models.restaurantes, {
        foreignKey: {
          name: 'idRestaurante',
          primaryKey: true,
          allowNull: false
        }
      })
    }
  }

  telefonesRestaurante.init({
    idTelefone: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idRestaurante: {
      allowNull: false,
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'telefonesRestaurante',
    tableName: 'telefonesRestaurante'
  });
  return telefonesRestaurante;
};
