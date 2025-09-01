"use strict";

module.exports = (sequelize, DataTypes) => {
  const Livro = sequelize.define(
    "Livro",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      editor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "livros",
      timestamps: true,
    }
  );

  return Livro;
};
