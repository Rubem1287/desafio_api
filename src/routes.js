import express from "express";
import {
  createBook,
  updateBook,
  deleteBook,
  getAllBook,
} from "./controllers/userController.js";

const routes = express.Router();

//Get, Post, Put, Delete

routes.get("/listar", getAllBook);

routes.post("/cadastrar", createBook);

routes.put("/atualizar", updateBook);

routes.delete("/deletar", deleteBook);

export default routes;
