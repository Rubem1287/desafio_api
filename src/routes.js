import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBook,
  getBookById,
} from "./controllers/livroController.js";

const routes = express.Router();

// GET routes
routes.get("/livros", getAllBook);
routes.get("/:id", getBookById);

// POST routes
routes.post("livros/cadastrar", createBook);

// PUT routes
routes.put("/:id", updateBook);

// DELETE routes
routes.delete("livros/edicao/:livroid", deleteBook);

export default routes;


