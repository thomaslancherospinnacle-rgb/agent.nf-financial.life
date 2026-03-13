//SHOW/HIDE SENIOR
function toggleSeniorShowHide(pi) {
  var inputElement = document.getElementById("optionAgeInput" + pi);
  var inputValue = parseInt(inputElement.value);

  var hideSeniorElements = document.getElementsByClassName("hide-senior");
  var showSeniorElements = document.getElementsByClassName("show-senior");

  if (inputValue >= 60) {
    for (var i = 0; i < hideSeniorElements.length; i++) {
      hideSeniorElements[i].style.display = "none";
    }

    for (var j = 0; j < showSeniorElements.length; j++) {
      showSeniorElements[j].style.display = "block"; // Display the show-senior elements
    }
  } else {
    for (var k = 0; k < hideSeniorElements.length; k++) {
      hideSeniorElements[k].style.display = "block"; // Display the hide-senior elements
    }

    for (var l = 0; l < showSeniorElements.length; l++) {
      showSeniorElements[l].style.display = "none";
    }
  }
}