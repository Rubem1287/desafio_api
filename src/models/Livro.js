import Sequelize, { DataTypes, Model } from 'sequelize';



class Livro extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      
        title: Sequelize.STRING,
        number_page: Sequelize.INTEGER,
        code_ISBN: Sequelize.STRING,
        editor: Sequelize.STRING

      },
      {
        sequelize,
        modelName: 'livro',
      }
    );
  }
}

export default Livro;