'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ingredientes extends Model {

    static associate(models) {

      this.belongsToMany(models.pratos, {
        through: models.pratoIngredientes,
        foreignKey: {
          name: 'idIngrediente',
          allowNull: false
        }
      })
    }
  }

  ingredientes.init({
    idIngrediente: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ingrediente: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ingredientes',
  });
  return ingredientes;
};
