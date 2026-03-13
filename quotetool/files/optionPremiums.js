    var totalPremiumAmount = 0;
	var totalPremiumA = 0;
    var totalPremiumB = 0;

function totalPremiumFunction(pi, premium) {
  premium = Number(document.getElementById(premium).textContent.replace(/\D/g, ''));
	if (pi === 'A') {
		totalPremiumA = premium;
	}
    if (pi === 'B') {
		totalPremiumB = premium;
	}
	
	totalPremium = totalPremiumA + totalPremiumB;
		
	document.getElementById('totalPremiumDisplay').textContent = totalPremium;
}

function increase(input, pi) {
  var inputElement = document.getElementById(input + pi);
  var currentValue = Number(inputElement.value.replace(/\D/g, ''));
	
	if (currentValue > 0) {
	
    document.getElementById("autoPlanCheckbox" + pi).checked = false;
	document.getElementById("autoCompleteCheckbox" + pi).checked = false;
	
  var newValue;

  if (currentValue < 15000) {
    newValue = currentValue + 5000;
  } else {
    newValue = currentValue / (0.75);
  }

  newValue = Math.floor(newValue / 5000) * 5000;

  if (newValue >= 30000 && newValue < 35000) {
    newValue = 35000;
  } else if (newValue >= 50000 && newValue < 60000) {
    newValue = 60000;
  } else if (newValue >= 100000 && newValue < 120000) {
    newValue = 120000;
  } else if (newValue >= 9999999) {
    newValue = 9999999;
  }

  inputElement.value = formatFaceAmount(newValue, 'en-US', 'USD');

	}
	calculatePremium(pi);
}

function reduce(input, pi) {
  var inputElement = document.getElementById(input + pi);
  var currentValue = Number(inputElement.value.replace(/\D/g, ''));
	
	if (currentValue > 0) {
	
    document.getElementById("autoPlanCheckbox" + pi).checked = false;
	document.getElementById("autoCompleteCheckbox" + pi).checked = false;
	
  var newValue = currentValue * 0.75;
  newValue = Math.round(newValue / 5000) * 5000;

  if (newValue <= 10000) {
    newValue = newValue * .5;
  } else if (newValue >= 30000 && newValue < 35000) {
    newValue = 35000;
  } else if (newValue >= 50000 && newValue < 60000) {
    newValue = 60000;
  } else if (newValue >= 100000 && newValue < 120000) {
    newValue = 120000;
  }

  if (newValue <= 0) {
    inputElement.value = "";
  } else {
    inputElement.value = formatFaceAmount(newValue, 'en-US', 'USD');
  }

	calculatePremium(pi);
	}
}

function copyPrimary() {
var wlPlatinumInputA = document.getElementById("wlPlatinumInputA").value;
var adbPlatinumInputA = document.getElementById("adbPlatinumInputA").value;
var tenrcPlatinumInputA = document.getElementById("tenrcPlatinumInputA").value;
var wlGoldInputA = document.getElementById("wlGoldInputA").value;
var adbGoldInputA = document.getElementById("adbGoldInputA").value;
var tenrcGoldInputA = document.getElementById("tenrcGoldInputA").value;
var wlSilverInputA = document.getElementById("wlSilverInputA").value;
var adbSilverInputA = document.getElementById("adbSilverInputA").value;
var tenrcSilverInputA = document.getElementById("tenrcSilverInputA").value;

// Check if all "A" values are blank
if (
  wlPlatinumInputA === "" &&
  adbPlatinumInputA === "" &&
  tenrcPlatinumInputA === "" &&
  wlGoldInputA === "" &&
  adbGoldInputA === "" &&
  tenrcGoldInputA === "" &&
  wlSilverInputA === "" &&
  adbSilverInputA === "" &&
  tenrcSilverInputA === ""
) {
  // If all "A" values are blank, don't do anything
} else {
  // Otherwise, perform the actions
  document.getElementById("autoPlanCheckboxB").checked = false;
  document.getElementById("autoCompleteCheckboxB").checked = false;
  document.getElementById("wlPlatinumInputB").value = wlPlatinumInputA;
  document.getElementById("adbPlatinumInputB").value = adbPlatinumInputA;
  document.getElementById("tenrcPlatinumInputB").value = tenrcPlatinumInputA;
  document.getElementById("wlGoldInputB").value = wlGoldInputA;
  document.getElementById("adbGoldInputB").value = adbGoldInputA;
  document.getElementById("tenrcGoldInputB").value = tenrcGoldInputA;
  document.getElementById("wlSilverInputB").value = wlSilverInputA;
  document.getElementById("adbSilverInputB").value = adbSilverInputA;
  document.getElementById("tenrcSilverInputB").value = tenrcSilverInputA;
  calculatePremium('B');
}
}

function toggleCopyPrimaryButtonVisibility() {
    var copyPrimaryButton = document.getElementById("copyPrimaryButton");

    if (copyPrimaryButton.style.display === "none") {
        copyPrimaryButton.style.display = "inline-block";
    }
}

function toggleCopyPrimaryButtonVisibilityOff() {
    var copyPrimaryButton = document.getElementById("copyPrimaryButton");

    if (copyPrimaryButton.style.display === "inline-block") {
        copyPrimaryButton.style.display = "none";
    }
}

