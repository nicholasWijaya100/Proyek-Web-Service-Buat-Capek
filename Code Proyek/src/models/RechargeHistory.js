'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RechargeHistory extends Model {
    static associate(models) {
      // define association here
    }
  }
  RechargeHistory.init(
  {
    recharge_history_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cash_used: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exchanged_hits: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, 
  {
    sequelize,
    modelName: "RechargeHistory",
    tableName: "recharge_history",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
  });
  return RechargeHistory;
};