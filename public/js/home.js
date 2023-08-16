document.addEventListener('DOMContentLoaded', () => {
	const backgroundVideo = document.getElementById('backgroundVideo');
	backgroundVideo.pause();
    
});

// animaçao Dr.Freud
function openDoor() {
    const bgVideo = document.getElementById('backgroundVideo');
    bgVideo.playbackRate = 2.0;
    bgVideo.play();
	setTimeout(() => {
		window.location.href = '/html/freud.html';
	}, 3750);
    var buttonElement = document.querySelector('.button');
    var h1Element = document.querySelector('h1');
    var pElement = document.querySelector('p');
    var dreliza = document.querySelector('#drElizaButton');
    var drbriza = document.querySelector('#drBrizaaButton');
    buttonElement.style.display = 'none';
    h1Element.style.display = 'none';
    pElement.style.display = 'none';
    dreliza.style.display = 'none';
    drbriza.style.display = 'none';
}


function openDoor1() {
  const bgVideo = document.getElementById('backgroundVideo');
  bgVideo.playbackRate = 2.0;
  bgVideo.play();
setTimeout(() => {
  window.location.href = '/html/eliza.html';
}, 3750);
  var buttonElement = document.querySelector('.button');
  var h1Element = document.querySelector('h1');
  var pElement = document.querySelector('p');
  var dreliza = document.querySelector('#drElizaButton');
  var drbriza = document.querySelector('#drBrizaaButton');
  buttonElement.style.display = 'none';
  h1Element.style.display = 'none';
  pElement.style.display = 'none';
  dreliza.style.display = 'none';
  drbriza.style.display = 'none';
}

function openDoor2() {
  const bgVideo = document.getElementById('backgroundVideo');
  bgVideo.playbackRate = 2.0;
  bgVideo.play();
setTimeout(() => {
  window.location.href = '/html/briza.html';
}, 3750);
  var buttonElement = document.querySelector('.button');
  var h1Element = document.querySelector('h1');
  var pElement = document.querySelector('p');
  var dreliza = document.querySelector('#drElizaButton');
  var drbriza = document.querySelector('#drBrizaaButton');
  buttonElement.style.display = 'none';
  h1Element.style.display = 'none';
  pElement.style.display = 'none';
  dreliza.style.display = 'none';
  drbriza.style.display = 'none';
}