//CALCULATE PREMIUMS
function calculatePremium(pi) {
  //RATES WL
  var rMNTU = [10.21, 10.57, 10.95, 11.34, 11.79, 12.25, 12.73, 13.3, 13.95, 14.65, 15.38, 16.16, 17.01, 17.94, 18.91, 19.95, 21.05, 22.19, 23.29, 24.47, 25.73, 27.04, 28.43, 29.89, 31.44, 33.04, 34.74, 36.61, 38.57, 40.68, 42.9, 45.26, 47.78, 50.46, 53.28, 56.29, 59.48, 62.74, 66.13, 69.68, 73.48, 77.51];
  var prMNTU = [8.9, 9.21, 9.53, 9.9, 10.27, 10.68, 11.11, 11.61, 12.16, 12.76, 13.4, 14.08, 14.84, 15.65, 16.46, 17.38, 18.35, 19.32, 20.28, 21.33, 22.44, 23.56, 24.76, 26.05, 27.37, 28.8, 30.28, 31.89, 33.6, 35.44, 37.4, 39.43, 41.62, 43.94, 46.44, 49.05, 51.81, 54.65, 57.59, 60.7, 64.01, 67.52];
  var exMNTU = [7.73, 8, 8.3, 8.57, 8.94, 9.27, 9.64, 10.06, 10.54, 11.06, 11.63, 12.24, 12.88, 13.57, 14.3, 15.11, 15.92, 16.77, 17.62, 18.51, 19.46, 20.45, 21.51, 22.61, 23.77, 24.98, 26.27, 27.69, 29.17, 30.79, 32.46, 34.24, 36.14, 38.17, 40.31, 42.57, 45, 47.47, 50.01, 52.72, 55.58, 58.63];
  var slMNTU = [6.59, 6.76, 6.95, 7.2, 7.41, 7.67, 7.96, 8.28, 8.64, 9.04, 9.47, 9.94, 10.43, 10.85, 11.51, 12.1, 12.72, 13.39, 14.09, 14.82, 15.61, 16.46, 17.36, 18.33, 19.36, 20.45, 21.58, 22.72, 23.87, 25.04, 26.29, 27.61, 29.05, 30.56, 32.22, 34.01, 36, 38.17, 40.59, 43.22, 46.07, 49.12];
  var rMTU = [12.81, 13.27, 13.75, 14.29, 14.82, 15.43, 16.07, 16.77, 17.56, 18.43, 19.33, 20.3, 21.36, 22.48, 23.67, 24.96, 26.3, 27.75, 29.35, 31.03, 32.82, 34.7, 36.69, 38.82, 41.09, 43.47, 46.01, 48.6, 51.23, 54.01, 56.96, 60.12, 63.43, 67.01, 70.77, 74.74, 78.81, 83.02, 87.33, 91.76, 96.42, 101.37];
  var prMTU = [11.16, 11.56, 11.96, 12.43, 12.93, 13.45, 13.99, 14.62, 15.29, 16.05, 16.84, 17.68, 18.6, 19.59, 20.63, 21.75, 22.92, 24.17, 25.58, 27.03, 28.58, 30.22, 31.97, 33.83, 35.78, 37.87, 40.09, 42.34, 44.64, 47.05, 49.62, 52.37, 55.27, 58.37, 61.66, 65.12, 68.69, 72.33, 76.05, 79.89, 84.01, 88.29];
  var exMTU = [9.68, 10.02, 10.41, 10.8, 11.21, 11.68, 12.14, 12.68, 13.28, 13.94, 14.62, 15.36, 16.16, 17, 17.89, 18.89, 19.89, 20.98, 22.22, 23.46, 24.84, 26.25, 27.75, 29.38, 31.08, 32.88, 34.8, 36.74, 38.77, 40.85, 43.08, 45.47, 48, 50.67, 53.49, 56.43, 59.49, 62.7, 66, 69.43, 72.99, 76.69];
  var slMTU = [8.43, 8.61, 8.83, 9.08, 9.36, 9.69, 10.07, 10.51, 11.03, 11.62, 12.26, 12.95, 13.66, 14.4, 15.17, 15.99, 16.88, 17.87, 18.97, 20.14, 21.41, 22.74, 24.15, 25.65, 27.21, 28.83, 30.51, 32.2, 33.91, 35.63, 37.43, 39.31, 41.28, 43.36, 45.55, 47.88, 50.41, 53.21, 56.29, 59.64, 63.23, 67.02];
  var rFNTU = [9.2, 9.55, 9.91, 10.29, 10.67, 11.1, 11.57, 12.08, 12.65, 13.28, 13.95, 14.66, 15.39, 16.14, 16.91, 17.71, 18.51, 19.33, 20.15, 20.99, 21.86, 22.73, 23.6, 24.47, 25.35, 26.29, 27.39, 28.71, 30.32, 32.17, 34.2, 36.37, 38.7, 41.14, 43.66, 46.28, 49.01, 51.8, 54.67, 57.62, 60.64, 63.71];
  var prFNTU = [8.01, 8.32, 8.63, 8.96, 9.3, 9.67, 10.07, 10.52, 11.01, 11.58, 12.16, 12.77, 13.4, 14.05, 14.73, 15.42, 16.12, 16.83, 17.55, 18.27, 19.02, 19.78, 20.54, 21.3, 22.08, 22.91, 23.87, 25, 26.41, 28.01, 29.8, 31.69, 33.68, 35.78, 38.04, 40.34, 42.69, 45.11, 47.57, 50.09, 52.72, 55.47];
  var exFNTU = [6.95, 7.22, 7.49, 7.78, 8.07, 8.4, 8.75, 9.14, 9.57, 10.04, 10.54, 11.08, 11.64, 12.2, 12.78, 13.39, 14, 14.62, 15.25, 15.88, 16.53, 17.19, 17.85, 18.51, 19.17, 19.88, 20.72, 21.72, 22.94, 24.33, 25.87, 27.51, 29.26, 31.11, 33.05, 35.07, 37.14, 39.27, 41.43, 43.64, 45.91, 48.23];
  var slFNTU = [5.96, 6.14, 6.33, 6.52, 6.73, 6.95, 7.19, 7.45, 7.73, 8.04, 8.37, 8.7, 9.07, 9.47, 9.91, 10.35, 10.81, 11.28, 11.76, 12.24, 12.73, 13.27, 13.83, 14.43, 15.19, 16, 16.88, 17.76, 18.64, 19.52, 20.42, 21.43, 22.59, 23.91, 25.39, 27.01, 28.7, 30.46, 32.25, 34.11, 36.12, 38.31];
  var rFTU = [11.54, 11.96, 12.41, 12.86, 13.35, 13.88, 14.47, 15.11, 15.83, 16.59, 17.42, 18.29, 19.23, 20.26, 21.34, 22.46, 23.68, 24.92, 26.17, 27.5, 28.88, 30.35, 31.89, 33.49, 35.19, 37.01, 38.9, 40.82, 42.77, 44.8, 46.97, 49.24, 51.61, 54.15, 56.79, 59.61, 62.55, 65.61, 68.85, 72.21, 75.82, 79.6];
  var prFTU = [10.05, 10.43, 10.82, 11.2, 11.64, 12.1, 12.61, 13.16, 13.77, 14.45, 15.18, 15.93, 16.76, 17.64, 18.57, 19.58, 20.64, 21.69, 22.8, 23.96, 25.17, 26.42, 27.76, 29.18, 30.66, 32.22, 33.89, 35.56, 37.25, 39.04, 40.92, 42.89, 44.95, 47.17, 49.51, 51.93, 54.51, 57.15, 60, 62.92, 66.05, 69.33];
  var exFTU = [8.73, 9.05, 9.4, 9.73, 10.11, 10.49, 10.94, 11.42, 11.96, 12.54, 13.18, 13.84, 14.54, 15.31, 16.14, 16.99, 17.9, 18.84, 19.79, 20.79, 21.84, 22.95, 24.11, 25.35, 26.63, 27.97, 29.41, 30.86, 32.35, 33.89, 35.54, 37.23, 39.05, 40.95, 42.97, 45.1, 47.32, 49.62, 52.07, 54.63, 57.34, 60.21];
  var slFTU = [7.15, 7.35, 7.56, 7.8, 8.05, 8.31, 8.63, 8.97, 9.36, 9.81, 10.29, 10.78, 11.32, 11.87, 12.44, 13.03, 13.67, 14.35, 15.07, 15.82, 16.6, 17.39, 18.29, 19.23, 20.2, 21.23, 22.29, 23.35, 24.4, 25.48, 26.59, 27.81, 29.15, 30.65, 32.28, 34.06, 35.91, 37.87, 39.86, 41.96, 44.21, 46.69];

  //RATES 10RC
  var tenrcmntu = [3.7, 3.71, 3.72, 3.74, 3.76, 3.78, 3.8, 3.83, 3.89, 3.93, 3.97, 4.01, 4.05, 4.11, 4.19, 4.27, 4.4, 4.59, 4.81, 5.07, 5.38, 5.73, 6.12, 6.55, 7.02, 7.55, 8.14, 8.8, 9.51, 10.31, 11.18, 12.14, 13.19, 14.33, 15.59, 16.99, 18.61, 20.45, 22.53, 24.84, 27.36, 30.06];
  var tenrcmtu = [4.71, 4.79, 4.85, 4.91, 5, 5.07, 5.15, 5.25, 5.34, 5.47, 5.58, 5.72, 5.86, 6.01, 6.17, 6.36, 6.62, 6.92, 7.29, 7.7, 8.19, 8.75, 9.38, 10.08, 10.85, 11.72, 12.66, 13.72, 14.9, 16.17, 17.54, 18.97, 20.48, 22.01, 23.68, 25.55, 27.65, 30.07, 32.82, 35.87, 39.2, 42.78];
  var tenrcfntu = [3.18, 3.2, 3.21, 3.22, 3.24, 3.26, 3.27, 3.29, 3.32, 3.36, 3.39, 3.44, 3.48, 3.53, 3.58, 3.69, 3.78, 3.93, 4.13, 4.36, 4.62, 4.91, 5.24, 5.6, 5.99, 6.42, 6.91, 7.47, 8.09, 8.77, 9.52, 10.33, 11.16, 12.03, 13, 14.11, 15.39, 16.87, 18.59, 20.51, 22.61, 24.89];
  var tenrcftu = [4.37, 4.42, 4.47, 4.55, 4.62, 4.7, 4.8, 4.88, 5, 5.1, 5.23, 5.34, 5.46, 5.58, 5.7, 5.87, 6.05, 6.31, 6.58, 6.92, 7.32, 7.78, 8.28, 8.85, 9.49, 10.17, 10.93, 11.76, 12.65, 13.61, 14.64, 15.75, 16.92, 18.11, 19.44, 20.91, 22.56, 24.51, 26.71, 29.17, 31.84, 34.77];

  //RATES ADB
  var adbRate = 1;

  //RATES SENIOR LEVEL AND GRADED WL
  var srwlmntu = [86.12, 90.93, 96.03, 101.46, 107.2, 113.53, 120.44, 127.85, 135.77, 144.29, 153.45, 164.79, 177, 190.08, 204.09, 218.97, 234.76, 251.67, 269.78, 289.34, 309.85];
  var srwlmtu = [112.22, 118.05, 124.24, 130.76, 137.65, 144.95, 154.12, 163.89, 174.34, 185.57, 197.64, 210.58, 224.41, 239.09, 254.59, 270.94];
  var srwlfntu = [70.4, 73.85, 77.51, 81.55, 86.07, 91.18, 97.33, 104.15, 111.65, 119.83, 128.68, 138.11, 148.26, 159.15, 170.82, 183.29, 196.77, 211.06, 226.21, 242.19, 259.03];
  var srwlftu = [87.99, 92.46, 97.19, 102.17, 107.45, 113.37, 120.08, 127.31, 134.96, 143.19, 152.03, 161.54, 171.69, 182.46, 193.84, 205.83];
  var srgrmntu = [83.61, 88.28, 93.24, 98.5, 104.08, 110.22, 116.93, 124.12, 131.81, 140.09, 148.98, 159.99, 171.85, 184.54, 198.15, 212.6, 227.93, 244.34, 261.93, 280.92, 300.82];
  var srgrmtu = [108.96, 114.62, 120.62, 126.96, 133.64, 140.73, 149.63, 159.12, 169.26, 180.16, 191.88, 204.45, 217.87, 232.12, 247.18, 263.05];
  var srgrfntu = [68.35, 71.7, 75.26, 79.17, 83.56, 88.53, 94.49, 101.12, 108.4, 116.34, 124.94, 134.09, 143.94, 154.52, 165.84, 177.96, 191.04, 204.91, 219.62, 235.13, 251.48];
  var srgrftu = [85.43, 89.77, 94.35, 99.2, 104.32, 110.07, 116.59, 123.59, 131.03, 139.02, 147.6, 156.84, 166.69, 177.14, 188.19, 199.83];

  //PI STATS
  var ageInput = Number(document.getElementById("optionAgeInput" + pi).value);
  var ageInputEV = ageInput - 18;
  var ageInputEVSenior = ageInput - 60;
  var sexInput = document.getElementById("optionSexInput" + pi).value;
  var tobInput = document.getElementById("optionTobInput" + pi).value;

  //FACE AMOUNT INPUTS
  var wlPlatinumInput = Number(document.getElementById("wlPlatinumInput" + pi).value.replace(/\D/g, ''));
  var wlGoldInput = Number(document.getElementById("wlGoldInput" + pi).value.replace(/\D/g, ''));
  var wlSilverInput = Number(document.getElementById("wlSilverInput" + pi).value.replace(/\D/g, ''));
  var tenrcPlatinumInput = Number(document.getElementById("tenrcPlatinumInput" + pi).value.replace(/\D/g, ''));
  var tenrcGoldInput = Number(document.getElementById("tenrcGoldInput" + pi).value.replace(/\D/g, ''));
  var tenrcSilverInput = Number(document.getElementById("tenrcSilverInput" + pi).value.replace(/\D/g, ''));
  var adbPlatinumInput = Number(document.getElementById("adbPlatinumInput" + pi).value.replace(/\D/g, ''));
  var adbGoldInput = Number(document.getElementById("adbGoldInput" + pi).value.replace(/\D/g, ''));
  var adbSilverInput = Number(document.getElementById("adbSilverInput" + pi).value.replace(/\D/g, ''));

  //RATES AND RESULTS
  var wlPlatinumRate;
  var wlPlatinumPremium;
  var wlGoldRate;
  var wlGoldPremium;
  var wlSilverRate;
  var wlSilverPremium;
  var tenrcPlatinumRate;
  var tenrcPlatinumPremium;
  var tenrcGoldRate;
  var tenrcGoldPremium;
  var tenrcSilverRate;
  var tenrcSilverPremium;
  var adbPlatinumPremium;
  var adbGoldPremium;
  var adbSilverPremium;
	
  //STATE
  var seniorLevel = document.getElementById("state").value;

  //INCOME INPUTS
  var optionIncomeInput = Number(document.getElementById("optionIncomeInput" + pi).value.replace(/\D/g, ''));

  //INCOME MINIMUM INPUT
  if (optionIncomeInput > 0 && optionIncomeInput < 1000) {
    optionIncomeInput = 1000;
    document.getElementById("optionIncomeInput" + pi).value = optionIncomeInput;
    optionFormatCurrency(document.getElementById("optionIncomeInput" + pi));
  }

  //CHECKBOXES
  var autoPlanCheckbox = document.getElementById("autoPlanCheckbox" + pi);
  var autoCompleteCheckbox = document.getElementById("autoCompleteCheckbox" + pi);

  //AUTO PLAN
  //IF INCOME IS ENTERED ENABLE THE AUTO PLAN CHECKBOX
  if (autoPlanCheckbox.disabled && optionIncomeInput > 0) {
    document.getElementById("autoPlanCheckbox" + pi).removeAttribute("disabled");

  }
  //IF INCOME IS ZERO DISABLE THE AUTO PLAN CHECKBOX
  if (optionIncomeInput < 1) {
    document.getElementById("autoPlanCheckbox" + pi).checked = false;
    document.getElementById("autoPlanCheckbox" + pi).setAttribute("disabled", "true");
    document.getElementById("autoCompleteCheckbox" + pi).removeAttribute("disabled");
  }

  //IF INCOME IS ENTERED AND AUTO PLAN CHECKBOX IS CHECKED THEN DO THIS
  if (autoPlanCheckbox.checked && optionIncomeInput > 0) {
    document.getElementById("autoCompleteCheckbox" + pi).checked = false;

    if (ageInput >= 18 && ageInput <= 49) {

      var leftoverPlatinumPremium = optionIncomeInput * .06 - 16.67;
      var leftoverGoldPremium = optionIncomeInput * .045 - 12.5;
      var leftoverSilverPremium = optionIncomeInput * .03 - 8.34;
      var autoPlanRate;

    }

    if (ageInput >= 50 && ageInput <= 59) {

      var leftoverPlatinumPremium = optionIncomeInput * .06 - 20.84;
      var leftoverGoldPremium = optionIncomeInput * .045 - 15.63;
      var leftoverSilverPremium = optionIncomeInput * .03 - 10.42;
      var autoPlanRate;

    }

    if (ageInput >= 60) {

      var leftoverPlatinumPremium = optionIncomeInput * .06;
      var leftoverGoldPremium = optionIncomeInput * .045;
      var leftoverSilverPremium = optionIncomeInput * .03;
      var autoPlanRate;

    }

    //AGE 18-59
    if (ageInput >= 18 && ageInput <= 59) {
      //MALE NTU PLATINUM
      if (sexInput == "male" && tobInput == "ntu") {
        if ((leftoverPlatinumPremium * 12 - 25) / slMNTU[ageInputEV] >= 120) {
          autoPlanRate = slMNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / exMNTU[ageInputEV] >= 60) {
          autoPlanRate = exMNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prMNTU[ageInputEV] >= 35) {
          autoPlanRate = prMNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prMNTU[ageInputEV] < 35) {
          autoPlanRate = rMNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        }
        //MALE NTU GOLD
        if ((leftoverGoldPremium * 12 - 25) / slMNTU[ageInputEV] >= 120) {
          autoPlanRate = slMNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / exMNTU[ageInputEV] >= 60) {
          autoPlanRate = exMNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prMNTU[ageInputEV] >= 35) {
          autoPlanRate = prMNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prMNTU[ageInputEV] < 35) {
          autoPlanRate = rMNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        }
        //MALE NTU SILVER
        if ((leftoverSilverPremium * 12 - 25) / slMNTU[ageInputEV] >= 120) {
          autoPlanRate = slMNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / exMNTU[ageInputEV] >= 60) {
          autoPlanRate = exMNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prMNTU[ageInputEV] >= 35) {
          autoPlanRate = prMNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prMNTU[ageInputEV] < 35) {
          autoPlanRate = rMNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        }
      }
      //MALE TU PLATINUM
      if (sexInput == "male" && tobInput == "tu") {
        if ((leftoverPlatinumPremium * 12 - 25) / slMTU[ageInputEV] >= 120) {
          autoPlanRate = slMTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / exMTU[ageInputEV] >= 60) {
          autoPlanRate = exMTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prMTU[ageInputEV] >= 35) {
          autoPlanRate = prMTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prMTU[ageInputEV] < 35) {
          autoPlanRate = rMTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        }
        //MALE TU GOLD
        if ((leftoverGoldPremium * 12 - 25) / slMTU[ageInputEV] >= 120) {
          autoPlanRate = slMTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / exMTU[ageInputEV] >= 60) {
          autoPlanRate = exMTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prMTU[ageInputEV] >= 35) {
          autoPlanRate = prMTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prMTU[ageInputEV] < 35) {
          autoPlanRate = rMTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        }
        //MALE TU SILVER
        if ((leftoverSilverPremium * 12 - 25) / slMTU[ageInputEV] >= 120) {
          autoPlanRate = slMTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / exMTU[ageInputEV] >= 60) {
          autoPlanRate = exMTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prMTU[ageInputEV] >= 35) {
          autoPlanRate = prMTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prMTU[ageInputEV] < 35) {
          autoPlanRate = rMTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        }
      }
      //FEMALE NTU PLATINUM
      if (sexInput == "female" && tobInput == "ntu") {
        if ((leftoverPlatinumPremium * 12 - 25) / slFNTU[ageInputEV] >= 120) {
          autoPlanRate = slFNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / exFNTU[ageInputEV] >= 60) {
          autoPlanRate = exFNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prFNTU[ageInputEV] >= 35) {
          autoPlanRate = prFNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prFNTU[ageInputEV] < 35) {
          autoPlanRate = rFNTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        }
        //FEMALE NTU GOLD
        if ((leftoverGoldPremium * 12 - 25) / slFNTU[ageInputEV] >= 120) {
          autoPlanRate = slFNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / exFNTU[ageInputEV] >= 60) {
          autoPlanRate = exFNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prFNTU[ageInputEV] >= 35) {
          autoPlanRate = prFNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prFNTU[ageInputEV] < 35) {
          autoPlanRate = rFNTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        }
        //FEMALE NTU SILVER
        if ((leftoverSilverPremium * 12 - 25) / slFNTU[ageInputEV] >= 120) {
          autoPlanRate = slFNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / exFNTU[ageInputEV] >= 60) {
          autoPlanRate = exFNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prFNTU[ageInputEV] >= 35) {
          autoPlanRate = prFNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prFNTU[ageInputEV] < 35) {
          autoPlanRate = rFNTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        }
      }
      //FEMALE TU PLATINUM
      if (sexInput == "female" && tobInput == "tu") {
        if ((leftoverPlatinumPremium * 12 - 25) / slFTU[ageInputEV] >= 120) {
          autoPlanRate = slFTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / exFTU[ageInputEV] >= 60) {
          autoPlanRate = exFTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prFTU[ageInputEV] >= 35) {
          autoPlanRate = prFTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        } else if ((leftoverPlatinumPremium * 12) / prFTU[ageInputEV] < 35) {
          autoPlanRate = rFTU[ageInputEV];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
          adbPlatinumInput = 200000;
          document.getElementById('adbPlatinumInput' + pi).value = adbPlatinumInput;
        }
        //FEMALE TU GOLD
        if ((leftoverGoldPremium * 12 - 25) / slFTU[ageInputEV] >= 120) {
          autoPlanRate = slFTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / exFTU[ageInputEV] >= 60) {
          autoPlanRate = exFTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prFTU[ageInputEV] >= 35) {
          autoPlanRate = prFTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        } else if ((leftoverGoldPremium * 12) / prFTU[ageInputEV] < 35) {
          autoPlanRate = rFTU[ageInputEV];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
          adbGoldInput = 150000;
          document.getElementById('adbGoldInput' + pi).value = adbGoldInput;
        }
        //FEMALE TU SILVER
        if ((leftoverSilverPremium * 12 - 25) / slFTU[ageInputEV] >= 120) {
          autoPlanRate = slFTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12 - 25) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / exFTU[ageInputEV] >= 60) {
          autoPlanRate = exFTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prFTU[ageInputEV] >= 35) {
          autoPlanRate = prFTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        } else if ((leftoverSilverPremium * 12) / prFTU[ageInputEV] < 35) {
          autoPlanRate = rFTU[ageInputEV];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
          adbSilverInput = 100000;
          document.getElementById('adbSilverInput' + pi).value = adbSilverInput;
        }
      }
      optionFormatCurrency(document.getElementById("wlPlatinumInput" + pi));
      optionFormatCurrency(document.getElementById("adbPlatinumInput" + pi));
      optionFormatCurrency(document.getElementById("wlGoldInput" + pi));
      optionFormatCurrency(document.getElementById("adbGoldInput" + pi));
      optionFormatCurrency(document.getElementById("wlSilverInput" + pi));
      optionFormatCurrency(document.getElementById("adbSilverInput" + pi));
    }

    //AGE 60-80
    if (ageInput >= 60) {
      if (["MA", "MN", "NH", "NJ", "NC", "PA", "WA", "WV"].includes(seniorLevel)) {
        //MALE NTU PLATINUM
        if (sexInput == "male" && tobInput == "ntu") {
          autoPlanRate = srwlmntu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //MALE NTU GOLD
        if (sexInput == "male" && tobInput == "ntu") {
          autoPlanRate = srwlmntu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //MALE NTU SILVER
        if (sexInput == "male" && tobInput == "ntu") {
          autoPlanRate = srwlmntu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }
        //MALE TU PLATINUM
        if (sexInput == "male" && tobInput == "tu") {
          autoPlanRate = srwlmtu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //MALE TU GOLD
        if (sexInput == "male" && tobInput == "tu") {
          autoPlanRate = srwlmtu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //MALE TU SILVER
        if (sexInput == "male" && tobInput == "tu") {
          autoPlanRate = srwlmtu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }
        //FEMALE NTU PLATINUM
        if (sexInput == "female" && tobInput == "ntu") {
          autoPlanRate = srwlfntu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //FEMALE NTU GOLD
        if (sexInput == "female" && tobInput == "ntu") {
          autoPlanRate = srwlfntu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //FEMALE NTU SILVER
        if (sexInput == "female" && tobInput == "ntu") {
          autoPlanRate = srwlfntu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }
        //FEMALE TU PLATINUM
        if (sexInput == "female" && tobInput == "tu") {
          autoPlanRate = srwlftu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //FEMALE TU GOLD
        if (sexInput == "female" && tobInput == "tu") {
          autoPlanRate = srwlftu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //FEMALE TU SILVER
        if (sexInput == "female" && tobInput == "tu") {
          autoPlanRate = srwlftu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }

      } else {
        //MALE NTU PLATINUM
        if (sexInput == "male" && tobInput == "ntu") {
          autoPlanRate = srgrmntu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //MALE NTU GOLD
        if (sexInput == "male" && tobInput == "ntu") {
          autoPlanRate = srgrmntu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //MALE NTU SILVER
        if (sexInput == "male" && tobInput == "ntu") {
          autoPlanRate = srgrmntu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }
        //MALE TU PLATINUM
        if (sexInput == "male" && tobInput == "tu") {
          autoPlanRate = srgrmtu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //MALE TU GOLD
        if (sexInput == "male" && tobInput == "tu") {
          autoPlanRate = srgrmtu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //MALE TU SILVER
        if (sexInput == "male" && tobInput == "tu") {
          autoPlanRate = srgrmtu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }
        //FEMALE NTU PLATINUM
        if (sexInput == "female" && tobInput == "ntu") {
          autoPlanRate = srgrfntu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //FEMALE NTU GOLD
        if (sexInput == "female" && tobInput == "ntu") {
          autoPlanRate = srgrfntu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //FEMALE NTU SILVER
        if (sexInput == "female" && tobInput == "ntu") {
          autoPlanRate = srgrfntu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }
        //FEMALE TU PLATINUM
        if (sexInput == "female" && tobInput == "tu") {
          autoPlanRate = srgrftu[ageInputEVSenior];
          wlPlatinumInput = Math.round((leftoverPlatinumPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlPlatinumInput' + pi).value = wlPlatinumInput;
        }
        //FEMALE TU GOLD
        if (sexInput == "female" && tobInput == "tu") {
          autoPlanRate = srgrftu[ageInputEVSenior];
          wlGoldInput = Math.round((leftoverGoldPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlGoldInput' + pi).value = wlGoldInput;
        }
        //FEMALE TU SILVER
        if (sexInput == "female" && tobInput == "tu") {
          autoPlanRate = srgrftu[ageInputEVSenior];
          wlSilverInput = Math.round((leftoverSilverPremium * 12) / autoPlanRate * 1000 / 1000) * 1000;
          document.getElementById('wlSilverInput' + pi).value = wlSilverInput;
        }

      }
      optionFormatCurrency(document.getElementById("wlPlatinumInput" + pi));
      optionFormatCurrency(document.getElementById("wlGoldInput" + pi));
      optionFormatCurrency(document.getElementById("wlSilverInput" + pi));
    }
  }

  //AUTO COMPLETE
    if (autoCompleteCheckbox.checked) {
		
  if (ageInput >= 18 && ageInput <= 59) {

      wlGoldInput = Math.round(wlPlatinumInput * 0.667 / 1000) * 1000;
      wlSilverInput = Math.round(wlPlatinumInput * 0.334 / 1000) * 1000;
      adbGoldInput = Math.round(adbPlatinumInput * .75 / 1000) * 1000;
      adbSilverInput = Math.round(adbPlatinumInput * 0.50 / 1000) * 1000;
      tenrcGoldInput = Math.round(tenrcPlatinumInput * 0.667 / 1000) * 1000;
      tenrcSilverInput = Math.round(tenrcPlatinumInput * 0.334 / 1000) * 1000;

      document.getElementById("wlGoldInput" + pi).value = wlGoldInput;
      optionFormatCurrency(document.getElementById("wlGoldInput" + pi));
      optionClearDollarCommas(document.getElementById("wlGoldInput" + pi));

      document.getElementById("adbGoldInput" + pi).value = adbGoldInput;
      optionFormatCurrency(document.getElementById("adbGoldInput" + pi));
      optionClearDollarCommas(document.getElementById("adbGoldInput" + pi));

      document.getElementById("tenrcGoldInput" + pi).value = tenrcGoldInput;
      optionFormatCurrency(document.getElementById("tenrcGoldInput" + pi));
      optionClearDollarCommas(document.getElementById("tenrcGoldInput" + pi));

      document.getElementById("wlSilverInput" + pi).value = wlSilverInput;
      optionFormatCurrency(document.getElementById("wlSilverInput" + pi));
      optionClearDollarCommas(document.getElementById("wlSilverInput" + pi));

      document.getElementById("adbSilverInput" + pi).value = adbSilverInput;
      optionFormatCurrency(document.getElementById("adbSilverInput" + pi));
      optionClearDollarCommas(document.getElementById("adbSilverInput" + pi));

      document.getElementById("tenrcSilverInput" + pi).value = tenrcSilverInput;
      optionFormatCurrency(document.getElementById("tenrcSilverInput" + pi));
      optionClearDollarCommas(document.getElementById("tenrcSilverInput" + pi));
  }
  if (ageInput >= 60) {
      wlGoldInput = Math.round(wlPlatinumInput * 0.834);
      wlSilverInput = Math.round(wlPlatinumInput * 0.667);

      document.getElementById("wlGoldInput" + pi).value = wlGoldInput;
      optionFormatCurrency(document.getElementById("wlGoldInput" + pi));
      optionClearDollarCommas(document.getElementById("wlGoldInput" + pi));

      document.getElementById("wlSilverInput" + pi).value = wlSilverInput;
      optionFormatCurrency(document.getElementById("wlSilverInput" + pi));
      optionClearDollarCommas(document.getElementById("wlSilverInput" + pi));
    }
  }

  //MINIMUM FACEAMOUNT INPUTS WL
  if (wlPlatinumInput > 0 && wlPlatinumInput < 1000) {
    wlPlatinumInput = 1000;
    document.getElementById("wlPlatinumInput" + pi).value = formatFaceAmount(wlPlatinumInput, 'en-US', 'USD');
  } else if (wlPlatinumInput === 0) {
    document.getElementById("wlPlatinumInput" + pi).value = '';
  }
  if (wlGoldInput > 0 && wlGoldInput < 1000) {
    wlGoldInput = 1000;
    document.getElementById("wlGoldInput" + pi).value = formatFaceAmount(wlGoldInput, 'en-US', 'USD');
  } else if (wlGoldInput === 0) {
    document.getElementById("wlGoldInput" + pi).value = '';
  }
  if (wlSilverInput > 0 && wlSilverInput < 1000) {
    wlSilverInput = 1000;
    document.getElementById("wlSilverInput" + pi).value = formatFaceAmount(wlSilverInput, 'en-US', 'USD');
  } else if (wlSilverInput === 0) {
    document.getElementById("wlSilverInput" + pi).value = '';
  }

  //MINIMUM FACEAMOUNT INPUTS TERM
  if (tenrcPlatinumInput > 0 && tenrcPlatinumInput < 1000) {
    tenrcPlatinumInput = 1000;
    document.getElementById("tenrcPlatinumInput" + pi).value = formatFaceAmount(tenrcPlatinumInput, 'en-US', 'USD');
  } else if (tenrcPlatinumInput === 0) {
    document.getElementById("tenrcPlatinumInput" + pi).value = '';
  }
  if (tenrcGoldInput > 0 && tenrcGoldInput < 1000) {
    tenrcGoldInput = 1000;
    document.getElementById("tenrcGoldInput" + pi).value = formatFaceAmount(tenrcGoldInput, 'en-US', 'USD');
  } else if (tenrcGoldInput === 0) {
    document.getElementById("tenrcGoldInput" + pi).value = '';
  }
  if (tenrcSilverInput > 0 && tenrcSilverInput < 1000) {
    tenrcSilverInput = 1000;
    document.getElementById("tenrcSilverInput" + pi).value = formatFaceAmount(tenrcSilverInput, 'en-US', 'USD');
  } else if (tenrcSilverInput === 0) {
    document.getElementById("tenrcSilverInput" + pi).value = '';
  }

  //MINIMUM FACEAMOUNT INPUTS ADB
  if (adbPlatinumInput > 0 && adbPlatinumInput < 1000) {
    adbPlatinumInput = 1000;
    document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
  } else if (adbPlatinumInput === 0) {
    document.getElementById("adbPlatinumInput" + pi).value = '';
  }
  if (adbGoldInput > 0 && adbGoldInput < 1000) {
    adbGoldInput = 1000;
    document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
  } else if (adbGoldInput === 0) {
    document.getElementById("adbGoldInput" + pi).value = '';
  }
  if (adbSilverInput > 0 && adbSilverInput < 1000) {
    adbSilverInput = 1000;
    document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
  } else if (adbSilverInput === 0) {
    document.getElementById("adbSilverInput" + pi).value = '';
  }

  //AGE 18-59 RATES

  if (ageInput >= 18 && ageInput <= 59) {

    //PLATINUM RATE WL
    if (sexInput == "male" && tobInput == "ntu" && wlPlatinumInput > 0 && wlPlatinumInput < 35000) {
      wlPlatinumRate = rMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlPlatinumInput >= 35000 && wlPlatinumInput < 60000) {
      wlPlatinumRate = prMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlPlatinumInput >= 60000 && wlPlatinumInput < 120000) {
      wlPlatinumRate = exMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlPlatinumInput >= 120000) {
      wlPlatinumRate = slMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlPlatinumInput > 0 && wlPlatinumInput < 35000) {
      wlPlatinumRate = rMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlPlatinumInput >= 35000 && wlPlatinumInput < 60000) {
      wlPlatinumRate = prMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlPlatinumInput >= 60000 && wlPlatinumInput < 120000) {
      wlPlatinumRate = exMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlPlatinumInput >= 120000) {
      wlPlatinumRate = slMTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlPlatinumInput > 0 && wlPlatinumInput < 35000) {
      wlPlatinumRate = rFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlPlatinumInput >= 35000 && wlPlatinumInput < 60000) {
      wlPlatinumRate = prFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlPlatinumInput >= 60000 && wlPlatinumInput < 120000) {
      wlPlatinumRate = exFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlPlatinumInput >= 120000) {
      wlPlatinumRate = slFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlPlatinumInput > 0 && wlPlatinumInput < 35000) {
      wlPlatinumRate = rFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlPlatinumInput >= 35000 && wlPlatinumInput < 60000) {
      wlPlatinumRate = prFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlPlatinumInput >= 60000 && wlPlatinumInput < 120000) {
      wlPlatinumRate = exFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlPlatinumInput >= 120000) {
      wlPlatinumRate = slFTU[ageInputEV];
    }
    //PLATINUM PREMIUM WL
    if (wlPlatinumInput > 0 && wlPlatinumInput < 120000) {
      wlPlatinumPremium = (wlPlatinumInput / 1000) * (wlPlatinumRate / 12);
    } else if (wlPlatinumInput >= 120000) {
      wlPlatinumPremium = (((wlPlatinumInput / 1000) * wlPlatinumRate + 25) / 12);
    } else {
      wlPlatinumPremium = 0;
    }

    //GOLD RATE WL
    if (sexInput == "male" && tobInput == "ntu" && wlGoldInput > 0 && wlGoldInput < 35000) {
      wlGoldRate = rMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlGoldInput >= 35000 && wlGoldInput < 60000) {
      wlGoldRate = prMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlGoldInput >= 60000 && wlGoldInput < 120000) {
      wlGoldRate = exMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlGoldInput >= 120000) {
      wlGoldRate = slMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlGoldInput > 0 && wlGoldInput < 35000) {
      wlGoldRate = rMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlGoldInput >= 35000 && wlGoldInput < 60000) {
      wlGoldRate = prMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlGoldInput >= 60000 && wlGoldInput < 120000) {
      wlGoldRate = exMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlGoldInput >= 120000) {
      wlGoldRate = slMTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlGoldInput > 0 && wlGoldInput < 35000) {
      wlGoldRate = rFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlGoldInput >= 35000 && wlGoldInput < 60000) {
      wlGoldRate = prFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlGoldInput >= 60000 && wlGoldInput < 120000) {
      wlGoldRate = exFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlGoldInput >= 120000) {
      wlGoldRate = slFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlGoldInput > 0 && wlGoldInput < 35000) {
      wlGoldRate = rFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlGoldInput >= 35000 && wlGoldInput < 60000) {
      wlGoldRate = prFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlGoldInput >= 60000 && wlGoldInput < 120000) {
      wlGoldRate = exFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlGoldInput >= 120000) {
      wlGoldRate = slFTU[ageInputEV];
    }
    //GOLD PREMIUM WL
    if (wlGoldInput > 0 && wlGoldInput < 120000) {
      wlGoldPremium = (wlGoldInput / 1000) * (wlGoldRate / 12);
    } else if (wlGoldInput >= 120000) {
      wlGoldPremium = (((wlGoldInput / 1000) * wlGoldRate + 25) / 12);
    } else {
      wlGoldPremium = 0;
    }

    //SILVER RATE WL
    if (sexInput == "male" && tobInput == "ntu" && wlSilverInput > 0 && wlSilverInput < 35000) {
      wlSilverRate = rMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlSilverInput >= 35000 && wlSilverInput < 60000) {
      wlSilverRate = prMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlSilverInput >= 60000 && wlSilverInput < 120000) {
      wlSilverRate = exMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "ntu" && wlSilverInput >= 120000) {
      wlSilverRate = slMNTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlSilverInput > 0 && wlSilverInput < 35000) {
      wlSilverRate = rMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlSilverInput >= 35000 && wlSilverInput < 60000) {
      wlSilverRate = prMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlSilverInput >= 60000 && wlSilverInput < 120000) {
      wlSilverRate = exMTU[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu" && wlSilverInput >= 120000) {
      wlSilverRate = slMTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlSilverInput > 0 && wlSilverInput < 35000) {
      wlSilverRate = rFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlSilverInput >= 35000 && wlSilverInput < 60000) {
      wlSilverRate = prFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlSilverInput >= 60000 && wlSilverInput < 120000) {
      wlSilverRate = exFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu" && wlSilverInput >= 120000) {
      wlSilverRate = slFNTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlSilverInput > 0 && wlSilverInput < 35000) {
      wlSilverRate = rFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlSilverInput >= 35000 && wlSilverInput < 60000) {
      wlSilverRate = prFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlSilverInput >= 60000 && wlSilverInput < 120000) {
      wlSilverRate = exFTU[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu" && wlSilverInput >= 120000) {
      wlSilverRate = slFTU[ageInputEV];
    }
    //SILVER PREMIUM WL
    if (wlSilverInput > 0 && wlSilverInput < 120000) {
      wlSilverPremium = (wlSilverInput / 1000) * (wlSilverRate / 12);
    } else if (wlSilverInput >= 120000) {
      wlSilverPremium = (((wlSilverInput / 1000) * wlSilverRate + 25) / 12);
    } else {
      wlSilverPremium = 0;
    }


    //PLATINUM RATE TERM
    if (sexInput == "male" && tobInput == "ntu") {
      tenrcPlatinumRate = tenrcmntu[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu") {
      tenrcPlatinumRate = tenrcmtu[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu") {
      tenrcPlatinumRate = tenrcfntu[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu") {
      tenrcPlatinumRate = tenrcftu[ageInputEV];
    }

    //PLATINUM RESULT TERM
    if (tenrcPlatinumInput !== 0) {
      if (wlPlatinumInput === 0) {
        tenrcPlatinumPremium = (((tenrcPlatinumInput / 1000) * tenrcPlatinumRate + 25) / 12);
      } else {
        tenrcPlatinumPremium = (((tenrcPlatinumInput / 1000) * tenrcPlatinumRate) / 12);
      }
    } else {
      tenrcPlatinumPremium = 0;
    }

    //GOLD RATE TERM
    if (sexInput == "male" && tobInput == "ntu") {
      tenrcGoldRate = tenrcmntu[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu") {
      tenrcGoldRate = tenrcmtu[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu") {
      tenrcGoldRate = tenrcfntu[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu") {
      tenrcGoldRate = tenrcftu[ageInputEV];
    }
    //GOLD RESULT TERM
    if (tenrcGoldInput !== 0) {
      if (wlGoldInput === 0) {
        tenrcGoldPremium = (((tenrcGoldInput / 1000) * tenrcGoldRate + 25) / 12);
      } else {
        tenrcGoldPremium = (((tenrcGoldInput / 1000) * tenrcGoldRate) / 12);
      }
    } else {
      tenrcGoldPremium = 0;
    }

    //SILVER RATE TERM
    if (sexInput == "male" && tobInput == "ntu") {
      tenrcSilverRate = tenrcmntu[ageInputEV];
    } else if (sexInput == "male" && tobInput == "tu") {
      tenrcSilverRate = tenrcmtu[ageInputEV];
    } else if (sexInput == "female" && tobInput == "ntu") {
      tenrcSilverRate = tenrcfntu[ageInputEV];
    } else if (sexInput == "female" && tobInput == "tu") {
      tenrcSilverRate = tenrcftu[ageInputEV];
    }
    //SILVER RESULT TERM
    if (tenrcSilverInput !== 0) {
      if (wlSilverInput === 0) {
        tenrcSilverPremium = (((tenrcSilverInput / 1000) * tenrcSilverRate + 25) / 12);
      } else {
        tenrcSilverPremium = (((tenrcSilverInput / 1000) * tenrcSilverRate) / 12);
      }
    } else {
      tenrcSilverPremium = 0;
    }

    //ADB RESTRICTIONS
    if (wlPlatinumInput == 0 && tenrcPlatinumInput == 0) {
      adbPlatinumInput = '';
      document.getElementById("adbPlatinumInput" + pi).value = '';
    } else if (adbPlatinumInput > 0 && adbPlatinumInput < 1000) {
      adbPlatinumInput = 1000;
      document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
    }

    if (wlPlatinumInput == 0 && tenrcPlatinumInput >= 1000) {
      if (tenrcPlatinumInput >= 1000 && tenrcPlatinumInput <= 200000 && adbPlatinumInput > 200000) {
        adbPlatinumInput = 200000;
        document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
      } else if (tenrcPlatinumInput > 200000 && tenrcPlatinumInput <= 300000 && adbPlatinumInput > tenrcPlatinumInput) {
        adbPlatinumInput = tenrcPlatinumInput;
        document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
      } else if (tenrcPlatinumInput > 300000 && adbPlatinumInput > 300000) {
        adbPlatinumInput = 300000;
        document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
      }
    }

    if (wlPlatinumInput >= 1000 && wlPlatinumInput <= 200000 && adbPlatinumInput > 200000) {
      adbPlatinumInput = 200000;
      document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
    } else if (wlPlatinumInput > 200000 && wlPlatinumInput <= 300000 && adbPlatinumInput > wlPlatinumInput) {
      adbPlatinumInput = wlPlatinumInput;
      document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
    } else if (wlPlatinumInput > 300000 && adbPlatinumInput > 300000) {
      adbPlatinumInput = 300000;
      document.getElementById("adbPlatinumInput" + pi).value = formatFaceAmount(adbPlatinumInput, 'en-US', 'USD');
    }


    if (wlGoldInput == 0 && tenrcGoldInput == 0) {
      adbGoldInput = '';
      document.getElementById("adbGoldInput" + pi).value = '';
    } else if (adbGoldInput > 0 && adbGoldInput < 1000) {
      adbGoldInput = 1000;
      document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
    }

    if (wlGoldInput == 0 && tenrcGoldInput >= 1000) {
      if (tenrcGoldInput >= 1000 && tenrcGoldInput <= 200000 && adbGoldInput > 200000) {
        adbGoldInput = 200000;
        document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
      } else if (tenrcGoldInput > 200000 && tenrcGoldInput <= 300000 && adbGoldInput > tenrcGoldInput) {
        adbGoldInput = tenrcGoldInput;
        document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
      } else if (tenrcGoldInput > 300000 && adbGoldInput > 300000) {
        adbGoldInput = 300000;
        document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
      }
    }

    if (wlGoldInput >= 1000 && wlGoldInput <= 200000 && adbGoldInput > 200000) {
      adbGoldInput = 200000;
      document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
    } else if (wlGoldInput > 200000 && wlGoldInput <= 300000 && adbGoldInput > wlGoldInput) {
      adbGoldInput = wlGoldInput;
      document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
    } else if (wlGoldInput > 300000 && adbGoldInput > 300000) {
      adbGoldInput = 300000;
      document.getElementById("adbGoldInput" + pi).value = formatFaceAmount(adbGoldInput, 'en-US', 'USD');
    }

    if (wlSilverInput == 0 && tenrcSilverInput == 0) {
      adbSilverInput = '';
      document.getElementById("adbSilverInput" + pi).value = '';
    } else if (adbSilverInput > 0 && adbSilverInput < 1000) {
      adbSilverInput = 1000;
      document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
    }

    if (wlSilverInput == 0 && tenrcSilverInput >= 1000) {
      if (tenrcSilverInput >= 1000 && tenrcSilverInput <= 200000 && adbSilverInput > 200000) {
        adbSilverInput = 200000;
        document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
      } else if (tenrcSilverInput > 200000 && tenrcSilverInput <= 300000 && adbSilverInput > tenrcSilverInput) {
        adbSilverInput = tenrcSilverInput;
        document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
      } else if (tenrcSilverInput > 300000 && adbSilverInput > 300000) {
        adbSilverInput = 300000;
        document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
      }
    }

    if (wlSilverInput >= 1000 && wlSilverInput <= 200000 && adbSilverInput > 200000) {
      adbSilverInput = 200000;
      document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
    } else if (wlSilverInput > 200000 && wlSilverInput <= 300000 && adbSilverInput > wlSilverInput) {
      adbSilverInput = wlSilverInput;
      document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
    } else if (wlSilverInput > 300000 && adbSilverInput > 300000) {
      adbSilverInput = 300000;
      document.getElementById("adbSilverInput" + pi).value = formatFaceAmount(adbSilverInput, 'en-US', 'USD');
    }

    //PLATINUM RESULT ADB
    if (adbPlatinumInput > 0 && ageInput < 50) {
      adbPlatinumPremium = (adbPlatinumInput / 12000) * adbRate;
    } else if (adbPlatinumInput > 0 && ageInput >= 50) {
      adbRate = 1.25;
      adbPlatinumPremium = (adbPlatinumInput / 12000) * adbRate;
    } else {
      adbPlatinumPremium = 0;
    }

    //GOLD RESULT ADB
    if (adbGoldInput > 0 && ageInput < 50) {
      adbGoldPremium = (adbGoldInput / 12000) * adbRate;
    } else if (adbGoldInput > 0 && ageInput >= 50) {
      adbRate = 1.25;
      adbGoldPremium = (adbGoldInput / 12000) * adbRate;
    } else {
      adbGoldPremium = 0;
    }

    //SILVER RESULT ADB
    if (adbSilverInput > 0 && ageInput < 50) {
      adbSilverPremium = (adbSilverInput / 12000) * adbRate;
    } else if (adbSilverInput > 0 && ageInput >= 50) {
      adbRate = 1.25;
      adbSilverPremium = (adbSilverInput / 12000) * adbRate;
    } else {
      adbSilverPremium = 0;
    }

  }
  //END OF AGE 18-59

  //RATES AGE 60-80
  if (ageInput >= 60) {
    if (wlPlatinumInput >= 35000) {
      wlPlatinumInput = 34999;
      document.getElementById("wlPlatinumInput" + pi).value = formatFaceAmount(34999);
    }
    if (wlGoldInput >= 35000) {
      wlGoldInput = 34999;
      document.getElementById("wlGoldInput" + pi).value = formatFaceAmount(34999);
    }
    if (wlSilverInput >= 35000) {
      wlSilverInput = 34999;
      document.getElementById("wlSilverInput" + pi).value = formatFaceAmount(34999);
    }
    document.getElementById("adbPlatinumInput" + pi).value = '';
    document.getElementById("tenrcPlatinumInput" + pi).value = '';
    document.getElementById("platinumDeathFromAccident" + pi).textContent = "";
    document.getElementById("platinumDeathFromSickness" + pi).textContent = "";
    document.getElementById("adbGoldInput" + pi).value = '';
    document.getElementById("tenrcGoldInput" + pi).value = '';
    document.getElementById("goldDeathFromAccident" + pi).textContent = "";
    document.getElementById("goldDeathFromSickness" + pi).textContent = "";
    document.getElementById("adbSilverInput" + pi).value = '';
    document.getElementById("tenrcSilverInput" + pi).value = '';
    document.getElementById("silverDeathFromAccident" + pi).textContent = "";
    document.getElementById("silverDeathFromSickness" + pi).textContent = "";

    //SENIOR LEVEL WL
    if (["MA", "MN", "NH", "NJ", "NC", "PA", "WA", "WV"].includes(seniorLevel)) {

      //PLATINUM RATE SENIOR LEVEL WL
      if (sexInput == "male" && tobInput == "ntu") {
        wlPlatinumRate = srwlmntu[ageInputEVSenior];
      } else if (sexInput == "male" && tobInput == "tu") {
        wlPlatinumRate = srwlmtu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "ntu") {
        wlPlatinumRate = srwlfntu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "tu") {
        wlPlatinumRate = srwlftu[ageInputEVSenior];
      }

      //PLATINUM RESULT SENIOR LEVEL WL
      if (wlPlatinumInput !== 0) {
        wlPlatinumPremium = (((wlPlatinumInput / 1000) * wlPlatinumRate) / 12);
      } else {
        wlPlatinumPremium = 0;
      }

      //GOLD RATE SENIOR LEVEL WL
      if (sexInput == "male" && tobInput == "ntu") {
        wlGoldRate = srwlmntu[ageInputEVSenior];
      } else if (sexInput == "male" && tobInput == "tu") {
        wlGoldRate = srwlmtu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "ntu") {
        wlGoldRate = srwlfntu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "tu") {
        wlGoldRate = srwlftu[ageInputEVSenior];
      }

      //GOLD RESULT SENIOR LEVEL WL
      if (wlGoldInput !== 0) {
        wlGoldPremium = (((wlGoldInput / 1000) * wlGoldRate) / 12);
      } else {
        wlGoldPremium = 0;
      }

      //SILVER RATE SENIOR LEVEL WL
      if (sexInput == "male" && tobInput == "ntu") {
        wlSilverRate = srwlmntu[ageInputEVSenior];
      } else if (sexInput == "male" && tobInput == "tu") {
        wlSilverRate = srwlmtu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "ntu") {
        wlSilverRate = srwlfntu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "tu") {
        wlSilverRate = srwlftu[ageInputEVSenior];
      }

      //SILVER RESULT SENIOR LEVEL WL
      if (wlSilverInput !== 0) {
        wlSilverPremium = (((wlSilverInput / 1000) * wlSilverRate) / 12);
      } else {
        wlSilverPremium = 0;
      }
    }
    //SENIOR GRADED WL
    else {
      //PLATINUM RATE SENIOR GRADED WL
      if (sexInput == "male" && tobInput == "ntu") {
        wlPlatinumRate = srgrmntu[ageInputEVSenior];
      } else if (sexInput == "male" && tobInput == "tu") {
        wlPlatinumRate = srgrmtu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "ntu") {
        wlPlatinumRate = srgrfntu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "tu") {
        wlPlatinumRate = srgrftu[ageInputEVSenior];
      }

      //PLATINUM RESULT SENIOR GRADED WL
      if (wlPlatinumInput !== 0) {
        wlPlatinumPremium = (((wlPlatinumInput / 1000) * wlPlatinumRate) / 12);
      } else {
        wlPlatinumPremium = 0;
      }

      //GOLD RATE SENIOR GRADED WL
      if (sexInput == "male" && tobInput == "ntu") {
        wlGoldRate = srgrmntu[ageInputEVSenior];
      } else if (sexInput == "male" && tobInput == "tu") {
        wlGoldRate = srgrmtu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "ntu") {
        wlGoldRate = srgrfntu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "tu") {
        wlGoldRate = srgrftu[ageInputEVSenior];
      }

      //GOLD RESULT SENIOR GRADED WL
      if (wlGoldInput !== 0) {
        wlGoldPremium = (((wlGoldInput / 1000) * wlGoldRate) / 12);
      } else {
        wlGoldPremium = 0;
      }

      //SILVER RATE SENIOR GRADED WL
      if (sexInput == "male" && tobInput == "ntu") {
        wlSilverRate = srgrmntu[ageInputEVSenior];
      } else if (sexInput == "male" && tobInput == "tu") {
        wlSilverRate = srgrmtu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "ntu") {
        wlSilverRate = srgrfntu[ageInputEVSenior];
      } else if (sexInput == "female" && tobInput == "tu") {
        wlSilverRate = srgrftu[ageInputEVSenior];
      }

      //SILVER RESULT SENIOR GRADED WL
      if (wlSilverInput !== 0) {
        wlSilverPremium = (((wlSilverInput / 1000) * wlSilverRate) / 12);
      } else {
        wlSilverPremium = 0;
      }
    }
  }

  if (ageInput >= 18 && ageInput <= 59) {
    //PREMIUM RESULTS
    if (wlPlatinumInput !== 0 || tenrcPlatinumInput !== 0) {
      document.getElementById("platinumResult" + pi).textContent = formatFaceAmount(Math.floor(wlPlatinumPremium + adbPlatinumPremium + tenrcPlatinumPremium)) + "/mo";
      document.getElementById("platinumDeathFromAccident" + pi).textContent = formatFaceAmount(wlPlatinumInput + tenrcPlatinumInput + adbPlatinumInput);
      document.getElementById("platinumDeathFromSickness" + pi).textContent = formatFaceAmount(wlPlatinumInput + tenrcPlatinumInput);
    }
    if (wlPlatinumInput == 0 && tenrcPlatinumInput == 0) {
      document.getElementById("platinumResult" + pi).textContent = '';
      document.getElementById("adbPlatinumInput" + pi).value = '';
      document.getElementById("platinumDeathFromAccident" + pi).textContent = "";
      document.getElementById("platinumDeathFromSickness" + pi).textContent = "";
    }

    if (wlGoldInput !== 0 || tenrcGoldInput !== 0) {
      document.getElementById("goldResult" + pi).textContent = formatFaceAmount(Math.floor(wlGoldPremium + adbGoldPremium + tenrcGoldPremium)) + "/mo";
      document.getElementById("goldDeathFromAccident" + pi).textContent = formatFaceAmount(wlGoldInput + tenrcGoldInput + adbGoldInput);
      document.getElementById("goldDeathFromSickness" + pi).textContent = formatFaceAmount(wlGoldInput + tenrcGoldInput);

    }

    if (wlGoldInput == 0 && tenrcGoldInput == 0) {
      document.getElementById("goldResult" + pi).textContent = '';
      document.getElementById("adbGoldInput" + pi).value = '';
      document.getElementById("goldDeathFromAccident" + pi).textContent = "";
      document.getElementById("goldDeathFromSickness" + pi).textContent = "";
    }

    if (wlSilverInput !== 0 || tenrcSilverInput !== 0) {
      document.getElementById("silverResult" + pi).textContent = formatFaceAmount(Math.floor(wlSilverPremium + adbSilverPremium + tenrcSilverPremium)) + "/mo";
      document.getElementById("silverDeathFromAccident" + pi).textContent = formatFaceAmount(wlSilverInput + tenrcSilverInput + adbSilverInput);
      document.getElementById("silverDeathFromSickness" + pi).textContent = formatFaceAmount(wlSilverInput + tenrcSilverInput);

    }

    if (wlSilverInput == 0 && tenrcSilverInput == 0) {
      document.getElementById("silverResult" + pi).textContent = '';
      document.getElementById("adbSilverInput" + pi).value = '';
      document.getElementById("silverDeathFromAccident" + pi).textContent = "";
      document.getElementById("silverDeathFromSickness" + pi).textContent = "";
    }
  }
	
//PREMIUM RESULTS SENIOR
  if (ageInput >= 76 && tobInput === "tu") {
    document.getElementById("wlPlatinumInput" + pi).value = '';
    document.getElementById("wlGoldInput" + pi).value = '';
    document.getElementById("wlSilverInput" + pi).value = '';
    document.getElementById("platinumResult" + pi).textContent = "TU ends @75";
    document.getElementById("goldResult" + pi).textContent = "TU ends @75";
    document.getElementById("silverResult" + pi).textContent = "TU ends @75";
  } else if (ageInput >= 60) {
	  if (wlPlatinumInput !== 0) {
    document.getElementById("platinumResult" + pi).textContent = formatFaceAmount(Math.floor(wlPlatinumPremium)) + "/mo";
  } if (wlGoldInput !== 0) {
    document.getElementById("goldResult" + pi).textContent = formatFaceAmount(Math.floor(wlGoldPremium)) + "/mo";
  } if (wlSilverInput !== 0) {
    document.getElementById("silverResult" + pi).textContent = formatFaceAmount(Math.floor(wlSilverPremium)) + "/mo";
  }
}
}