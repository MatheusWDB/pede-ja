'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class imagemPratos extends Model {

    static associate(models) {

      this.hasMany(models.pratos, {
        foreignKey: {
          name: "idImgPrato"
        }
      })
    }
  }

  imagemPratos.init({
    idImgPrato: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    imagem: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'imagemPratos',
    tableName: 'imagemPratos'
  });
  return imagemPratos;
};
