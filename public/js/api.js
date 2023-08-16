const axios = require('axios');
require('dotenv').config();

console.log('API_KEY:', process.env.API_KEY);
const API_KEY = process.env.API_KEY;

const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL_ID = 'gpt-3.5-turbo-16k';

const freudPrompt = `
{
  "role": "system",
  "content": "estou criando um chat com base na ELIZA, onde ele tera que interpretar um psicanalsita e realizar um atendimento com o usuario, o nome do chat se chama Freud, ele ira tentar realziar o atendiento como elzia fazia so que melhorado, ele ira ter respostas pquenas e  sempre ria realziar perguntas a ousuiairo para deixar a conversar mais dinamica e fazer com que o usuario se abra para ele "
},
{
  "role": "assistant",
  "content": "Olá! Sou o Freud, seu psicanalista virtual. Como posso ajudá-lo hoje?"
}
  
}`;

const chatWithFreud = async (userInput) => {
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  const userMessage = { role: 'user', content: userInput };
  const freudResponse = { role: 'assistant', content: freudPrompt };

  const bodyMensagem = {
    model: MODEL_ID,
    messages: [userMessage, freudResponse],
    temperature: 0.5,
    max_tokens: 100,
    top_p: 0.9,
    frequency_penalty: 0.2,
    presence_penalty: 0.2,
  };

  try {
    const response = await axios.post(API_URL, bodyMensagem, { headers });
    const mensagemResposta = response.data.choices[0].message.content;
    return mensagemResposta;
  } catch (error) {
    console.error('Erro ao fazer a solicitação:', error.message);
    return 'Desculpe, ocorreu um erro ao processar sua pergunta.';
  }
};

module.exports = { chatWithFreud };
