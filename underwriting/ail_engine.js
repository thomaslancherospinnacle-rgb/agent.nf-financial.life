// AIL Underwriting Engine - Simplified Functional Version

const BUILD_CHART = {
  68: { std: [129, 207], T2: 254, T3: 264, T4: 273, T5: 280, T6: 287, T8: 300, T10: 306, T12: 313 },
  69: { std: [133, 213], T2: 261, T3: 271, T4: 282, T5: 288, T6: 295, T8: 309, T10: 315, T12: 322 },
  70: { std: [136, 219], T2: 269, T3: 279, T4: 290, T5: 297, T6: 304, T8: 318, T10: 325, T12: 332 },
  71: { std: [140, 225], T2: 277, T3: 287, T4: 298, T5: 305, T6: 312, T8: 327, T10: 334, T12: 341 },
  72: { std: [144, 232], T2: 284, T3: 295, T4: 306, T5: 314, T6: 321, T8: 336, T10: 343, T12: 351 },
  73: { std: [148, 238], T2: 292, T3: 304, T4: 315, T5: 323, T6: 330, T8: 345, T10: 353, T12: 361 },
  74: { std: [152, 245], T2: 300, T3: 312, T4: 324, T5: 332, T6: 339, T8: 355, T10: 363, T12: 370 }
};

const AUTO_TRIAL_MEDS = [
  'Ability', 'Abilify', 'Lithium', 'Coumadin', 'Warfarin', 'Plavix', 'Xarelto',
  'Seroquel', 'OxyContin', 'Percocet', 'Fentanyl', 'Methadone', 'Suboxone'
];

