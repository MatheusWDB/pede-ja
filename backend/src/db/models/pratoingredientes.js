'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pratoIngredientes extends Model {

    static associate(models) {

      this.belongsTo(models.pratos, {
        foreignKey: {
          name: 'idPrato',
          allowNull: false
        }
      })
      this.belongsTo(models.ingredientes, {
        foreignKey: {
          name: 'idIngrediente',
          allowNull: false
        }
      })
    }
  }

  pratoIngredientes.init({
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
    idIngrediente: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'ingredientes',
        key: 'idIngrediente'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'pratoIngredientes',
    tableName: 'pratoIngredientes'
  });
  return pratoIngredientes;
};
