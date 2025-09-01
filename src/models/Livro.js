import Sequelize, { DataTypes, Model } from "sequelize";

class Livro extends Model {
  static init(sequelize) {
    super.init(
      {
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O título não pode estar vazio",
            },
            len: {
              args: [1, 255],
              msg: "O título deve ter entre 1 e 255 caracteres",
            },
          },
        },
        pages: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: "O número de páginas deve ser um número inteiro",
            },
            min: {
              args: [1],
              msg: "O número de páginas deve ser maior que 0",
            },
          },
        },
        isbn: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: {
              msg: "O ISBN não pode estar vazio",
            },
          },
        },
        editor: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "O editor não pode estar vazio",
            },
          },
        },
      },
      {
        sequelize,
        modelName: "Livro",
        tableName: "livros",
        timestamps: true,
        freezeTableName: true, // Impede pluralização do nome da tabela
        underscored: false, // Impede conversão camelCase → snake_case
      }
    );
  }
}

export default Livro;
