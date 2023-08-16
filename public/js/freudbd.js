document.addEventListener('DOMContentLoaded', () => {
  const helloDiv = document.getElementById('hello');
  const chatBox = document.getElementById('chatBox');

  const displayGoodMorning = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greetingMessage = '';

    if (currentHour < 12) {
      greetingMessage = 'Bom dia! Como posso ajudar você hoje?';
    } else if (currentHour < 18) {
      greetingMessage = 'Boa tarde! Como posso ajudar você hoje?';
    } else {
      greetingMessage = 'Boa noite! Como posso ajudar você hoje?';
    }

    helloDiv.textContent = greetingMessage;
  };

  const adjustHelloPosition = () => {
    const chatBoxRect = chatBox.getBoundingClientRect();
    const chatBoxBottom = chatBoxRect.bottom;
    helloDiv.style.top = `${chatBoxBottom + 10}px`; // Ajuste o valor conforme necessário
  };

  displayGoodMorning();
  adjustHelloPosition();

  // Monitorar o redimensionamento da janela para ajustar o posicionamento
  window.addEventListener('resize', adjustHelloPosition);

  // Função para adicionar mensagem ao chatBox (apenas para exemplo)
  const addMessageToChat = (role, content) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = role;
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    adjustHelloPosition(); // Chame a função para ajustar a posição do helloDiv após adicionar uma mensagem
  };

  // Exemplo de como adicionar mensagens ao chatBox e ajustar a posição do helloDiv
  const showChat = () => {
    chatBox.style.display = 'block';
    chatBox.scrollTop = chatBox.scrollHeight;
    addMessageToChat('assistant', '');
  };
  
  // Chame a função showChat para iniciar a conversa
  showChat();
});
