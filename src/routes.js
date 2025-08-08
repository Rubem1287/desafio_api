import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBook,
  getBookById,
} from "./controllers/userController.js";

const routes = express.Router();

// GET routes
routes.get("/listar", getAllBook);
routes.get("/:id", getBookById);

// POST routes
routes.post("/cadastrar", createBook);

// PUT routes
routes.put("/atualizar/:id", updateBook);

// DELETE routes
routes.delete("/deletar/:id", deleteBook);

export default routes;
