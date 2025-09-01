import { DataTypes } from "sequelize";
import Livro from "../models/Livro.js";
import crypto from "node:crypto";
import { error } from "node:console";

const isUUID = (id) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    id
  );
async function validadeIdBook(id, res) {
  if (!isUUID(id)) {
    return res.status(400).json({ error: "ID inválido." }); // cláusula de sáida return
  }

  const livro = await Livro.findByPk(id);
  if (!livro) {
    return res.status(404).json({ error: "Livro não encontrado." });
  }

  return livro;
}
export const createBook = async (req, res) => {
  try {
    const { title, pages, isbn, editor } = req.body;

    console.log("Dados recebidos:", {
      title,
      pages,
      isbn,
      editor,
    });

    const livro = await Livro.create({
      id: crypto.randomUUID(),
      title,
      pages,
      isbn,
      editor,
    });

    res.status(201).json(livro);
  } catch (error) {
    console.error("Erro ao criar livro:", error); // Aqui aparece a mensagem REAL
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    await validadeIdBook(id, res);
    const livro = await Livro.findByPk(id);
    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    res.status(500).json({ error: error.message });
  }

  res.status(200).json({});
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await validadeIdBook(id, res);
    await livro.destroy({ id: req.params.id });
    res.status(200).json({ message: "Livro excluído." });
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    res.status(500).json({ error: error.message });
  }

  res.status(200).json({});
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, pages, isbn, editor } = req.body;

    const livro = await validadeIdBook(id, res);

    await livro.update({
      title: title ?? livro.title, //operador de nulo
      pages: pages !== undefined ? parseInt(pages, 10) : livro.pages, //pesquisar ternária, parseint,
      isbn: isbn ?? livro.isbn,
      editor: editor ?? livro.editor,
    });

    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao alterar livro:", error);
    res.status(500).json({ error: error.message });
  }
  await livro.update(livro);
  res.status(200).json({ message: "Livro atualizado." });
};

export const getAllBook = async (req, res) => {
  try {
    const livro = await Livro.findAll();
    res.status(200).json(livro);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    res.status(500).json({ error: error.message });
  }
  res.status(200).json({});
};
