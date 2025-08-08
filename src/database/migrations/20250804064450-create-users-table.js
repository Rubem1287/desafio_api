"use strict";

const { INTEGER } = require("sequelize");

module.exports = {
  // async up(queryInterface, Sequelize) {
  //   await queryInterface.createTable("livro", {
  //     id: {
  //       type: Sequelize.UUID,
  //       allowNull: false,
  //       primaryKey: true,
  //       defaultValue: Sequelize.UUIDV4,
  //     },
  //     title: {
  //       type: Sequelize.STRING,
  //       allowNull: false,
  //     },
  //     pages: {
  //       type: Sequelize.INTEGER,
  //       allowNull: false,
  //     },
  //     ISBN: {
  //       type: Sequelize.INTEGER,
  //       allowNull: false,
  //     },
  //     editor: {
  //       type: Sequelize.STRING,
  //       allowNull: false,
  //     },
  //   });
  //},

  up: (queryInterface, Sequelize) => {
    queryInterface.createTable("livro", {
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
      ISBN: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      editor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable("livro");
  },
};
