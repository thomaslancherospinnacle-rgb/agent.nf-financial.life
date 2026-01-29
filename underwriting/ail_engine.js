// AIL Underwriting Engine - Complete Implementation
// Based on UW Field Manual AG-2735 (R12-18)

function evaluateApplication(data) {
    const reasons = [];
    const warnings = [];
    let decision = 'STANDARD';
    let product = 'H34000 (Life)';
    let tableRating = null;
    
    // =====================================================
    // IMMEDIATE AUTO-DECLINES (Check these first)
    // =====================================================
    
    // Currently Hospitalized or Jailed
    if (data.currentlyHospitalized) {
        return createDecline('Currently hospitalized - Auto Decline per Flash Sheet');
    }
    
    if (data.currentlyJailed) {
        return createDecline('Currently in jail - Auto Decline per Flash Sheet');
    }
    
    // Legal Residency
    if (!data.legallyResiding) {
        return createDecline('Not legally residing in US - Auto Decline per Flash Sheet page 5');
    }
    
    // CRITICAL: Opiate + Benzodiazepine Combination
    if (data.takesOpiates && data.takesBenzos) {
        return createDecline('Combination of Opiate and Benzodiazepine medications - Auto Decline for ALL products (Flash Sheet page 5)');
    }
    
    // HIV/AIDS
    if (data.hasHIV) {
        return createDecline('HIV/AIDS - Auto Decline (Flash Sheet page 5, Manual page 12)');
    }
    
    // Kidney Dialysis
    if (data.onKidneyDialysis) {
        return createDecline('Currently on kidney dialysis - Auto Decline (Flash Sheet page 5)');
    }
    
    // Alzheimer's Disease
    if (data.hasAlzheimers) {
        return createDecline('Alzheimer\'s Disease - Auto Decline for all products (Flash Sheet page 5)');
    }
    
    // Cystic Fibrosis
    if (data.hasCysticFibrosis) {
        return createDecline('Cystic Fibrosis - Auto Decline (Flash Sheet page 5, Manual page 43)');
    }
    
    // Defibrillator Implant
    if (data.hasDefibrillator) {
        return createDecline('Defibrillator Implant - Auto Decline for all products (Flash Sheet page 5)');
    }
    
    // =====================================================
    // CANCER EVALUATION
    // =====================================================
    
    if (data.hasCancer) {
        const cancerResult = evaluateCancer(data);
        if (cancerResult.decline) {
            return createDecline(cancerResult.reason);
        }
        if (cancerResult.rating) {
            tableRating = combineRatings(tableRating, cancerResult.rating);
            reasons.push(cancerResult.reason);
        }
        if (cancerResult.warning) {
            warnings.push(cancerResult.warning);
        }
    }
    
    // =====================================================
    // DIABETES EVALUATION
    // =====================================================
    
    if (data.hasDiabetes) {
        const diabetesResult = evaluateDiabetes(data);
        if (diabetesResult.decline) {
            return createDecline(diabetesResult.reason);
        }
        if (diabetesResult.rating) {
            tableRating = combineRatings(tableRating, diabetesResult.rating);
            reasons.push(diabetesResult.reason);
        }
        if (diabetesResult.warning) {
            warnings.push(diabetesResult.warning);
        }
    }
    
    // =====================================================
    // HEART/CARDIOVASCULAR EVALUATION
    // =====================================================
    
    const heartResult = evaluateHeartConditions(data);
    if (heartResult.decline) {
        return createDecline(heartResult.reason);
    }
    if (heartResult.rating) {
        tableRating = combineRatings(tableRating, heartResult.rating);
        reasons.push(heartResult.reason);
    }
    if (heartResult.warnings && heartResult.warnings.length > 0) {
        warnings.push(...heartResult.warnings);
    }
    
    // =====================================================
    // RESPIRATORY CONDITIONS
    // =====================================================
    
    const respiratoryResult = evaluateRespiratoryConditions(data);
    if (respiratoryResult.decline) {
        return createDecline(respiratoryResult.reason);
    }
    if (respiratoryResult.rating) {
        tableRating = combineRatings(tableRating, respiratoryResult.rating);
        reasons.push(respiratoryResult.reason);
    }
    
    // =====================================================
    // MENTAL HEALTH EVALUATION
    // =====================================================
    
    const mentalHealthResult = evaluateMentalHealth(data);
    if (mentalHealthResult.decline) {
        return createDecline(mentalHealthResult.reason);
    }
    if (mentalHealthResult.rating) {
        tableRating = combineRatings(tableRating, mentalHealthResult.rating);
        reasons.push(mentalHealthResult.reason);
    }
    
    // =====================================================
    // SEIZURE DISORDERS
    // =====================================================
    
    if (data.hasSeizures) {
        const seizureResult = evaluateSeizures(data);
        if (seizureResult.decline) {
            return createDecline(seizureResult.reason);
        }
        if (seizureResult.rating) {
            tableRating = combineRatings(tableRating, seizureResult.rating);
            reasons.push(seizureResult.reason);
        }
    }
    
    // =====================================================
    // SUBSTANCE ABUSE (Alcohol/Drugs)
    // =====================================================
    
    const substanceResult = evaluateSubstanceAbuse(data);
    if (substanceResult.decline) {
        return createDecline(substanceResult.reason);
    }
    if (substanceResult.rating) {
        tableRating = combineRatings(tableRating, substanceResult.rating);
        reasons.push(substanceResult.reason);
    }
    if (substanceResult.warnings && substanceResult.warnings.length > 0) {
        warnings.push(...substanceResult.warnings);
    }
    
    // =====================================================
    // ARREST HISTORY
    // =====================================================
    
    const arrestResult = evaluateArrestHistory(data);
    if (arrestResult.decline) {
        return createDecline(arrestResult.reason);
    }
    if (arrestResult.rating) {
        tableRating = combineRatings(tableRating, arrestResult.rating);
        reasons.push(arrestResult.reason);
    }
    
    // =====================================================
    // BUILD (Height/Weight) EVALUATION
    // =====================================================
    
    const buildResult = evaluateBuild(data);
    if (buildResult.decline) {
        return createDecline(buildResult.reason);
    }
    if (buildResult.rating) {
        tableRating = combineRatings(tableRating, buildResult.rating);
        reasons.push(buildResult.reason);
    }
    
    // =====================================================
    // TOBACCO EVALUATION
    // =====================================================
    
    const tobaccoResult = evaluateTobacco(data);
    if (tobaccoResult.warning) {
        warnings.push(tobaccoResult.warning);
    }
    if (tobaccoResult.reason) {
        reasons.push(tobaccoResult.reason);
    }
    
    // =====================================================
    // DETERMINE FINAL DECISION
    // =====================================================
    
    if (reasons.length === 0) {
        reasons.push('No adverse health or other factors identified');
        decision = 'STANDARD';
    } else if (tableRating) {
        decision = 'RATED';
    }
    
    // Add general warnings
    if (data.otherConditions && data.otherConditions.trim() !== '') {
        warnings.push('Other conditions listed - requires underwriter review');
        decision = 'NEEDS_REVIEW';
    }
    
    if (data.notTakingMeds) {
        warnings.push('Not taking prescribed medications - requires underwriter review');
        decision = 'NEEDS_REVIEW';
    }
    
    return {
        decision: decision,
        product: product,
        tableRating: tableRating,
        reasons: reasons,
        warnings: warnings
    };
}

