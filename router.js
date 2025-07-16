const { Router } = require("express");
const router = Router();

//Get, Post, Put, Delete

router.get("/listar", (req, res) => {
  res.send("Listando todos livros: ");
});

router.post("/cadastro", (req, res) => {
  res.send("Cadastro realizado com sucesso.");
});

router.put("/atualizar/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Cadastro atualizado com sucesso.${id}`);
});

router.delete("/deletar/:id", (req, res) => {});

module.exports = router;
