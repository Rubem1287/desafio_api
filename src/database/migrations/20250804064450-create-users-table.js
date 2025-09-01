"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("livros", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      editor: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("livros");
  },
};
