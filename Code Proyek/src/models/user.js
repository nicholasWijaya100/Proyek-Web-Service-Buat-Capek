"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      birth_date: {
        type: DataTypes.DATE,
      },
      body_weight: {
        type: DataTypes.INTEGER,
      },
      body_height: {
        type: DataTypes.INTEGER,
      },
      // target_weight: {
      //   type: DataTypes.INTEGER,
      // },
      // role: {
      //   type: DataTypes.STRING,
      // },
      saldo: {
        type: DataTypes.INTEGER,
      },
      api_hit: {
        type: DataTypes.INTEGER,
      },
      api_key: {
        type: DataTypes.STRING,
      },
      deletedAt: {
        type: DataTypes.DATE
      }
      // profile_picture: {
      //   type: DataTypes.STRING,
      // },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      //deletedAt: "deletedAt",
    }
  );

  return User;
};
