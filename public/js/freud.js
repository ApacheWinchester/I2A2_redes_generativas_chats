document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chatBox');
  const chatForm = document.getElementById('chatForm');
  const userInput = document.getElementById('userInput');
  const typingIndicator = document.getElementById('typingIndicator'); // Elemento do indicador de digitação
  const recepButton = document.getElementById('recepButton');
        
  // Adiciona um manipulador de evento de clique ao botão
  recepButton.addEventListener('click', () => {
      // Redireciona para a página desejada
      window.location.href = '/html/home.html';
  });
  







  // Função para mostrar o chat
  const showChat = () => {
    chatBox.style.display = 'block';
    chatBox.scrollTop = chatBox.scrollHeight; // Faz a rolagem do chat ir para o final
  };

  // Função para esconder o chat
  const hideChat = () => {
    chatBox.style.display = 'none';
  };

  const startTypingIndicator = () => {
    typingIndicator.style.display = 'block'; // Mostra o indicador de digitação
  };

  const stopTypingIndicator = () => {
    typingIndicator.style.display = 'none'; // Esconde o indicador de digitação
  };

  chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userQuestion = userInput.value;
    userInput.value = '';

    // Adicionar a mensagem do usuário ao chat
    const userMessage = `<div class="message incoming"><strong>Você:</strong> ${userQuestion}</div>`;
    chatBox.innerHTML += userMessage;
    showChat();

    startTypingIndicator(); // Inicia o indicador de digitação

    // Enviar a pergunta do usuário para o servidor
    const response = await fetch('/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userQuestion }),
    });

    const { answer } = await response.json();

    // Exibir a resposta de Freud na tela
    const freudMessage = `<div class="message outgoing"><strong>Freud:</strong> ${answer}</div>`;
    chatBox.innerHTML += freudMessage;
    showChat();

    stopTypingIndicator(); // Interrompe o indicador de digitação
  });



  
  












});
