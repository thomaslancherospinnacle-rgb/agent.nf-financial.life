// AIL Form Handler - FULLY SAFE VERSION

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
    // Helper to safely get value
    const safeValue = (id, defaultVal = '') => {
        const el = document.getElementById(id);
        return el ? el.value : defaultVal;
    };
    
    // Helper to safely get checked
    const safeChecked = (id) => {
        const el = document.getElementById(id);
        return el ? el.checked : false;
    };
    
    // Helper to safely get number
    const safeNumber = (id, defaultVal = 0) => {
        const el = document.getElementById(id);
        return el && el.value ? parseFloat(el.value) : defaultVal;
    };
    
    const heightFeet = safeNumber('heightFeet', 0);
    const heightInches = safeNumber('heightInches', 0);
    
    return {
        age: parseInt(safeValue('age', '0')),
        heightInches: (parseInt(heightFeet) * 12) + parseInt(heightInches),
        weight: parseInt(safeValue('weight', '0')),
        isMale: safeValue('gender') === 'male',
        state: safeValue('state'),
        faceAmount: parseInt(safeValue('faceAmount', '0')),
        nonSmokerPlan: safeValue('nonSmokerPlan') === 'yes',
        
        currentlyHospitalized: safeChecked('currentlyHospitalized'),
        currentlyJailed: safeChecked('currentlyJailed'),
        legallyResiding: safeChecked('legallyResiding'),
        
        usesTobacco: safeChecked('usesTobacco'),
        yearsSinceQuitTobacco: safeNumber('yearsSinceQuitTobacco'),
        currentSmoker: safeChecked('usesTobacco') && safeNumber('yearsSinceQuitTobacco') === 0,
        
        hasHIV: safeChecked('hasHIV'),
        onKidneyDialysis: safeChecked('onKidneyDialysis'),
        hasAlzheimers: safeChecked('hasAlzheimers'),
        hasCysticFibrosis: safeChecked('hasCysticFibrosis'),
        hasDefibrillator: safeChecked('hasDefibrillator'),
        
        hasCancer: safeChecked('hasCancer'),
        cancerType: safeValue('cancerType'),
        cancerYearsSinceTreatment: safeNumber('cancerYearsSinceTreatment'),
        cancerMetastatic: safeChecked('cancerMetastatic'),
        
        hasDiabetes: safeChecked('hasDiabetes'),
        usesInsulin: safeChecked('usesInsulin'),
        diabetesAge: safeNumber('diabetesAge'),
        diabetesLastVisit: safeNumber('diabetesLastVisit'),
        diabetesMeds: safeNumber('diabetesMeds'),
        diabetesControlled: safeChecked('diabetesControlled'),
        diabetesKidneyDisease: safeChecked('diabetesKidneyDisease'),
        
        hasHBP: safeChecked('hasHBP'),
        hasAngina: safeChecked('hasAngina'),
        hasHeartAttack: safeChecked('hasHeartAttack'),
        hasCoronaryBypass: safeChecked('hasCoronaryBypass'),
        hasAngioplasty: safeChecked('hasAngioplasty'),
        hasStroke: safeChecked('hasStroke'),
        hasTIA: safeChecked('hasTIA'),
        hasCHF: safeChecked('hasCHF'),
        hasValveReplacement: safeChecked('hasValveReplacement'),
        hasPAD: safeChecked('hasPAD'),
        
        monthsSinceHeart: safeNumber('monthsSinceHeart', 999),
        ageAtHeart: safeNumber('ageAtHeart', 999),
        numberOfHeartEvents: safeNumber('numberOfHeartEvents'),
        hbpMeds: safeNumber('hbpMeds'),
        hbpHospitalized: safeChecked('hbpHospitalized'),
        
        hasAsthma: safeChecked('hasAsthma'),
        hasCOPD: safeChecked('hasCOPD'),
        hasEmphysema: safeChecked('hasEmphysema'),
        hasSleepApnea: safeChecked('hasSleepApnea'),
        asthmaSeverity: safeValue('asthmaSeverity'),
        asthmaHospitalizations: safeNumber('asthmaHospitalizations'),
        asthmaICU: safeChecked('asthmaICU'),
        usesOxygen: safeChecked('usesOxygen'),
        
        hasDepression: safeChecked('hasDepression'),
        hasAnxiety: safeChecked('hasAnxiety'),
        hasBipolar: safeChecked('hasBipolar'),
        hasSchizophrenia: safeChecked('hasSchizophrenia'),
        hasSeizures: safeChecked('hasSeizures'),
        hasMS: safeChecked('hasMS'),
        mentalSeverity: safeValue('mentalSeverity'),
        mentalControlled: safeChecked('mentalControlled'),
        mentalHospitalized: safeChecked('mentalHospitalized'),
        seesTherapist: safeChecked('seesTherapist'),
        seizureDiagnosis: safeNumber('seizureDiagnosis', 999),
        lastSeizure: safeNumber('lastSeizure'),
        
        alcoholTreatment: safeChecked('alcoholTreatment'),
        stillDrinks: safeChecked('stillDrinks'),
        yearsDry: safeNumber('yearsDry'),
        hardDrugUse: safeChecked('hardDrugUse'),
        yearsSinceDrugs: safeNumber('yearsSinceDrugs'),
        usesMarijuana: safeChecked('usesMarijuana'),
        hasDWI: safeChecked('hasDWI'),
        numberOfDWIs: safeNumber('numberOfDWIs'),
        yearsSinceDWI: safeNumber('yearsSinceDWI'),
        
        hasArrests: safeChecked('hasArrests'),
        felonyArrest: safeChecked('felonyArrest'),
        drugArrest: safeChecked('drugArrest'),
        totalArrests: safeNumber('totalArrests'),
        yearsSinceArrest: safeNumber('yearsSinceArrest'),
        onProbation: safeChecked('onProbation'),
        yearsSinceProbation: safeNumber('yearsSinceProbation'),
        
        medications: safeValue('medications'),
        takesOpiates: safeChecked('takesOpiates'),
        takesBenzos: safeChecked('takesBenzos'),
        notTakingMeds: safeChecked('notTakingMeds'),
        
        otherConditions: safeValue('otherConditions'),
        recentHospital: safeChecked('recentHospital'),
        monthsSinceHospital: safeNumber('monthsSinceHospital'),
        daysHospitalized: safeNumber('daysHospitalized'),
        currentlyDisabled: safeChecked('currentlyDisabled')
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
