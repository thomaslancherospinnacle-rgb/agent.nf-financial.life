// AIL Form Handler

document.addEventListener('DOMContentLoaded', function() {
    setupFormInteractions();
    setupFormSubmission();
});

function setupFormInteractions() {
    // Show/hide conditional sections
    const conditionals = {
        'usesTobacco': 'tobaccoDetails',
        'hasCancer': 'cancerDetails',
        'hasDiabetes': 'diabetesDetails',
        'hasHeartAttack': 'heartDetails',
        'hasCoronaryBypass': 'heartDetails',
        'hasAngioplasty': 'heartDetails',
        'hasAngina': 'heartDetails',
        'hasHBP': 'hbpDetails',
        'hasAsthma': 'asthmaDetails',
        'hasCOPD': 'copdDetails',
        'hasEmphysema': 'copdDetails',
        'hasDepression': 'mentalHealthDetails',
        'hasAnxiety': 'mentalHealthDetails',
        'hasSeizures': 'seizureDetails',
        'alcoholTreatment': 'alcoholDetails',
        'hardDrugUse': 'drugDetails',
        'hasDWI': 'dwiDetails',
        'hasArrests': 'arrestDetails',
        'onProbation': 'probationDetails',
        'recentHospital': 'hospitalDetails'
    };
    
    Object.keys(conditionals).forEach(trigger => {
        const element = document.getElementById(trigger);
        if (element) {
            element.addEventListener('change', function() {
                const targetId = conditionals[trigger];
                toggleSection(targetId, this.checked);
            });
        }
    });
}

function toggleSection(sectionId, show) {
    const section = document.getElementById(sectionId);
    if (section) {
        if (show) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    }
}

