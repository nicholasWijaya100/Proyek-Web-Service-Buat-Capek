'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu_sets', {
      menu_set_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
      },
      menu_set_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      menu_content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      menu_set_total_calories: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.dropTable('menu_sets');
  }
};