// Selecionar elementos do DOM
document.addEventListener('DOMContentLoaded', () => {
  const audioElement = document.getElementById('audio-element');
  const playBtn = document.querySelector('.play-btn');
  const pauseBtn = document.querySelector('.pause-btn');
  const progress = document.querySelector('.progress');
  const volumeSlider = document.querySelector('.volume-slider');
  const volumeSliderBar = document.querySelector('.volume-slider-bar');
  const volumeSliderHandle = document.querySelector('.volume-slider-handle');
  const label = document.querySelector(".bb8-toggle");
  var video = document.querySelector("video");
  const formContainer = document.querySelector(".form-container");

	
	// Event listener para o botão de play
	playBtn.addEventListener('click', () => {
  audioElement.play();
});
	
	
// Event listener para o botão de pause
	pauseBtn.addEventListener('click', () => {
  audioElement.pause();
});

// Event listener para atualizar a barra de progresso conforme a música é tocada
	audioElement.addEventListener('timeupdate', () => {
  const percent = (audioElement.currentTime / audioElement.duration) * 100;
  progress.style.width = percent + '%';
});
	  // Event listener para clicar na barra de progresso e avançar a música
  progress.addEventListener('click', (e) => {
  console.log('Barra de progresso clicada!');
  const progressBarRect = progress.getBoundingClientRect();
  const offsetX = e.clientX - progressBarRect.left;
  const percentClicked = (offsetX / progressBarRect.width) * 100;
  const newTime = (percentClicked / 100) * audioElement.duration;
  audioElement.currentTime = newTime;
});


	 // Event listener para verificar se o áudio foi carregado completamente
  audioElement.addEventListener('loadedmetadata', () => {
    const duration = audioElement.duration;
    console.log('Duração do áudio:', duration);
  });


	
volumeSlider.addEventListener("mousedown", (e) => {
  e.preventDefault();
  volumeSliderHandle.classList.add("active");
});

volumeSlider.addEventListener("mouseup", () => {
  volumeSliderHandle.classList.remove("active");
});

volumeSlider.addEventListener("mousemove", (e) => {
  const value = e.clientX / volumeSliderBar.clientWidth;
  audioElement.volume = value;
});


	
	
// Event listener para o botão de pular para trás
	const skipBackBtn = document.querySelector('.skip-btn');
	skipBackBtn.addEventListener('click', () => {
  audioElement.currentTime -= 10; // Pular 10 segundos para trás
});





label.addEventListener("click", () => {
  video.src = "/video/blacksnow.mp4";
	 video.playbackRate = 0.43;
  video.play();
});
	video.playbackRate = 0.43;

formContainer.addEventListener("click", () => {
formContainer.style.backgroundColor = "linear-gradient(to right, #ffffff 35%, transparent 35%, #e81cff, #40c9ff)";
});

	

	






	
});


