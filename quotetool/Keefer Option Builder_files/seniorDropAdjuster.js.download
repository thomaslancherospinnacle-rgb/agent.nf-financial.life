// JavaScript Document
document.addEventListener("DOMContentLoaded", function () {
  // Get the value from the URL query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const desiredValue = urlParams.get("overrideValue");

  // Get the select elements
  const selectElementA = document.getElementById("optionAgeInputA");
  const selectElementB = document.getElementById("optionAgeInputB");

  // Loop through the options and set the selected attribute accordingly for selectElementA
  for (let i = 0; i < selectElementA.options.length; i++) {
    const option = selectElementA.options[i];
    if (option.value === desiredValue) {
      option.selected = true;
      break;
    }
  }
  // Loop through the options and set the selected attribute accordingly for selectElementB
  for (let i = 0; i < selectElementB.options.length; i++) {
    const option = selectElementB.options[i];
    if (option.value === desiredValue) {
      option.selected = true;
      break;
    }
  }
  toggleSeniorShowHide('A');
  toggleSeniorShowHide('B');
});
