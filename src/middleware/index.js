// Middleware de log personalizado
export const logMiddleware = (req, res, next) => {
  const start = Date.now();
  
  // Log da requisição
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${req.ip}`);
  
  // Interceptar o final da resposta para log
  const originalSend = res.send;
  res.send = function(...args) {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode} - ${duration}ms`);
    return originalSend.apply(this, args);
  };
  
  next();
};

// Middleware de tratamento de erros global
export const errorHandler = (err, req, res, next) => {
  console.error('Erro não tratado:', err);
  
  // Se já foi enviada uma resposta, delegar para o handler padrão do Express
  if (res.headersSent) {
    return next(err);
  }
  
  res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
};

// Middleware para tratar rotas não encontradas
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Rota ${req.method} ${req.url} não encontrada`
  });
};
