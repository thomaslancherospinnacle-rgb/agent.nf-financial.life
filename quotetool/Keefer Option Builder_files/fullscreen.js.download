// Get the button and image elements
var fullscreenBtn = document.getElementById('fullscreenBtn');
var fullscreenIcon = document.getElementById('fullscreenIcon');

// Add a click event listener to the button
fullscreenBtn.addEventListener('click', toggleFullscreen);

// Function to toggle fullscreen mode
function toggleFullscreen() {
  if (document.fullscreenElement) {
    // If browser is already in fullscreen, exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // Internet Explorer and Edge
      document.msExitFullscreen();
    }
    // Change the image to fullscreen-icon.png
    fullscreenIcon.src = 'img/fullscreen.png';
  } else {
    // If browser is not in fullscreen, go fullscreen
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari and Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // Internet Explorer and Edge
      elem.msRequestFullscreen();
    }
    // Change the image to close_fullscreen.png
    fullscreenIcon.src = 'img/close_fullscreen.png';
  }
}