// JavaScript Document
//PERFECT FORMAT CURRENCY WHILE TYPING
function optionFormatCurrency(input) {
  // Store the current cursor position
  var cursorPosition = input.selectionStart;

  // Remove all non-digit characters and commas
  var value = input.value.replace(/[^0-9]/g, '').replace(/,/g, '');

  // Add commas for thousands
  var formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Add a dollar sign at the beginning
  formattedValue = '$' + formattedValue;

  // Calculate the number of added characters in the formatted value
  var addedCharacterCount = formattedValue.length - input.value.length;

  // Calculate the adjusted cursor position
  var adjustedCursorPosition = cursorPosition + addedCharacterCount;

  // Adjust the cursor position if the first digit is deleted
  if (cursorPosition === 1 && addedCharacterCount === -1) {
    adjustedCursorPosition = 1;
  }

  // Update the input value
  input.value = formattedValue;

  // Adjust the cursor position
  input.setSelectionRange(adjustedCursorPosition, adjustedCursorPosition);
}

function clearJunk(input) {
  // Remove all non-digit characters and commas
  var value = input.value.replace(/[^0-9]/g, '').replace(/,/g, '');

  // Check if all zeros are entered
  if (value === '0'.repeat(value.length)) {
    input.value = ''; // Set the input value to blank
  }
}

function optionClearDollarCommas(input) {
  // Remove any dollar signs and commas
  var value = input.value.replace(/[$,]/g, '');

  // Check if the value is empty or contains only whitespace
  if (!value.trim()) {
    // Clear the input field
    input.value = '';
  }
}

function formatThisInput(inputId) {
  var input = document.getElementById(inputId);
  input.value = formatFaceAmount(input.value, 'en-US', 'USD');;
}

function formatFaceAmount(value, locale = 'en-US', currency = 'USD') {
  // Clean the value to ensure it's a valid number
  value = parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0;

  return value.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0
  });
}
/*
function handleFocus(element) {
  element.classList.remove('dimmedIncome');
}

function handleBlur(element) {
  if (element.value !== '') {
    element.classList.add('dimmedIncome');
  }
}
*/
function updateOptionAveragePremium(value) {
  if (value === '' || value === 0) {
    var needOptionIncomeInput = document.getElementById('optionAveragePremiumA');
    needOptionIncomeInput.textContent = "";
    return; // Exit the function if value is blank or 0
  }
  var needOptionIncomeInput = document.getElementById('optionAveragePremiumA');

  //SENDS INCOME INPUT FROM NEEDS TO OPTION BUILDER
  document.getElementById('optionIncomeInputA').value = value;
  optionFormatCurrency(document.getElementById("optionIncomeInputA"));

  // Remove non-numeric characters from the value
  value = value.replace(/[^0-9.]/g, '');

  var threePercentA = Math.ceil(value * 0.03 / 10) * 10;
  var sixPercentA = Math.ceil(value * 0.06 / 10) * 10;
  needOptionIncomeInput.textContent = "$" + threePercentA + " - $" + sixPercentA + "/mo";
}
	
function updateOptionAveragePremiumB(value) {
  if (value === '' || value === 0) {
    var needOptionIncomeInput = document.getElementById('optionAveragePremiumB');
    needOptionIncomeInput.textContent = "";
    return; // Exit the function if value is blank or 0
  }
  var needOptionIncomeInput = document.getElementById('optionAveragePremiumB');

  //SENDS INCOME INPUT FROM NEEDS TO OPTION BUILDER
  document.getElementById('optionIncomeInputB').value = value;
  optionFormatCurrency(document.getElementById("optionIncomeInputB"));

  // Remove non-numeric characters from the value
  value = value.replace(/[^0-9.]/g, '');

  var threePercentB = Math.ceil(value * 0.03 / 10) * 10;
  var sixPercentB = Math.ceil(value * 0.06 / 10) * 10;
  needOptionIncomeInput.textContent = "$" + threePercentB + " - $" + sixPercentB + "/mo";
}


  //CLEARS NAME AND AGE ON OPTION BUILDER
  function clearOptionStatsInput() {
    var needOptionNameInput = document.getElementById('optionNameInputA');
    var needOptionAgeInput = document.getElementById('optionAgeInputA');
    var needOptionNameInputB = document.getElementById('optionNameInputB');
    var needOptionAgeInputB = document.getElementById('optionAgeInputB');
    needOptionNameInput.value = '';
    needOptionAgeInput.value = '';
    needOptionNameInputB.value = '';
    needOptionAgeInputB.value = '';
  }