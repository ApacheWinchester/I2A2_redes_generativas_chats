const express = require('express');
const path = require('path');
const { chatWithFreud } = require('./public/js/api'); // Importe o código do chat com Freud do arquivo api.js
const app = express();
const PORT = 3000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// Rota para servir o arquivo HTML da página de recepção
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/home.html'));
});

app.get('/recepcao', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/recepcao.html'));
});

app.get('/briza', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/briza.html'));
});

// Rota para servir o arquivo HTML da página de chat com Freud
app.get('/freud', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/freud.html'));
});

// Rota para servir o arquivo HTML da página de chat com Eliza
app.get('/eliza', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/eliza.html'));
});

// Rota para receber as perguntas do usuário e interagir com Freud
app.post('/ask', async (req, res) => {
  const { question } = req.body;

  // Processar a pergunta com a API de chat com Freud
  const response = await chatWithFreud(question);

  // Responder ao cliente com a resposta de Freud
  res.json({ answer: response });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
