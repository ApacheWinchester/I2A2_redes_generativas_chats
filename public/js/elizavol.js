document.addEventListener('DOMContentLoaded', () => {
    const audioElement = document.getElementById('audio-element');
    const playBtn = document.querySelector('.play-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const progress = document.querySelector('.progress');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeSliderBar = document.querySelector('.volume-slider-bar');
    const volumeSliderHandle = document.querySelector('.volume-slider-handle');
    const recepButton = document.getElementById('recepButton');
  
    // Adiciona um manipulador de evento de clique ao botão
    recepButton.addEventListener('click', () => {
      // Redireciona para a página desejada
      window.location.href = '/html/home.html';
    });
  
  
    // Defina um valor inicial para o volume
    audioElement.volume = 0.3;
  
    // Função para lidar com o arrastar do controle de volume
    function handleVolumeDrag(e) {
      const volumeSliderRect = volumeSliderBar.getBoundingClientRect();
      const offsetX = e.clientX - volumeSliderRect.left;
      const percentClicked = (offsetX / volumeSliderRect.width) * 100;
      const newVolume = Math.max(0, Math.min(1, percentClicked / 100));
      audioElement.volume = newVolume;
  
      // Atualize a aparência do marcador do controle de volume
      const handlePosition = newVolume * 100;
      volumeSliderHandle.style.left = `${handlePosition}%`;
    }
  
    // Inicialize a aparência do marcador do controle de volume para o valor inicial
    const initialVolume = audioElement.volume;
    const initialHandlePosition = initialVolume * 100;
    volumeSliderHandle.style.left = `${initialHandlePosition}%`;
  
    // Event listener para o botão de play
    playBtn.addEventListener('click', () => {
      audioElement.play();
    });
  
    // Event listener para o botão de pause
    pauseBtn.addEventListener('click', () => {
      audioElement.pause();
    });
  
    // Resto do código...
  
    // Event listener para manipular o arrastar do controle de volume
    volumeSlider.addEventListener("mousedown", (e) => {
      e.preventDefault();
      volumeSliderHandle.classList.add("active");
  
      // Adicione um novo ouvinte de evento na janela para lidar com o arrastar do controle de volume
      window.addEventListener("mousemove", handleVolumeDrag);
  
      // Remova o ouvinte de evento quando o usuário soltar o botão do mouse
      window.addEventListener("mouseup", () => {
        volumeSliderHandle.classList.remove("active");
        window.removeEventListener("mousemove", handleVolumeDrag);
      });
    });
  
    // Event listener para o botão de pular para trás
    const skipBackBtn = document.querySelector('.skip-btn');
    skipBackBtn.addEventListener('click', () => {
      audioElement.currentTime -= 10; // Pular 10 segundos para trás
    });
  });
  