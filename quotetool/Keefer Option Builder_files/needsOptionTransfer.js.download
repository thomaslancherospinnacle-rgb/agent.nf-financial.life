// JavaScript Document
//SENDS NAME TO OPTION BUILDER REUSABLE
function sendNameInput(inputId, value) {
  var needOptionNameInput = document.getElementById(inputId);
  needOptionNameInput.value = value;
}

//SENDS AGE TO OPTION BUILDER BY USING THE CALCUALTED AGE TO SELECT FROM THE DROPDOWN BOX
function sendAgeSelection(elementId) {
  var dobTextElement = document.getElementById('dobText' + elementId);
  var needOptionAgeInput = document.getElementById('optionAgeInput' + elementId);
  var dobValue = parseInt(dobTextElement.textContent);

  // Iterate through the options and set the selected option
  for (var i = 0; i < needOptionAgeInput.options.length; i++) {
    var option = needOptionAgeInput.options[i];
    var optionValue = parseInt(option.value);

    if (optionValue === dobValue) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  }
}

function sendDropdownSelection(inputId, targetId) {
  var selectedValue = document.getElementById(inputId).value;
  document.getElementById(targetId).value = selectedValue;
}

//SENDS SELECTION TO OPTION BUILDER FOR SEX AND TOBACCO
function handleNeedsInputChange(element, targetId) {
    var selectedValue = element.value;
    document.getElementById(targetId).value = selectedValue;
  }