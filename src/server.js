import express from "express";
import cors from "cors";
import routes from "./routes.js";
import { sequelize } from "./database/index.js";
import { logMiddleware, errorHandler, notFoundHandler } from "./middleware/index.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de log
app.use(logMiddleware);

// Routes
app.use("/livro", routes);

// Health check
app.get("/", (req, res) => {
  res.json({ 
    message: "API Desafio está funcionando!",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// Middleware para rotas não encontradas
app.use(notFoundHandler);

// Middleware de tratamento de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Test database connection and start server
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor online na porta ${PORT}.`);
      console.log(`📚 API de Livros disponível em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

startServer();
