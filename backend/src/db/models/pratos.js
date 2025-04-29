'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pratos extends Model {
    static associate(models) {
      this.belongsToMany(models.pedidos, {
        through: models.pedidoPratos,
        foreignKey: {
          name: 'idPrato',
          allowNull: false
        }
      })

      this.belongsToMany(models.ingredientes, {
        through: models.pratoIngredientes,
        foreignKey: {
          name: 'idPrato',
          allowNull: false
        }
      })

      this.belongsTo(models.restaurantes, {
        foreignKey: {
          name: 'idRestaurante',
          allowNull: false
        }
      })

      this.belongsTo(models.imagemPratos, {
        foreignKey: {
          name: 'idImgPrato',
        }
      })
    }
  }

  pratos.init({
    idPrato: {
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
    nome: {
      allowNull: false,
      type: DataTypes.STRING
    },
    valor: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2)
    },
    idImgPrato: {
      type: DataTypes.INTEGER,
      references: {
        model: 'imagemPratos',
        key: 'idImgPrato'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'pratos',
  });
  return pratos;
};
