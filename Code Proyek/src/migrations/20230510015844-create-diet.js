'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diets', {
      diet_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      diet_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diet_content: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      diet_total_calories: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      diet_maker: {
        type: Sequelize.STRING,
        allowNull: false
      },
      diet_price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diets');
  }
};