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
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        amount: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        topup_date: {
            allowNull: false,
            type: Sequelize.DATE
        }
    },
    {
      sequelize,
      modelName: "TopupHistory",
      tableName: "topup_history",
      timestamps: true,
      paranoid: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      deletedAt: "deletedAt",
    }
  );

  return TopupHistory;
};