// =====================================================
// CANCER EVALUATION
// =====================================================

function evaluateCancer(data) {
    const result = { decline: false, rating: null, reason: '', warning: '' };
    
    // Metastatic Cancer - treated within 10 years = Auto Decline
    if (data.cancerMetastatic) {
        if (data.cancerYearsSinceTreatment < 10) {
            result.decline = true;
            result.reason = 'Metastatic cancer treated within past 10 years - Auto Decline (Flash Sheet page 5)';
            return result;
        }
    }
    
    // Cancer Type Specific Rules
    const cancerType = (data.cancerType || '').toLowerCase();
    
    // Lung Cancer
    if (cancerType.includes('lung')) {
        if (data.cancerYearsSinceTreatment < 5) {
            result.decline = true;
            result.reason = 'Lung cancer - last treatment within 5 years - Auto Decline (Flash Sheet page 5, Manual page 27)';
            return result;
        }
        if (data.currentSmoker) {
            result.decline = true;
            result.reason = 'Lung cancer with current smoking - Auto Decline (Flash Sheet page 5)';
            return result;
        }
    }
    
    // Pancreatic Cancer
    if (cancerType.includes('pancrea')) {
        if (data.cancerYearsSinceTreatment < 5) {
            result.decline = true;
            result.reason = 'Pancreatic cancer - last treatment within 5 years - Auto Decline (Flash Sheet page 5)';
            return result;
        }
    }
    
    // Breast, Colon, Uterine - Internal Cancers
    if (cancerType.includes('breast') || cancerType.includes('colon') || 
        cancerType.includes('uterine') || cancerType.includes('uterus') ||
        cancerType === 'internal' || cancerType === 'other') {
        if (data.cancerYearsSinceTreatment < 2) {
            result.decline = true;
            result.reason = 'Internal cancer treated within past 2 years - Auto Decline (Flash Sheet page 5)';
            return result;
        }
    }
    
    // If not declined, most cancers require waiting period and rating
    if (data.cancerYearsSinceTreatment < 2) {
        result.decline = true;
        result.reason = 'Cancer - insufficient time since treatment (minimum 2 years required)';
        return result;
    }
    
    result.warning = 'Cancer history - requires APS and pathology report. H34000 uninsurable for most cancers (see Manual pages 23-31)';
    result.reason = 'History of cancer - treated ' + data.cancerYearsSinceTreatment + ' years ago';
    
    return result;
}