function setupFormSubmission() {
    document.getElementById('uwForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const data = gatherFormData();
        const result = evaluateApplication(data);
        displayResults(result);
        
        document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('uwForm').addEventListener('reset', function() {
        document.getElementById('results').classList.remove('show');
        document.querySelectorAll('.sub-question').forEach(el => el.classList.add('hidden'));
    });
}

function gatherFormData() {
    const heightFeet = parseInt(document.getElementById('heightFeet').value) || 0;
    const heightInches = parseInt(document.getElementById('heightInches').value) || 0;
    
    return {
        age: parseInt(document.getElementById('age').value),
        heightInches: (heightFeet * 12) + heightInches,
        weight: parseInt(document.getElementById('weight').value),
        isMale: document.getElementById('gender').value === 'male',
        state: document.getElementById('state').value,
        faceAmount: parseInt(document.getElementById('faceAmount').value) || 0,
        nonSmokerPlan: document.getElementById('nonSmokerPlan').value === 'yes',
        
        currentlyHospitalized: document.getElementById('currentlyHospitalized').checked,
        currentlyJailed: document.getElementById('currentlyJailed').checked,
        legallyResiding: document.getElementById('legallyResiding').checked,
        
        usesTobacco: document.getElementById('usesTobacco').checked,
        yearsSinceQuitTobacco: parseFloat(document.getElementById('yearsSinceQuitTobacco')?.value) || 0,
        currentSmoker: document.getElementById('usesTobacco').checked && 
                      (parseFloat(document.getElementById('yearsSinceQuitTobacco')?.value) || 0) === 0,
        
        hasHIV: document.getElementById('hasHIV').checked,
        onKidneyDialysis: document.getElementById('onKidneyDialysis').checked,
        hasAlzheimers: document.getElementById('hasAlzheimers').checked,
        hasCysticFibrosis: document.getElementById('hasCysticFibrosis').checked,
        hasDefibrillator: document.getElementById('hasDefibrillator').checked,
        
        hasCancer: document.getElementById('hasCancer').checked,
        cancerType: document.getElementById('cancerType')?.value,
        cancerYearsSinceTreatment: parseFloat(document.getElementById('cancerYearsSinceTreatment')?.value) || 0,
        cancerMetastatic: document.getElementById('cancerMetastatic')?.checked || false,
        
        hasDiabetes: document.getElementById('hasDiabetes').checked,
        usesInsulin: document.getElementById('usesInsulin')?.checked || false,
        diabetesAge: parseInt(document.getElementById('diabetesAge')?.value) || 0,
        diabetesLastVisit: parseFloat(document.getElementById('diabetesLastVisit')?.value) || 0,
        diabetesMeds: parseInt(document.getElementById('diabetesMeds')?.value) || 0,
        diabetesControlled: document.getElementById('diabetesControlled')?.checked || false,
        diabetesKidneyDisease: document.getElementById('diabetesKidneyDisease')?.checked || false,
        
        hasHBP: document.getElementById('hasHBP').checked,
        hasAngina: document.getElementById('hasAngina').checked,
        hasHeartAttack: document.getElementById('hasHeartAttack').checked,
        hasCoronaryBypass: document.getElementById('hasCoronaryBypass').checked,
        hasAngioplasty: document.getElementById('hasAngioplasty').checked,
        hasStroke: document.getElementById('hasStroke').checked,
        hasTIA: document.getElementById('hasTIA').checked,
        hasCHF: document.getElementById('hasCHF').checked,
        hasValveReplacement: document.getElementById('hasValveReplacement').checked,
        hasPAD: document.getElementById('hasPAD').checked,
        
        monthsSinceHeart: parseInt(document.getElementById('monthsSinceHeart')?.value) || 999,
        ageAtHeart: parseInt(document.getElementById('ageAtHeart')?.value) || 999,
        numberOfHeartEvents: parseInt(document.getElementById('numberOfHeartEvents')?.value) || 0,
        hbpMeds: parseInt(document.getElementById('hbpMeds')?.value) || 0,
        hbpHospitalized: document.getElementById('hbpHospitalized')?.checked || false,
        
        hasAsthma: document.getElementById('hasAsthma').checked,
        hasCOPD: document.getElementById('hasCOPD').checked,
        hasEmphysema: document.getElementById('hasEmphysema').checked,
        hasSleepApnea: document.getElementById('hasSleepApnea').checked,
        asthmaSeverity: document.getElementById('asthmaSeverity')?.value,
        asthmaHospitalizations: parseInt(document.getElementById('asthmaHospitalizations')?.value) || 0,
        asthmaICU: document.getElementById('asthmaICU')?.checked || false,
        usesOxygen: document.getElementById('usesOxygen')?.checked || false,
        
        hasDepression: document.getElementById('hasDepression').checked,
        hasAnxiety: document.getElementById('hasAnxiety').checked,
        hasBipolar: document.getElementById('hasBipolar').checked,
        hasSchizophrenia: document.getElementById('hasSchizophrenia').checked,
        hasSeizures: document.getElementById('hasSeizures').checked,
        hasMS: document.getElementById('hasMS').checked,
        mentalSeverity: document.getElementById('mentalSeverity')?.value,
        mentalControlled: document.getElementById('mentalControlled')?.checked || false,
        mentalHospitalized: document.getElementById('mentalHospitalized')?.checked || false,
        seesTherapist: document.getElementById('seesTherapist')?.checked || false,
        seizureDiagnosis: parseInt(document.getElementById('seizureDiagnosis')?.value) || 999,
        lastSeizure: parseFloat(document.getElementById('lastSeizure')?.value) || 0,
        
        alcoholTreatment: document.getElementById('alcoholTreatment').checked,
        stillDrinks: document.getElementById('stillDrinks')?.checked || false,
        yearsDry: parseFloat(document.getElementById('yearsDry')?.value) || 0,
        hardDrugUse: document.getElementById('hardDrugUse').checked,
        yearsSinceDrugs: parseFloat(document.getElementById('yearsSinceDrugs')?.value) || 0,
        usesMarijuana: document.getElementById('usesMarijuana').checked,
        hasDWI: document.getElementById('hasDWI').checked,
        numberOfDWIs: parseInt(document.getElementById('numberOfDWIs')?.value) || 0,
        yearsSinceDWI: parseFloat(document.getElementById('yearsSinceDWI')?.value) || 0,
        
        hasArrests: document.getElementById('hasArrests').checked,
        felonyArrest: document.getElementById('felonyArrest')?.checked || false,
        drugArrest: document.getElementById('drugArrest')?.checked || false,
        totalArrests: parseInt(document.getElementById('totalArrests')?.value) || 0,
        yearsSinceArrest: parseFloat(document.getElementById('yearsSinceArrest')?.value) || 0,
        onProbation: document.getElementById('onProbation')?.checked || false,
        yearsSinceProbation: parseFloat(document.getElementById('yearsSinceProbation')?.value) || 0,
        
        medications: document.getElementById('medications').value,
        takesOpiates: document.getElementById('takesOpiates').checked,
        takesBenzos: document.getElementById('takesBenzos').checked,
        notTakingMeds: document.getElementById('notTakingMeds').checked,
        
        otherConditions: document.getElementById('otherConditions').value,
        recentHospital: document.getElementById('recentHospital').checked,
        monthsSinceHospital: parseInt(document.getElementById('monthsSinceHospital')?.value) || 0,
        daysHospitalized: parseInt(document.getElementById('daysHospitalized')?.value) || 0,
        currentlyDisabled: document.getElementById('currentlyDisabled').checked
    };
}

function displayResults(result) {
    const resultsDiv = document.getElementById('results');
    const resultsHeader = document.getElementById('resultsHeader');
    const resultsContent = document.getElementById('resultsContent');
    
    resultsDiv.className = 'results show';
    resultsDiv.classList.add(result.decision.toLowerCase().replace('_', '-'));
    
    const titles = {
        'STANDARD': '✅ STANDARD APPROVAL',
        'RATED': '⚠️ RATED/SUBSTANDARD',
        'AUTO_TRIAL': '📋 AUTO-TRIAL REQUIRED',
        'DECLINE': '❌ DECLINE - DO NOT SUBMIT',
        'POSTPONE': '⏸️ POSTPONE',
        'NEEDS_REVIEW': '🔍 NEEDS UNDERWRITER REVIEW'
    };
    
    resultsHeader.textContent = titles[result.decision];
    
    let html = '<div class="result-section">';
    html += '<div class="result-label">Product:</div>';
    html += `<div class="result-value">${result.product}</div>`;
    html += '</div>';
    
    if (result.tableRating) {
        html += '<div class="result-section">';
        html += '<div class="result-label">Table Rating:</div>';
        html += `<div class="result-value">${result.tableRating}</div>`;
        html += '</div>';
    }
    
    html += '<div class="result-section">';
    html += '<div class="result-label">Reason(s):</div>';
    html += '<ul class="result-list">';
    result.reasons.forEach(r => {
        html += `<li>${r}</li>`;
    });
    html += '</ul>';
    html += '</div>';
    
    if (result.warnings && result.warnings.length > 0) {
        html += '<div class="warning-box">';
        html += '<strong>⚠️ Warnings:</strong><ul>';
        result.warnings.forEach(w => {
            html += `<li>${w}</li>`;
        });
        html += '</ul></div>';
    }
    
    html += '<div class="result-section">';
    html += '<div class="result-label">📋 Next Steps:</div>';
    html += '<ul class="result-list">';
    
    if (result.decision === 'STANDARD') {
        html += '<li>Proceed with full application</li>';
        html += '<li>Collect required forms and signatures</li>';
        html += '<li>Submit for standard underwriting</li>';
    } else if (result.decision === 'RATED') {
        html += '<li>Discuss rating with applicant</li>';
        html += '<li>Obtain consent for rated policy</li>';
        html += '<li>Submit with full medical history</li>';
    } else if (result.decision === 'AUTO_TRIAL') {
        html += '<li><strong>Mark application as TRIAL</strong></li>';
        html += '<li>Collect all required questionnaires</li>';
        html += '<li>Submit with full disclosure</li>';
        html += '<li>Set expectations about trial process</li>';
    } else if (result.decision === 'DECLINE') {
        html += '<li><strong>DO NOT submit application</strong></li>';
        html += '<li>Consult with underwriting if questions</li>';
        html += '<li>Consider alternatives (simplified issue, etc.)</li>';
    } else if (result.decision === 'POSTPONE') {
        html += '<li>Wait for postpone period to end</li>';
        html += '<li>Gather required medical documentation</li>';
        html += '<li>Reapply after waiting period</li>';
    } else if (result.decision === 'NEEDS_REVIEW') {
        html += '<li>Contact underwriting for guidance</li>';
        html += '<li>Gather additional information</li>';
        html += '<li>May require trial submission</li>';
    }
    
    html += '</ul></div>';
    
    html += '<div class="disclaimer-box" style="margin-top: 20px;">';
    html += '<strong>⚠️ REMEMBER:</strong> This is a screening tool only. Final decisions are made by AIL Underwriting. ';
    html += 'Do NOT guarantee coverage based on this result.';
    html += '</div>';
    
    resultsContent.innerHTML = html;
}
