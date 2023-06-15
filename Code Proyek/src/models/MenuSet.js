"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class MenuSet extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  MenuSet.init(
    {
      menu_set_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      menu_set_name: {
        type: DataTypes.STRING,
      },
      menu_content: {
        type: DataTypes.TEXT,
      },
      menu_set_total_calories: {
        type: DataTypes.INTEGER,
      },
      menu_set_maker: {
         type: DataTypes.STRING
      }
    },
    {
      sequelize,
      modelName: "MenuSet",
      tableName: "menu_sets",
      timestamps: true,
      paranoid: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      deletedAt: "deletedAt",
    }
  );

  return MenuSet;
};
