"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TopupHistory extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  TopupHistory.init(
    {
        topup_history_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    },
    {
      sequelize,
      modelName: "TopupHistory",
      tableName: "topup_history",
      timestamps: true,
      paranoid: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  );

  return TopupHistory;
};