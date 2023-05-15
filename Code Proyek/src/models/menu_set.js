'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu_set extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  menu_set.init({
    menu_set_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu_set',
  });
  return menu_set;
};