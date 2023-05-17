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
    },
    {
      sequelize,
      modelName: "MenuSet",
      tableName: "menu_sets",
      timestamps: true,
      paranoid: false,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      deletedAt: "deletedAt",
    }
  );

  return MenuSet;
};