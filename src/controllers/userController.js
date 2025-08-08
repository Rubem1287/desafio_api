import { Sequelize } from 'sequelize';
import db from '../database/index.js';

const { Livro } = db;

export const createBook = async (req, res) => {
  try {
    const { title, pages, ISBN, editor } = req.body;
    
    // Validação básica
    if (!title || !pages || !ISBN || !editor) {
      return res.status(400).json({
        message: "Todos os campos são obrigatórios: title, pages, ISBN, editor"
      });
    }
    
    const novoLivro = await Livro.create({
      title,
      pages: parseInt(pages),
      ISBN,
      editor
    });
    
    res.status(201).json({
      message: "Livro criado com sucesso!",
      livro: novoLivro
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    
    // Tratar erro de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(err => err.message)
      });
    }
    
    // Tratar erro de unique constraint
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: "ISBN já existe no sistema"
      });
    }
    
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, pages, ISBN, editor } = req.body;
    
    // Validação de UUID
    if (!id || !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    
    const livro = await Livro.findByPk(id);
    
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    
    await livro.update({
      title: title || livro.title,
      pages: pages ? parseInt(pages) : livro.pages,
      ISBN: ISBN || livro.ISBN,
      editor: editor || livro.editor
    });
    
    res.status(200).json({
      message: "Livro atualizado com sucesso!",
      livro
    });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    
    // Tratar erro de validação do Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.errors.map(err => err.message)
      });
    }
    
    // Tratar erro de unique constraint
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        message: "ISBN já existe no sistema"
      });
    }
    
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validação de UUID
    if (!id || !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    
    const livro = await Livro.findByPk(id);
    
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    
    await livro.destroy();
    
    res.status(200).json({
      message: "Livro excluído com sucesso!"
    });
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
};

export const getAllBook = async (req, res) => {
  try {
    const { page = 1, limit = 10, title, editor } = req.query;
    
    const offset = (parseInt(page) - 1) * parseInt(limit);
    
    // Construir filtros
    const where = {};
    if (title) {
      where.title = { [Sequelize.Op.iLike]: `%${title}%` };
    }
    if (editor) {
      where.editor = { [Sequelize.Op.iLike]: `%${editor}%` };
    }
    
    const { count, rows: livros } = await Livro.findAndCountAll({
      where,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: offset
    });
    
    const totalPages = Math.ceil(count / parseInt(limit));
    
    res.status(200).json({
      message: "Livros encontrados com sucesso!",
      livros,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validação de UUID
    if (!id || !id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    
    const livro = await Livro.findByPk(id);
    
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    
    res.status(200).json({
      message: "Livro encontrado com sucesso!",
      livro
    });
  } catch (error) {
    console.error('Erro ao buscar livro:', error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
};
