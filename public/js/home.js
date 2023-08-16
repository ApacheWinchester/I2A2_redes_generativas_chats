document.addEventListener('DOMContentLoaded', () => {
  const drFreudButton = document.getElementById('drFreudButton');
  const drElizaButton = document.getElementById('drElizaButton');
  const drBrizaaButton = document.getElementById('drBrizaaButton');

// animaçao Dr.Freud
drFreudButton.addEventListener('click', () => {
  // Redireciona para a página desejada
  window.location.href = '/html/freud.html';
});


drElizaButton.addEventListener('click', () => {
  // Redireciona para a página desejada
  window.location.href = '/html/eliza.html';
});

drBrizaaButton.addEventListener('click', () => {
  // Redireciona para a página desejada
  window.location.href = '/html/briza.html';
});



});
