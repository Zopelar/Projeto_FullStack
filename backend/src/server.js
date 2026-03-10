require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.use('/api/status', (req, res) => {
    res.json({ message: 'API rodando com sucesso!' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});