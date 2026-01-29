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
        hasKidneyDisease: safeChecked('hasKidneyDisease'),
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
    
    let html = '';
    
    // Applicant Profile Section
    if (result.profile) {
        html += '<div class="result-section profile-section">';
        html += '<div class="result-label">📋 Applicant Profile:</div>';
        html += `<div class="result-value profile-text">${result.profile}</div>`;
        html += '</div>';
    }
    
    // Product and Rating
    html += '<div class="result-section">';
    html += '<div class="result-label">Product:</div>';
    html += `<div class="result-value">${result.product}</div>`;
    html += '</div>';
    
    if (result.tableRating) {
        html += '<div class="result-section">';
        html += '<div class="result-label">Table Rating:</div>';
        html += `<div class="result-value">${result.tableRating}</div>`;
        html += '</div>';
    }
    
    // Risk Factors Section
    if (result.riskFactors && result.riskFactors.length > 0) {
        html += '<div class="result-section risk-factors-section">';
        html += '<div class="result-label">⚠️ Risk Factor Combinations:</div>';
        html += '<div class="risk-factors-list">';
        result.riskFactors.forEach(rf => {
            const severityClass = rf.severity.toLowerCase();
            html += `<div class="risk-factor risk-${severityClass}">`;
            html += `<strong>${rf.combination}</strong> `;
            html += `<span class="severity-badge severity-${severityClass}">${rf.severity}</span><br>`;
            html += `<span class="risk-note">${rf.note}</span>`;
            html += '</div>';
        });
        html += '</div>';
        html += '</div>';
    }
    
    // Reasons Section
    html += '<div class="result-section">';
    html += '<div class="result-label">Reason(s):</div>';
    html += '<ul class="result-list">';
    result.reasons.forEach(r => {
        html += `<li>${r}</li>`;
    });
    html += '</ul>';
    html += '</div>';
    
    // Warnings
    if (result.warnings && result.warnings.length > 0) {
        html += '<div class="warning-box">';
        html += '<strong>⚠️ Warnings:</strong><ul>';
        result.warnings.forEach(w => {
            html += `<li>${w}</li>`;
        });
        html += '</ul></div>';
    }
    
    // Additional Information Needed Section
    if (result.additionalInfoNeeded && result.additionalInfoNeeded.length > 0) {
        html += '<div class="result-section additional-info-section">';
        html += '<div class="result-label">📄 Additional Information Required:</div>';
        
        const required = result.additionalInfoNeeded.filter(info => info.required);
        const optional = result.additionalInfoNeeded.filter(info => !info.required);
        
        if (required.length > 0) {
            html += '<div class="info-required">';
            html += '<strong>Required:</strong>';
            html += '<ul class="additional-info-list">';
            required.forEach(info => {
                html += `<li><strong>${info.item}</strong><br>`;
                html += `<span class="info-reason">${info.reason}</span></li>`;
            });
            html += '</ul>';
            html += '</div>';
        }
        
        if (optional.length > 0) {
            html += '<div class="info-optional">';
            html += '<strong>May Be Requested:</strong>';
            html += '<ul class="additional-info-list">';
            optional.forEach(info => {
                html += `<li><strong>${info.item}</strong><br>`;
                html += `<span class="info-reason">${info.reason}</span></li>`;
            });
            html += '</ul>';
            html += '</div>';
        }
        
        html += '</div>';
    }
    
    // Next Steps
    html += '<div class="result-section">';
    html += '<div class="result-label">📋 Next Steps:</div>';
    html += '<ul class="result-list">';
    
    if (result.decision === 'STANDARD') {
        html += '<li>Collect all required questionnaires and forms</li>';
        html += '<li>Obtain required signatures</li>';
        html += '<li>Submit for standard underwriting</li>';
        if (result.additionalInfoNeeded && result.additionalInfoNeeded.length > 0) {
            html += '<li>Ensure all additional documentation listed above is included</li>';
        }
    } else if (result.decision === 'RATED') {
        html += '<li>Discuss table rating with applicant</li>';
        html += '<li>Explain premium increase and obtain consent</li>';
        html += '<li>Collect all required questionnaires (see above)</li>';
        html += '<li>Submit with complete medical history and documentation</li>';
    } else if (result.decision === 'AUTO_TRIAL' || result.decision === 'NEEDS_REVIEW') {
        html += '<li><strong>MARK APPLICATION AS TRIAL</strong></li>';
        html += '<li>Collect ALL required questionnaires and documentation</li>';
        html += '<li>Include detailed explanation of all health conditions</li>';
        html += '<li>Submit with full disclosure - do not guarantee approval</li>';
        html += '<li>Set expectations with applicant about trial/review process</li>';
        html += '<li>Underwriting will review and may request additional information</li>';
    } else if (result.decision === 'DECLINE') {
        html += '<li><strong>DO NOT SUBMIT APPLICATION</strong></li>';
        html += '<li>Explain to applicant that coverage is not available at this time</li>';
        html += '<li>If questions, consult with underwriting department</li>';
        html += '<li>Consider alternative products (simplified issue, guaranteed issue)</li>';
    } else if (result.decision === 'POSTPONE') {
        html += '<li>Wait for postpone period to end</li>';
        html += '<li>Gather all required medical documentation during waiting period</li>';
        html += '<li>Follow up with applicant when eligible to reapply</li>';
    }
    
    html += '</ul></div>';
    
    // Disclaimer
    html += '<div class="disclaimer-box" style="margin-top: 20px;">';
    html += '<strong>⚠️ REMEMBER:</strong> This is a screening tool only. Final decisions are made by AIL Underwriting. ';
    html += 'Do NOT guarantee coverage based on this result. ';
    if (result.decision === 'NEEDS_REVIEW' || result.decision === 'AUTO_TRIAL') {
        html += '<strong>Trial applications may be approved, rated, or declined after underwriter review.</strong>';
    }
    html += '</div>';
    
    resultsContent.innerHTML = html;
}
