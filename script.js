// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeForm();
    setupEventListeners();
    populateCountrySelect();
});

// Country Data with Requirements and Success Rates
const countryData = {
    'USA': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Completed DS-160 Form',
            'Bank Statements (6 months)',
            'Interview Appointment Letter',
            'Recent Photographs (2x2 inches)',
            'Employment Letter',
            'Income Tax Returns (2 years)',
            'Travel Itinerary'
        ],
        embassy: 'https://www.usembassy.gov/',
        appointment: 'https://ais.usvisa-info.com/',
        baseSuccessRate: 65
    },
    'Canada': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Completed Visa Application Form',
            'Proof of Funds',
            'Travel Itinerary',
            'Photographs (as per specifications)',
            'Employment Letter',
            'Invitation Letter (if applicable)',
            'Medical Exam (if required)'
        ],
        embassy: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
        appointment: 'https://www.vfsglobal.ca/',
        baseSuccessRate: 70
    },
    'UK': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'UK Visa Application Form',
            'Bank Statements (6 months)',
            'Employment Contract',
            'Accommodation Proof',
            'Travel Insurance',
            'Flight Itinerary',
            'Proof of Ties to Home Country'
        ],
        embassy: 'https://www.gov.uk/world/embassies',
        appointment: 'https://www.vfsglobal.co.uk/',
        baseSuccessRate: 60
    },
    'France': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'https://france-visas.gouv.fr/',
        appointment: 'https://france-visas.gouv.fr/appointments',
        baseSuccessRate: 70
    },
    'Germany': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'https://www.germany.info/',
        appointment: 'https://www.vfsglobal.com/germany/',
        baseSuccessRate: 70
    },
    'Italy': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'https://vistoperitalia.esteri.it/home/en',
        appointment: 'https://www.vfsglobal.com/italy/',
        baseSuccessRate: 70
    },
    'Spain': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/Paginas/EmbajadasConsulados.aspx',
        appointment: 'https://www.vfsglobal.com/spain/',
        baseSuccessRate: 70
    },
    'Finland': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'https://finlandabroad.fi/frontpage',
        appointment: 'https://www.vfsglobal.com/finland/',
        baseSuccessRate: 70
    },
    'Greece': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'https://www.mfa.gr/en/visas/',
        appointment: 'https://www.vfsglobal.com/greece/',
        baseSuccessRate: 70
    },
    'Portugal': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'https://portaldascomunidades.mne.gov.pt/en/',
        appointment: 'https://www.vfsglobal.com/portugal/',
        baseSuccessRate: 70
    },
    'Denmark': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Schengen Visa Application Form',
            'Travel Insurance (30,000€ coverage)',
            'Round Trip Flight Reservation',
            'Hotel Bookings/Accommodation Proof',
            'Bank Statements (3 months)',
            'Employment Contract/Business License',
            'Income Tax Returns'
        ],
        embassy: 'https://um.dk/en/travel-and-residence/',
        appointment: 'https://www.vfsglobal.com/denmark/',
        baseSuccessRate: 70
    },
    'Japan': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Visa Application Form',
            'Recent Photograph',
            'Flight Itinerary',
            'Proof of Financial Means',
            'Invitation Letter (if applicable)',
            'Employment Certificate'
        ],
        embassy: 'https://www.mofa.go.jp/j_info/visit/visa/index.html',
        appointment: 'https://www.vfsglobal.com/japan/',
        baseSuccessRate: 75
    },
    'China': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Visa Application Form',
            'Recent Photograph',
            'Flight Itinerary',
            'Proof of Financial Means',
            'Invitation Letter (if applicable)',
            'Employment Certificate'
        ],
        embassy: 'http://cs.mfa.gov.cn/wgrlh/lhqz/lhqzjjs/',
        appointment: 'https://www.visaforchina.org/',
        baseSuccessRate: 65
    },
    'UAE': {
        requirements: [
            'Valid Passport (minimum 6 months validity)',
            'Visa Application Form',
            'Recent Photograph',
            'Flight Itinerary',
            'Proof of Financial Means',
            'Invitation Letter (if applicable)',
            'Employment Certificate'
        ],
        embassy: 'https://www.mofaic.gov.ae/en',
        appointment: 'https://www.vfsglobal.com/uae/',
        baseSuccessRate: 80
    }
};

// Initialize Form
function initializeForm() {
    const form = document.getElementById('visaForm');
    if (form) {
        form.reset();
        updateRequirements('');
        updateResults(0);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    const form = document.getElementById('visaForm');
    const countrySelect = document.getElementById('countrySelect');
    const premiumBtn = document.querySelector('.premium-btn');
    const homeLink = document.getElementById('homeLink');
    const supportLink = document.getElementById('supportLink');

    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    if (countrySelect) {
        countrySelect.addEventListener('change', handleCountryChange);
    }

    if (premiumBtn) {
        premiumBtn.addEventListener('click', showPremiumModal);
    }

    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (supportLink) {
        supportLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('contactSection').scrollIntoView({ behavior: 'smooth' });
        });
    }
}