function evaluateApplication(data) {
  let decision = 'STANDARD';
  let reasons = [];
  let warnings = [];
  let tableRating = null;
  let exclusionRiders = [];
  let postponeMonths = 0;
  
  // Product determination
  const product = data.age >= 60 ? 'Senior Combo (60-80)' : 'Super Combo (0-59)';
  
  // Age check
  if (data.age > 80) {
    return buildResult('DECLINE', ['Age exceeds maximum (80 years old)'], product);
  }
  
  // Current status
  if (data.currentlyHospitalized) {
    return buildResult('DECLINE', ['Currently hospitalized'], product);
  }
  if (data.currentlyJailed) {
    return buildResult('DECLINE', ['Currently in jail'], product);
  }
  if (!data.legallyResiding) {
    return buildResult('DECLINE', ['Not legally residing in the US'], product);
  }
  
  // Major auto-declines
  if (data.hasHIV) {
    return buildResult('DECLINE', ['HIV/AIDS - positive HIV test'], product);
  }
  if (data.onKidneyDialysis) {
    return buildResult('DECLINE', ['Currently on kidney dialysis'], product);
  }
  if (data.hasAlzheimers) {
    return buildResult('DECLINE', ['Alzheimer\'s disease'], product);
  }
  if (data.hasCysticFibrosis) {
    return buildResult('DECLINE', ['Cystic fibrosis'], product);
  }
  if (data.hasDefibrillator) {
    return buildResult('DECLINE', ['Defibrillator implant'], product);
  }
  
  // Build/Weight check
  const buildResult = checkBuild(data.heightInches, data.weight);
  if (buildResult.decision === 'DECLINE') {
    return buildResult('DECLINE', [buildResult.reason], product);
  }
  if (buildResult.rating) {
    tableRating = buildResult.rating;
    reasons.push(`Overweight: ${buildResult.reason}`);
  }
  
  // Cancer
  if (data.hasCancer) {
    const yearsSince = data.cancerYearsSinceTreatment || 0;
    if (data.cancerType === 'lung' && (yearsSince < 5 || data.currentSmoker)) {
      return buildResult('DECLINE', ['Lung cancer < 5 years or currently smokes'], product);
    }
    if (data.cancerType === 'pancreatic' && yearsSince < 5) {
      return buildResult('DECLINE', ['Pancreatic cancer < 5 years'], product);
    }
    if (data.cancerMetastatic && yearsSince < 10) {
      return buildResult('DECLINE', ['Metastatic cancer < 10 years'], product);
    }
    if (yearsSince < 2 && data.cancerType !== 'skin') {
      return buildResult('DECLINE', ['Internal cancer < 2 years'], product);
    }
    if (yearsSince >= 2 && yearsSince < 5) {
      decision = 'AUTO_TRIAL';
      reasons.push('Cancer within 5 years - requires trial (10-20% insurance advised)');
    }
  }
  
  // Diabetes
  if (data.hasDiabetes) {
    if (data.usesInsulin) {
      if (data.hasStroke || data.hasTIA || data.hasHeartAttack || data.hasPAD) {
        return buildResult('DECLINE', ['Insulin diabetes with cardiovascular complications'], product);
      }
      if (data.diabetesLastVisit >= 2) {
        return buildResult('DECLINE', ['Insulin diabetes - not seen doctor in 2+ years'], product);
      }
      if (tableRating && parseInt(tableRating.replace('T','')) >= 6) {
        return buildResult('DECLINE', ['Insulin diabetes with overweight T6+'], product);
      }
    }
    
    if (data.diabetesKidneyDisease) {
      return buildResult('DECLINE', ['Diabetes with kidney disease'], product);
    }
    
    if (data.diabetesMeds >= 1000) {
      decision = 'AUTO_TRIAL';
      reasons.push('Diabetes - taking 1000mg+ medication');
    }
    
    if (tableRating && parseInt(tableRating.replace('T','')) >= 3) {
      decision = 'AUTO_TRIAL';
      reasons.push('Diabetes + Overweight T3+ = AUTO TRIAL');
    }
  }
  
  // Heart conditions
  if (data.hasHeartAttack) {
    if (data.monthsSinceHeart < 6) {
      return buildResult('DECLINE', ['Heart attack within 6 months'], product);
    }
    if (data.ageAtHeart < 40) {
      return buildResult('DECLINE', ['Heart attack before age 40'], product);
    }
    decision = 'AUTO_TRIAL';
    reasons.push('Heart attack - all cases must be trialed (10-20% insurance advised, no ADB)');
  }
  
  if (data.hasCoronaryBypass || data.hasAngioplasty || data.hasAngina) {
    if (data.monthsSinceHeart < 6) {
      return buildResult('DECLINE', ['Heart surgery/angina within 6 months'], product);
    }
  }
  
  if (data.hasStroke || data.hasTIA) {
    if (data.monthsSinceHeart < 6) {
      return buildResult('DECLINE', ['Stroke within 6 months'], product);
    }
    if (data.numberOfHeartEvents > 1) {
      return buildResult('DECLINE', ['Multiple strokes'], product);
    }
    if (data.monthsSinceHeart < 36) {
      decision = 'AUTO_TRIAL';
      reasons.push('Stroke within 3 years (10-20% insurance advised)');
    }
  }
  
  // Check cardiovascular combinations
  const hasCAD = data.hasHeartAttack || data.hasAngina || data.hasCoronaryBypass;
  const hasCVD = data.hasStroke || data.hasTIA;
  const cardiovascularCount = [hasCAD, hasCVD, data.hasPAD].filter(Boolean).length;
  if (cardiovascularCount >= 2) {
    return buildResult('DECLINE', ['Multiple cardiovascular diseases (CAD + CVD + PAD combination)'], product);
  }
  
  if (data.hasHBP) {
    if (data.hbpHospitalized) {
      return buildResult('DECLINE', ['High blood pressure with hospitalization within 2 years'], product);
    }
    if (data.hbpMeds >= 3) {
      decision = 'AUTO_TRIAL';
      reasons.push('High blood pressure - taking 3+ medications');
    }
    if (data.hasDiabetes) {
      decision = 'AUTO_TRIAL';
      reasons.push('High blood pressure + Diabetes combination');
    }
  }
  
  if (data.hasCHF && data.monthsSinceHeart < 12) {
    return buildResult('DECLINE', ['Congestive heart failure within 1 year'], product);
  }
  
  // Respiratory
  if (data.hasAsthma) {
    if (data.asthmaICU) {
      return buildResult('DECLINE', ['Asthma - ICU within 5 years'], product);
    }
    if (data.asthmaHospitalizations >= 2) {
      decision = 'AUTO_TRIAL';
      reasons.push('Asthma - 2+ hospitalizations');
    }
  }
  
  if ((data.hasCOPD || data.hasEmphysema) && data.usesOxygen && data.hasCHF) {
    return buildResult('DECLINE', ['COPD/Emphysema on home oxygen with heart failure'], product);
  }
  
  // Mental health
  if (data.hasDepression || data.hasAnxiety) {
    if (data.mentalHospitalized || data.seesTherapist) {
      decision = 'AUTO_TRIAL';
      reasons.push('Depression/Anxiety - hospitalized or currently in treatment');
    }
  }
  
  if (data.hasSeizures && data.seizureDiagnosis < 6) {
    return buildResult('DECLINE', ['Seizures - newly diagnosed within 6 months'], product);
  }
  
  // Substance use
  if (data.alcoholTreatment) {
    if (data.stillDrinks || data.yearsDry < 1) {
      return buildResult('DECLINE', ['Alcohol treatment and still drinks or dry < 1 year'], product);
    }
  }
  
  if (data.hardDrugUse && data.yearsSinceDrugs < 2) {
    return buildResult('DECLINE', ['Drug use within 2 years'], product);
  }
  
  if (data.usesMarijuana) {
    decision = 'AUTO_TRIAL';
    reasons.push('Current marijuana use');
  }
  
  if (data.numberOfDWIs >= 2) {
    if (data.numberOfDWIs === 2 && data.yearsSinceDWI < 2) {
      return buildResult('DECLINE', ['2 DWIs and last within 2 years'], product);
    }
    if (data.numberOfDWIs >= 3 && data.stillDrinks) {
      return buildResult('DECLINE', ['3+ DWIs and still drinking'], product);
    }
    decision = 'AUTO_TRIAL';
    reasons.push('Multiple DWIs');
  }
  
  // Arrests
  if (data.felonyArrest || data.drugArrest) {
    if (data.yearsSinceProbation < 5 && data.onProbation) {
      return buildResult('DECLINE', ['Felony/drug arrest with probation within 5 years'], product);
    }
  }
  
  if (data.totalArrests >= 2 && data.yearsSinceArrest < 5) {
    return buildResult('DECLINE', ['2+ arrests and last within 5 years'], product);
  }
  
  // Medications
  if (data.takesOpiates && data.takesBenzos) {
    return buildResult('DECLINE', ['Combination of opiates and benzodiazepines'], product);
  }
  
  if (data.medications) {
    const meds = data.medications.toLowerCase();
    const autoTrialMeds = AUTO_TRIAL_MEDS.filter(m => meds.includes(m.toLowerCase()));
    if (autoTrialMeds.length > 0) {
      decision = 'AUTO_TRIAL';
      reasons.push(`Taking auto-trial medication(s): ${autoTrialMeds.join(', ')}`);
    }
  }
  
  if (data.notTakingMeds) {
    decision = 'AUTO_TRIAL';
    reasons.push('Not taking prescribed medications');
  }
  
  // Recent hospitalization
  if (data.recentHospital && data.monthsSinceHospital < 6 && data.daysHospitalized >= 2) {
    decision = 'AUTO_TRIAL';
    reasons.push('Hospitalization within 6 months for 2+ days');
  }
  
  if (data.currentlyDisabled) {
    decision = 'AUTO_TRIAL';
    reasons.push('Currently disabled');
  }
  
  // Tobacco impact
  if (data.usesTobacco && data.yearsSinceQuitTobacco === 0) {
    warnings.push('Current tobacco user - will affect rates (smoker vs non-smoker classification)');
    if (data.hasCOPD || data.hasEmphysema || data.hasAsthma) {
      warnings.push('Tobacco use with respiratory condition - may result in higher rating');
    }
  }
  
  // Final decision
  if (decision === 'AUTO_TRIAL' && reasons.length === 0) {
    reasons.push('Requires trial submission based on risk factors');
  }
  
  if (decision === 'STANDARD' && reasons.length === 0) {
    reasons.push('No adverse underwriting factors identified');
  }
  
  return {
    decision,
    product,
    age: data.age,
    tableRating,
    reasons,
    warnings,
    exclusionRiders,
    postponeMonths,
    timestamp: new Date().toISOString()
  };
}

