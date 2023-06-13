'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Diet extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Diet.init(
    {
      diet_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      diet_name: {
        type: DataTypes.STRING,
      },
      diet_content: {
        type: DataTypes.TEXT,
      },
      diet_total_calories: {
        type: DataTypes.INTEGER,
      },
      diet_maker: {
        type: DataTypes.STRING
      },
      diet_price: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Diet',
      tableName: "diets",
      timestamps: true,
      paranoid: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      deletedAt: 'deletedAt',
    }
  );

  return Diet;
};
