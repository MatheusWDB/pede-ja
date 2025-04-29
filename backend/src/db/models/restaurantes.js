'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class restaurantes extends Model {
    static associate(models) {
      this.hasMany(models.pratos, {
        foreignKey: {
          name: 'idRestaurante',
          allowNull: false
        }
      }),

        this.hasMany(models.telefonesRestaurante, {
          foreignKey: {
            name: 'idRestaurante',
            primaryKey: true,
            allowNull: false
          }
        }),

        this.belongsTo(models.imagemRestaurantes, {
          foreignKey: {
            name: 'idImgRestaurante'
          }
        })
    }
  }

  restaurantes.init({
    idRestaurante: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    cnpj: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    senha: {
      allowNull: false,
      type: DataTypes.STRING
    },
    idImgRestaurante: {
      type: DataTypes.INTEGER,
      references: {
        model: 'imagemRestaurantes',
        key: 'idImgRestaurante'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'

    }
  }, {
    sequelize,
    modelName: 'restaurantes',
  });
  return restaurantes;
};
