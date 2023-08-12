document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const audioElement = document.getElementById('audio-element');
  const playBtn = document.querySelector('.play-btn');
  const pauseBtn = document.querySelector('.pause-btn');
  const progress = document.querySelector('.progress');
  const volumeSlider = document.querySelector('.volume-slider');
  const volumeSliderBar = document.querySelector('.volume-slider-bar');
  const volumeSliderHandle = document.querySelector('.volume-slider-handle');
    const label = document.querySelector(".bb8-toggle");
    var video = document.querySelector("video");

    
 
    // Função para mostrar o chat
    const showChat = () => {
      chatBox.style.display = 'block';
      chatBox.scrollTop = chatBox.scrollHeight; // Faz a rolagem do chat ir para o final
    };
    
    
    // Função para esconder o chat
    const hideChat = () => {
      chatBox.style.display = 'none';
    };
  
    chatForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const userQuestion = userInput.value;
      userInput.value = '';
  
      // Adicionar a mensagem do usuário ao chat
      const userMessage = `<div class="message incoming"><strong>Você:</strong> ${userQuestion}</div>`;
      chatBox.innerHTML += userMessage;
      showChat();
  
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
    });


  });