// Populate Country Select
function populateCountrySelect() {
    const countrySelect = document.getElementById('countrySelect');
    if (!countrySelect) return;

    // Clear existing options except the first one
    while (countrySelect.options.length > 1) {
        countrySelect.remove(1);
    }

    // Add countries from countryData
    Object.keys(countryData).forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Handle Form Submit
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        country: document.getElementById('countrySelect').value,
        visaType: document.getElementById('visaType').value,
        travelHistory: document.getElementById('travelHistory').value,
        sponsorship: document.getElementById('sponsorship').value,
        income: document.getElementById('income').value
    };

    if (validateForm(formData)) {
        const score = calculateScore(formData);
        updateResults(score);
        showResultMessage(score);
    }
}

// Form Validation
function validateForm(formData) {
    for (let key in formData) {
        if (!formData[key]) {
            showError('Please complete all fields');
            return false;
        }
    }
    return true;
}

// Calculate Success Score
function calculateScore(formData) {
    let baseScore = countryData[formData.country]?.baseSuccessRate || 60;
    
    // Apply modifiers based on form data
    const modifiers = {
        visaType: getVisaTypeModifier(formData.visaType),
        travelHistory: getTravelHistoryModifier(formData.travelHistory),
        sponsorship: getSponsorshipModifier(formData.sponsorship),
        income: getIncomeModifier(formData.income)
    };

    // Calculate final score
    Object.values(modifiers).forEach(modifier => {
        baseScore *= (1 + modifier);
    });

    return Math.min(Math.round(baseScore), 100);
}

// Score Modifiers
function getVisaTypeModifier(type) {
    const modifiers = {
        'Tourist': 0.1,
        'Business': 0.15,
        'Student': 0.05,
        'Work': 0.2,
        'Family': 0.1
    };
    return modifiers[type] || 0;
}

function getTravelHistoryModifier(history) {
    const modifiers = {
        'Frequent': 0.2,
        'Moderate': 0.1,
        'Limited': 0,
        'None': -0.1
    };
    return modifiers[history] || 0;
}

function getSponsorshipModifier(sponsor) {
    const modifiers = {
        'Government': 0.25,
        'Company': 0.2,
        'Family': 0.1,
        'Self': 0
    };
    return modifiers[sponsor] || 0;
}

function getIncomeModifier(income) {
    const modifiers = {
        'high': 0.25,
        'medium': 0.15,
        'low': 0.05
    };
    return modifiers[income] || 0;
}

// Update UI Functions
function updateResults(score) {
    const percentage = document.querySelector('.percentage');
    if (percentage) {
        animateScore(0, score, percentage);
        updateCircleColor(score);
    }
}

function animateScore(start, end, element) {
    const duration = 1500;
    const steps = 60;
    const increment = (end - start) / steps;
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = `${Math.round(current)}%`;
    }, duration / steps);
}

function updateCircleColor(score) {
    const circle = document.querySelector('.progress-circle');
    if (!circle) return;

    let color;
    if (score >= 80) color = 'var(--success)';
    else if (score >= 60) color = 'var(--warning)';
    else color = 'var(--error)';
    
    circle.style.background = `conic-gradient(
        ${color} ${score * 3.6}deg,
        #f0f0f0 ${score * 3.6}deg
    )`;
}

function showResultMessage(score) {
    const resultMessage = document.querySelector('.result-message');
    const premiumSection = document.getElementById('premiumSection');
    if (!resultMessage || !premiumSection) return;

    if (score >= 80) {
        resultMessage.innerHTML = `<i class="icon">✨</i> Excellent! High chance of success`;
        resultMessage.style.color = 'var(--success)';
        premiumSection.classList.add('hidden');
    } else if (score >= 60) {
        resultMessage.innerHTML = `<i class="icon">📊</i> Good prospects with room for improvement`;
        resultMessage.style.color = 'var(--warning)';
        premiumSection.classList.remove('hidden');
    } else {
        resultMessage.innerHTML = `<i class="icon">⚠️</i> Consider expert assistance to improve chances`;
        resultMessage.style.color = 'var(--error)';
        premiumSection.classList.remove('hidden');
    }
}

// Update Requirements
function updateRequirements(country) {
    const requirementsList = document.getElementById('requirementsList');
    const embassyLink = document.getElementById('embassyLink');
    const appointmentLink = document.getElementById('appointmentLink');
    
    if (!requirementsList || !embassyLink || !appointmentLink) return;

    if (!country || !countryData[country]) {
        requirementsList.innerHTML = '<li>Select a country to view requirements</li>';
        return;
    }

    const data = countryData[country];
    requirementsList.innerHTML = data.requirements
        .map(req => `
            <li class="fade-in">
                <i class="icon">✅</i>
                <span>${req}</span>
            </li>
        `).join('');

    embassyLink.href = data.embassy;
    appointmentLink.href = data.appointment;
}

// Handle Country Change
function handleCountryChange(e) {
    updateRequirements(e.target.value);
}

// Error Handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message fade-in';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Premium Modal
function showPremiumModal() {
    // Add premium modal functionality here if needed
    console.log('Premium button clicked');
}