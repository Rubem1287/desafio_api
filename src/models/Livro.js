import Sequelize, { DataTypes, Model } from 'sequelize';

class Livro extends Model {
  static init(sequelize) {
    super.init(
      {
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
          type: Sequelize.STRING,
          allowNull: false,
        },
        editor: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: 'Livro',
        tableName: 'livros',
        timestamps: true,
      }
    );
  }
}

export default Livro;