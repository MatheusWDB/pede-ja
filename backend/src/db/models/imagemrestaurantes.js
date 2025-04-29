'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class imagemRestaurantes extends Model {

    static associate(models) {
      this.belongsTo(models.restaurantes, {
        foreignKey: {
          name: "idImgRestaurante"
        }
      })
    }
  }

  imagemRestaurantes.init({
    idImgRestaurante: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    logo: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'imagemRestaurantes',
    tableName: 'imagemRestaurantes'
  });
  return imagemRestaurantes;
};
