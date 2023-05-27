'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryTransaction extends Model {
    static associate(models) {
      // define association here
    }
  }
  HistoryTransaction.init(
  {
    history_transaction_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diet_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }, 
  {
    sequelize,
    modelName: 'HistoryTransaction',
    tableName: "history_transaction",
    timestamps: true,
    paranoid: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    
  });
  return HistoryTransaction;
};