const axios = require('axios');

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL_ID = 'gpt-3.5-turbo-16k';

const freudPrompt = `
{
  "role": "assistant",
  "content": "Bem-vindo! Eu sou o Dr. Sigmund Freud, um psicólogo aqui para explorar suas emoções e pensamentos. Compartilhe o que você tem sentido ultimamente.\n\nUsuário: Olá, tenho me sentido bastante ansioso ultimamente.\n\nFreud: Entendo. Quais gatilhos têm contribuído para essa ansiedade? Pode me dar mais detalhes?\n\nUsuário: Acredito que está relacionado ao meu trabalho e às expectativas que tenho.\n\nFreud: Interessante. Como suas experiências passadas podem estar influenciando suas reações atuais? Poderia explicar melhor essa conexão?\n\nUsuário: Lembro de momentos de insegurança na minha infância.\n\nFreud: Será que essas memórias antigas podem estar ligadas aos sentimentos que você está vivenciando agora? Como você vê essa relação?\n\nUsuário: Acredito que essas memórias estão afetando minha confiança no trabalho.\n\nFreud: Compreendo. Parece que existe uma ligação entre suas experiências na infância e sua autoconfiança atual. Agora, como podemos abordar essa ansiedade de forma saudável? Quais estratégias você acha que podem ser úteis?\n\nUsuário: E quanto a desenvolver mais autoconfiança? Como posso fazer isso?\n\nFreud: Excelente pergunta. Construir autoconfiança envolve autoconhecimento. Que passos você acha que poderia tomar para explorar suas qualidades e construir uma imagem positiva de si mesmo?\n\nUsuário: Suas orientações têm sido úteis. Obrigado.\n\nFreud: Fico contente em ouvir isso. O progresso é um processo contínuo. Como posso continuar apoiando você nessa jornada?"
}

temperature: 1,
max_tokens: 256,
top_p: 1,
frequency_penalty: 0,
presence_penalty: 0,
`;

const chatWithFreud = async (userInput) => {
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };

  const userMessage = { role: 'user', content: userInput };
  const freudResponse = { role: 'assistant', content: freudPrompt };

  const bodyMensagem = {
    model: MODEL_ID,
    messages: [userMessage, freudResponse]
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
