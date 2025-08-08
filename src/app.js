const express = require('express');
const app = express();

// Porta dinâmica (importante para o EasyPanel)
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rota básica
app.get('/', (req, res) => {
    res.json({ 
        message: 'API funcionando!', 
        timestamp: new Date().toISOString() 
    });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});