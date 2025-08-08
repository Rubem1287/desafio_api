import db from '../database/index.js';

const { Livro } = db;

export const createBook = async (req, res) => {
  try {
    const { title, pages, ISBN, editor } = req.body;
    
    const novoLivro = await Livro.create({
      title,
      pages,
      ISBN,
      editor
    });
    
    res.status(201).json({
      message: "Livro criado com sucesso!",
      livro: novoLivro
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
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
    
    const livro = await Livro.findByPk(id);
    
    if (!livro) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }
    
    await livro.update({
      title,
      pages,
      ISBN,
      editor
    });
    
    res.status(200).json({
      message: "Livro atualizado com sucesso!",
      livro
    });
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
    res.status(500).json({
      message: "Erro interno do servidor",
      error: error.message
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    
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
    const livros = await Livro.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      message: "Livros encontrados com sucesso!",
      livros,
      total: livros.length
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
