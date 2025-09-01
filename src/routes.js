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
routes.get("/listarlivros", getAllBook);
routes.get("/:id", getBookById);

// POST routes
routes.post("/cadastrar", createBook);

// PUT routes
routes.put("/:id", updateBook);
//routes.put("/:id/atualizarnome", updateBook);

// DELETE routes
routes.delete("/:id", deleteBook);

export default routes;
