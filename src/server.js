import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { sequelize } from "./database/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/livro", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API Desafio está funcionando!" });
});

const PORT = process.env.PORT || 3000;

// Test database connection and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    app.listen(PORT, () => console.log(`Servidor online na porta ${PORT}.`));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

startServer();
