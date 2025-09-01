import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import Livro from "../models/Livro.js";

const sequelize = new Sequelize(
  databaseConfig.database,
  databaseConfig.username,
  databaseConfig.password,
  {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    define: databaseConfig.define,
  }
);

// Initialize models
Livro.init(sequelize);

export { sequelize };
export default { Livro };