// =====================================================
// DIABETES EVALUATION
// =====================================================

function evaluateDiabetes(data) {
    const result = { decline: false, rating: null, reason: '', warning: '' };
    
    // Diabetes + Kidney Disease = Auto Decline
    if (data.diabetesKidneyDisease) {
        result.decline = true;
        result.reason = 'Diabetes and Kidney Disease - Auto Decline for all products (Flash Sheet page 5)';
        return result;
    }
    
    // Insulin Diabetes with complications
    if (data.usesInsulin) {
        // Check for multiple complications
        const hasStroke = data.hasStroke || data.hasTIA;
        const hasHeartDisease = data.hasHeartAttack || data.hasCoronaryBypass || data.hasAngioplasty || data.hasAngina;
        const hasPAD = data.hasPAD;
        const notSeenDoctor = data.diabetesLastVisit > 24; // Not seen in 2 years
        const severelyOverweight = calculateBuildRating(data.heightInches, data.weight) >= 6;
        
        if (hasStroke || hasHeartDisease || hasPAD || notSeenDoctor || severelyOverweight) {
            result.decline = true;
            result.reason = 'Insulin Diabetes with cerebrovascular disease, heart disease, PAD, not seen doctor within 2 years, or overweight T6+ - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        
        // IDDM alone - special rules
        result.warning = 'Insulin-Dependent Diabetes - Decline for Accident/Health/Disability, can consider Life application (Flash Sheet page 5)';
        result.reason = 'Insulin-Dependent Diabetes';
        return result;
    }
    
    // NIDDM (Non-Insulin Dependent Diabetes)
    if (data.diabetesAge >= 40) {
        // Diagnosed at age 40 or older
        if (data.diabetesControlled) {
            result.reason = 'Non-insulin diabetes diagnosed at age 40+, well controlled - may qualify standard';
            return result;
        } else {
            result.rating = 'T-2 to T-8';
            result.reason = 'Non-insulin diabetes diagnosed at age 40+, needs better control';
            return result;
        }
    } else {
        // Diagnosed under age 40
        result.rating = 'T-2 to T-8';
        result.reason = 'Diabetes diagnosed under age 40 - requires rating (Manual page 47)';
        return result;
    }
}

// =====================================================
// HEART/CARDIOVASCULAR EVALUATION
// =====================================================

function evaluateHeartConditions(data) {
    const result = { decline: false, rating: null, reason: '', warnings: [] };
    
    const hasHeartAttack = data.hasHeartAttack;
    const hasCoronaryBypass = data.hasCoronaryBypass;
    const hasAngioplasty = data.hasAngioplasty;
    const hasAngina = data.hasAngina;
    const hasStroke = data.hasStroke;
    const hasTIA = data.hasTIA;
    const hasPAD = data.hasPAD;
    const hasCHF = data.hasCHF;
    const hasValveReplacement = data.hasValveReplacement;
    
    // Check for combination of CAD + CVD + PAD
    const hasCAD = hasHeartAttack || hasCoronaryBypass || hasAngioplasty || hasAngina;
    const hasCVD = hasStroke || hasTIA;
    
    if (hasCAD && hasCVD && hasPAD) {
        result.decline = true;
        result.reason = 'Combination of Coronary Artery Disease, Cerebrovascular Disease (TIA/Stroke), and Peripheral Artery Disease - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Angioplasty, Bypass, Heart Attack, or Angina within 6 months OR under age 40
    if (hasHeartAttack || hasCoronaryBypass || hasAngioplasty || hasAngina) {
        if (data.monthsSinceHeart < 6) {
            result.decline = true;
            result.reason = 'Angioplasty/Coronary Bypass/Heart Attack/Angina within last 6 months - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        if (data.ageAtHeart < 40) {
            result.decline = true;
            result.reason = 'Angioplasty/Coronary Bypass/Heart Attack/Angina occurring under age 40 - Auto Decline (Flash Sheet page 5, Manual pages 39-41)';
            return result;
        }
    }
    
    // Congestive Heart Failure within 1 year
    if (hasCHF) {
        // Assuming recent CHF if other heart conditions are recent
        result.decline = true;
        result.reason = 'Congestive Heart Failure - Auto Decline if within 1 year (Flash Sheet page 5)';
        return result;
    }
    
    // CAD + Heart Valve Replacement
    if (hasCAD && hasValveReplacement) {
        result.decline = true;
        result.reason = 'Coronary Artery Disease and Heart Valve Replacement - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Multiple Heart Surgeries (Coronary Bypass)
    if (hasCoronaryBypass && data.numberOfHeartEvents > 1) {
        result.decline = true;
        result.reason = 'Multiple heart surgeries (Coronary Bypass) - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Multiple Heart Attacks
    if (hasHeartAttack) {
        if (data.numberOfHeartEvents >= 2 && data.currentSmoker) {
            result.decline = true;
            result.reason = '2 or more heart attacks with current smoking - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        if (data.numberOfHeartEvents > 2) {
            result.decline = true;
            result.reason = 'More than 2 heart attacks - Auto Decline (Flash Sheet page 5)';
            return result;
        }
    }
    
    // High Blood Pressure with Hospitalization within 1 year
    if (data.hasHBP && data.hbpHospitalized) {
        result.decline = true;
        result.reason = 'High Blood Pressure with hospitalization for HBP within 1 year - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Peripheral Vascular Disease with Surgery
    if (hasPAD) {
        result.decline = true;
        result.reason = 'Peripheral Vascular Disease with surgery - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Stroke
    if (hasStroke) {
        if (data.monthsSinceHeart < 6) {
            result.decline = true;
            result.reason = 'Stroke less than 6 months ago - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        if (data.numberOfHeartEvents > 1) {
            result.decline = true;
            result.reason = 'Multiple strokes - Auto Decline (Flash Sheet page 5)';
            return result;
        }
    }
    
    // If heart conditions present but not auto-decline, rate
    if (hasHeartAttack || hasCoronaryBypass || hasAngioplasty || hasAngina) {
        result.rating = 'T-2 to T-10';
        result.reason = 'History of coronary artery disease - requires rating (Manual pages 39-41)';
        result.warnings.push('Heart condition requires APS and may require exam with EKG');
    }
    
    if (data.hasHBP) {
        // Most treated HBP can be standard if controlled
        result.warnings.push('High Blood Pressure - most cases can be approved standard if controlled (Manual page 58)');
    }
    
    return result;
}

// =====================================================
// RESPIRATORY CONDITIONS
// =====================================================

function evaluateRespiratoryConditions(data) {
    const result = { decline: false, rating: null, reason: '' };
    
    // Asthma - ICU within 5 years OR 2+ hospitalizations within 2 years
    if (data.hasAsthma) {
        if (data.asthmaICU) {
            result.decline = true;
            result.reason = 'Asthma - hospitalized in Intensive Care within past 5 years - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        if (data.asthmaHospitalizations >= 2) {
            result.decline = true;
            result.reason = 'Asthma - admitted to hospital 2 or more times within 2 years - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        
        // Severity-based rating
        if (data.asthmaSeverity === 'mild') {
            result.reason = 'Mild asthma - may qualify standard (Manual page 20)';
        } else if (data.asthmaSeverity === 'moderate') {
            result.rating = 'T-4 to T-6';
            result.reason = 'Moderate asthma - requires rating (Manual page 20)';
        } else if (data.asthmaSeverity === 'severe') {
            result.decline = true;
            result.reason = 'Severe asthma - uninsurable (Manual page 20)';
            return result;
        }
    }
    
    // COPD/Emphysema
    if (data.hasCOPD || data.hasEmphysema) {
        if (data.usesOxygen && data.hasCHF) {
            result.decline = true;
            result.reason = 'COPD/Emphysema using home oxygen with history of cardiac failure - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        
        // Mild cases may get exclusion rider, moderate/severe are uninsurable
        result.decline = true;
        result.reason = 'COPD/Emphysema - most cases uninsurable, mild cases may get exclusion rider (Manual page 35)';
        return result;
    }
    
    // Sleep Apnea
    if (data.hasSleepApnea) {
        result.reason = 'Sleep Apnea - mild cases standard, cases requiring therapy may be uninsurable (Manual page 73)';
    }
    
    return result;
}

// =====================================================
// MENTAL HEALTH EVALUATION
// =====================================================

function evaluateMentalHealth(data) {
    const result = { decline: false, rating: null, reason: '' };
    
    // Schizophrenia/Psychosis
    if (data.hasSchizophrenia) {
        result.decline = true;
        result.reason = 'Schizophrenia/Psychosis - most cases uninsurable (Manual page 69)';
        return result;
    }
    
    // Bipolar Disorder
    if (data.hasBipolar) {
        if (data.mentalControlled) {
            result.rating = 'T-4 to T-10';
            result.reason = 'Bipolar Disorder with effective control - requires rating (Manual page 45)';
        } else {
            result.decline = true;
            result.reason = 'Bipolar Disorder without effective control - uninsurable (Manual page 45)';
            return result;
        }
    }
    
    // Major Depression
    if (data.hasDepression) {
        if (data.mentalSeverity === 'major') {
            if (data.mentalHospitalized) {
                result.decline = true;
                result.reason = 'Major Depression with hospitalization within 2 years - uninsurable (Manual page 44)';
                return result;
            }
            result.rating = 'T-4 to T-10';
            result.reason = 'Major Depression - may require rating (Manual page 44)';
        } else {
            // Minor depression
            if (data.mentalControlled) {
                result.reason = 'Minor depression/anxiety with effective control - may qualify standard (Manual page 46)';
            } else {
                result.rating = 'T-2 to T-6';
                result.reason = 'Minor depression/anxiety - may require rating (Manual page 46)';
            }
        }
    }
    
    // Anxiety (Minor Affective Disorder)
    if (data.hasAnxiety && !data.hasDepression) {
        if (data.mentalControlled) {
            result.reason = 'Minor anxiety with effective control - may qualify standard (Manual page 46)';
        } else {
            result.rating = 'T-2 to T-6';
            result.reason = 'Anxiety - may require rating (Manual page 46)';
        }
    }
    
    // Multiple Sclerosis
    if (data.hasMS) {
        result.decline = true;
        result.reason = 'Multiple Sclerosis - most cases uninsurable (Manual page 63)';
        return result;
    }
    
    return result;
}

// =====================================================
// SEIZURE EVALUATION
// =====================================================

function evaluateSeizures(data) {
    const result = { decline: false, rating: null, reason: '' };
    
    // Newly diagnosed within 6 months
    if (data.seizureDiagnosis < 6) {
        result.decline = true;
        result.reason = 'Seizure disorder - newly diagnosed within last 6 months - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Last seizure within 2 years
    if (data.lastSeizure < 24) {
        result.decline = true;
        result.reason = 'Seizure within 2 years of application date - uninsurable (Manual pages 71-72)';
        return result;
    }
    
    // No seizure in 2+ years
    if (data.lastSeizure >= 24) {
        if (data.lastSeizure >= 60) {
            // 5+ years seizure-free
            result.reason = 'Seizure disorder - no seizures for 5+ years - may qualify standard (Manual pages 71-72)';
        } else {
            result.rating = 'T-2 to T-4';
            result.reason = 'Seizure disorder - controlled, no seizures for 2+ years - requires rating (Manual pages 71-72)';
        }
    }
    
    return result;
}

// =====================================================
// SUBSTANCE ABUSE EVALUATION
// =====================================================

function evaluateSubstanceAbuse(data) {
    const result = { decline: false, rating: null, reason: '', warnings: [] };
    
    // ========== ALCOHOL ==========
    
    // Alcohol Treatment + Still Drinks OR Dry < 1 year
    if (data.alcoholTreatment) {
        if (data.stillDrinks) {
            result.decline = true;
            result.reason = 'Alcohol Treatment (Voluntary) and still drinks - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        if (data.yearsDry < 1) {
            result.decline = true;
            result.reason = 'Alcohol Treatment - dry less than 1 year - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        
        // Alcohol + Hard Drug Use
        if (data.hardDrugUse && (data.yearsDry < 5 || data.yearsSinceDrugs < 5)) {
            result.decline = true;
            result.reason = 'Alcohol Treatment with hard drug use history - clean & dry from both less than 5 years - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        
        // Recovering alcoholic ratings (Manual pages 13-14)
        if (data.yearsDry >= 5) {
            result.reason = 'Recovering alcoholic - 5+ years sobriety - may qualify standard (Manual page 14)';
        } else if (data.yearsDry >= 1) {
            result.rating = 'T-8 to T-4';
            result.reason = 'Recovering alcoholic - ' + data.yearsDry + ' years sobriety - requires rating (Manual page 14)';
        }
    }
    
    // ========== DRUGS (Other than Marijuana) ==========
    
    // Drug Use within 2 years
    if (data.hardDrugUse && data.yearsSinceDrugs < 2) {
        result.decline = true;
        result.reason = 'Drug use or drug-related arrest within 2 years (other than marijuana) - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Drug abstinence ratings (Manual page 52)
    if (data.hardDrugUse && data.yearsSinceDrugs >= 2) {
        if (data.yearsSinceDrugs >= 7) {
            result.reason = 'Previous hard drug use - 7+ years clean - may qualify standard (Manual page 52)';
        } else if (data.yearsSinceDrugs >= 5) {
            result.rating = 'T-4 to T-6';
            result.reason = 'Previous hard drug use - 5-7 years clean - requires rating (Manual page 52)';
        } else {
            result.rating = 'T-8 to T-10';
            result.reason = 'Previous hard drug use - 2-5 years clean - requires rating (Manual page 52)';
        }
    }
    
    // ========== MARIJUANA ==========
    
    // Current Marijuana Use + Past Alcohol Treatment/Hard Drug Use/Drug Arrest/Felony Arrest
    if (data.usesMarijuana) {
        if (data.alcoholTreatment || data.hardDrugUse || data.drugArrest || data.felonyArrest) {
            result.decline = true;
            result.reason = 'Current marijuana use with history of alcohol treatment, hard drug use, drug arrest, or felony arrest - Auto Decline (Flash Sheet page 5, Manual page 61)';
            return result;
        }
        
        // Marijuana use frequency (Manual page 61)
        result.warnings.push('Current marijuana use - may require rating or smoker rates (Manual page 61)');
    }
    
    // ========== DWI EVALUATION ==========
    
    if (data.hasDWI) {
        // 2 DWIs within last 5 years AND last within 2 years
        if (data.numberOfDWIs >= 2) {
            if (data.yearsSinceDWI < 2) {
                result.decline = true;
                result.reason = '2 or more DWIs within last 5 years and last DWI within 2 years - Auto Decline (Flash Sheet page 5, Manual page 51)';
                return result;
            }
        }
        
        // 3 or more DWIs and drinking within 1 year
        if (data.numberOfDWIs >= 3 && data.stillDrinks) {
            result.decline = true;
            result.reason = '3 or more DWIs and drinking alcohol within past 1 year - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        
        // Single DWI within 2 years
        if (data.numberOfDWIs === 1 && data.yearsSinceDWI < 2) {
            result.rating = '$5 per thousand for 2 years';
            result.reason = 'Single DWI within 2 years - requires rating (Manual page 51)';
        }
    }
    
    return result;
}

// =====================================================
// ARREST HISTORY EVALUATION
// =====================================================

function evaluateArrestHistory(data) {
    const result = { decline: false, rating: null, reason: '' };
    
    if (!data.hasArrests) {
        return result;
    }
    
    // Drug Arrest OR Felony Arrest starting probation within 5 years
    if (data.drugArrest || data.felonyArrest) {
        if (data.onProbation && data.yearsSinceProbation < 5) {
            result.decline = true;
            result.reason = 'Drug arrest or felony arrest starting probation/parole within past 5 years - Auto Decline (Flash Sheet page 5)';
            return result;
        }
        
        // Felony conviction - probation completed
        if (data.yearsSinceProbation >= 5) {
            result.reason = 'Felony conviction - 5+ years after completion of probation - may qualify standard (Manual page 16)';
        }
    }
    
    // Multiple Arrests - 2 or more and last within 5 years
    if (data.totalArrests >= 2 && data.yearsSinceArrest < 5) {
        result.decline = true;
        result.reason = '2 or more arrests and the last one within 5 years - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    // Misdemeanor with probation within 1 year
    if (!data.felonyArrest && data.onProbation && data.yearsSinceProbation < 1) {
        result.decline = true;
        result.reason = 'Misdemeanor arrest with probation within 1 year - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    return result;
}

// =====================================================
// BUILD (Height/Weight) EVALUATION
// =====================================================

function evaluateBuild(data) {
    const result = { decline: false, rating: null, reason: '' };
    
    const tableRating = calculateBuildRating(data.heightInches, data.weight);
    
    if (tableRating === -1) {
        result.decline = true;
        result.reason = 'Weight exceeds build chart maximum - Auto Decline (Flash Sheet page 5)';
        return result;
    }
    
    if (tableRating >= 2) {
        result.rating = 'T-' + tableRating;
        result.reason = 'Overweight - Table ' + tableRating + ' rating per build chart (Manual page 4)';
    }
    
    return result;
}

// =====================================================
// BUILD CHART CALCULATOR (Page 4 of PDF)
// =====================================================

function calculateBuildRating(heightInches, weight) {
    // Build chart data from PDF page 4
    const buildChart = {
        56: { max: 140, t2: 172, t3: 179, t4: 186, t5: 190, t6: 195, t8: 203, t10: 208, t12: 212 },
        57: { max: 145, t2: 178, t3: 185, t4: 192, t5: 197, t6: 202, t8: 211, t10: 215, t12: 220 },
        58: { max: 150, t2: 185, t3: 192, t4: 199, t5: 204, t6: 209, t8: 218, t10: 223, t12: 228 },
        59: { max: 155, t2: 191, t3: 199, t4: 206, t5: 211, t6: 216, t8: 226, t10: 231, t12: 236 },
        60: { max: 161, t2: 198, t3: 205, t4: 213, t5: 218, t6: 223, t8: 233, t10: 239, t12: 244 },
        61: { max: 166, t2: 204, t3: 212, t4: 220, t5: 225, t6: 231, t8: 241, t10: 247, t12: 252 },
        62: { max: 172, t2: 211, t3: 219, t4: 227, t5: 233, t6: 238, t8: 249, t10: 255, t12: 260 },
        63: { max: 177, t2: 218, t3: 226, t4: 235, t5: 240, t6: 246, t8: 257, t10: 263, t12: 269 },
        64: { max: 183, t2: 225, t3: 234, t4: 242, t5: 248, t6: 254, t8: 266, t10: 271, t12: 277 },
        65: { max: 189, t2: 232, t3: 241, t4: 250, t5: 256, t6: 262, t8: 274, t10: 280, t12: 286 },
        66: { max: 195, t2: 239, t3: 248, t4: 258, t5: 264, t6: 270, t8: 282, t10: 289, t12: 295 },
        67: { max: 201, t2: 246, t3: 256, t4: 265, t5: 272, t6: 278, t8: 291, t10: 297, t12: 304 },
        68: { max: 207, t2: 254, t3: 264, t4: 273, t5: 280, t6: 287, t8: 300, t10: 306, t12: 313 },
        69: { max: 213, t2: 261, t3: 271, t4: 282, t5: 288, t6: 295, t8: 309, t10: 315, t12: 322 },
        70: { max: 219, t2: 269, t3: 279, t4: 290, t5: 297, t6: 304, t8: 318, t10: 325, t12: 332 },
        71: { max: 225, t2: 277, t3: 287, t4: 298, t5: 305, t6: 312, t8: 327, t10: 334, t12: 341 },
        72: { max: 232, t2: 284, t3: 295, t4: 306, t5: 314, t6: 321, t8: 336, t10: 343, t12: 351 },
        73: { max: 238, t2: 292, t3: 304, t4: 315, t5: 323, t6: 330, t8: 345, t10: 353, t12: 361 },
        74: { max: 245, t2: 300, t3: 312, t4: 324, t5: 332, t6: 339, t8: 355, t10: 363, t12: 370 },
        75: { max: 252, t2: 309, t3: 321, t4: 333, t5: 341, t6: 349, t8: 365, t10: 373, t12: 381 },
        76: { max: 258, t2: 317, t3: 329, t4: 341, t5: 350, t6: 358, t8: 374, t10: 383, t12: 391 },
        77: { max: 265, t2: 325, t3: 338, t4: 350, t5: 359, t6: 367, t8: 384, t10: 393, t12: 401 },
        78: { max: 272, t2: 334, t3: 347, t4: 360, t5: 368, t6: 377, t8: 394, t10: 403, t12: 412 },
        79: { max: 279, t2: 342, t3: 356, t4: 369, t5: 378, t6: 387, t8: 404, t10: 413, t12: 422 },
        80: { max: 286, t2: 351, t3: 365, t4: 378, t5: 387, t6: 396, t8: 415, t10: 424, t12: 433 },
        81: { max: 293, t2: 360, t3: 374, t4: 388, t5: 397, t6: 406, t8: 425, t10: 434, t12: 444 }
    };
    
    if (!buildChart[heightInches]) {
        return 0; // Height not in chart, no rating
    }
    
    const limits = buildChart[heightInches];
    
    if (weight <= limits.max) {
        return 0; // Standard
    } else if (weight <= limits.t2) {
        return 2;
    } else if (weight <= limits.t3) {
        return 3;
    } else if (weight <= limits.t4) {
        return 4;
    } else if (weight <= limits.t5) {
        return 5;
    } else if (weight <= limits.t6) {
        return 6;
    } else if (weight <= limits.t8) {
        return 8;
    } else if (weight <= limits.t10) {
        return 10;
    } else if (weight <= limits.t12) {
        return 12;
    } else {
        return -1; // Exceeds chart, decline
    }
}

// =====================================================
// TOBACCO EVALUATION
// =====================================================

function evaluateTobacco(data) {
    const result = { warning: '', reason: '' };
    
    if (data.usesTobacco) {
        if (data.yearsSinceQuitTobacco === 0) {
            result.reason = 'Current tobacco user - smoker rates apply';
            result.warning = 'Current tobacco use - affects rates and some conditions (e.g., lung cancer + smoking = auto decline)';
        } else if (data.yearsSinceQuitTobacco < 1) {
            result.reason = 'Quit tobacco less than 1 year ago - smoker rates likely apply';
        } else {
            result.reason = 'Former tobacco user - quit ' + data.yearsSinceQuitTobacco + ' years ago';
        }
    }
    
    return result;
}

// =====================================================
// HELPER FUNCTIONS
// =====================================================

function createDecline(reason) {
    return {
        decision: 'DECLINE',
        product: 'ALL PRODUCTS',
        tableRating: null,
        reasons: [reason],
        warnings: ['DO NOT SUBMIT APPLICATION - Consult with underwriting if questions']
    };
}

function combineRatings(rating1, rating2) {
    if (!rating1) return rating2;
    if (!rating2) return rating1;
    
    // Simple combination - in reality would need more complex logic
    // This is a placeholder for proper rating combination
    return rating1 + ' + ' + rating2;
}
