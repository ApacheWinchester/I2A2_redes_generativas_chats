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
  
    // Resto do seu código existente...
  
    // Exemplo de como ajustar a posição do 'helloDiv' após iniciar a conversa
    // Dentro da função que exibe as mensagens da conversa
    const showChat = () => {
      chatBox.style.display = 'block';
      chatBox.scrollTop = chatBox.scrollHeight;
      adjustHelloPosition(); // Chame a função para ajustar a posição do helloDiv
    };
  });
  