function checkBuild(heightInches, weight) {
  const chart = BUILD_CHART[heightInches];
  if (!chart) {
    return { decision: 'NEEDS_REVIEW', reason: 'Height not in chart' };
  }
  
  if (weight >= chart.std[0] && weight <= chart.std[1]) {
    return { decision: null, rating: null };
  }
  
  if (weight > chart.T12) {
    return { decision: 'DECLINE', reason: `Exceeds build chart: ${weight} lbs (max ${chart.T12} lbs)` };
  }
  
  let rating = null;
  let reason = '';
  
  if (weight >= chart.T12) { rating = 'T12'; }
  else if (weight >= chart.T10) { rating = 'T10'; }
  else if (weight >= chart.T8) { rating = 'T8'; }
  else if (weight >= chart.T6) { rating = 'T6'; }
  else if (weight >= chart.T5) { rating = 'T5'; }
  else if (weight >= chart.T4) { rating = 'T4'; }
  else if (weight >= chart.T3) { rating = 'T3'; }
  else if (weight >= chart.T2) { rating = 'T2'; }
  
  if (rating) {
    reason = `${weight} lbs = ${rating}`;
    return { decision: null, rating, reason };
  }
  
  return { decision: 'NEEDS_REVIEW', reason: `Weight in gap zone: ${weight} lbs` };
}

function buildResult(decision, reasons, product) {
  return {
    decision,
    product,
    reasons,
    warnings: [],
    tableRating: null,
    exclusionRiders: [],
    postponeMonths: 0,
    timestamp: new Date().toISOString()
  };
}
