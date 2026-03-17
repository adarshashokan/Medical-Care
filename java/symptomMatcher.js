// Symptom Matcher - Maps symptoms to departments and doctors
class SymptomMatcher {
    constructor() {
        this.departmentMap = departmentSymptomMap;
    }

    // Match symptoms to departments
    matchSymptomsToDepartment(symptoms) {
        const normalizedSymptoms = symptoms.toLowerCase().split(/[,\s]+/).filter(s => s.length > 0);
        const scores = {};

        // Initialize scores for all departments
        Object.keys(this.departmentMap).forEach(dept => {
            scores[dept] = 0;
        });

        // Calculate matching score for each department
        normalizedSymptoms.forEach(symptom => {
            Object.entries(this.departmentMap).forEach(([dept, data]) => {
                // Check keywords
                data.keywords.forEach(keyword => {
                    if (keyword.includes(symptom) || symptom.includes(keyword)) {
                        scores[dept] += 3;
                    }
                });

                // Check symptoms
                data.symptoms.forEach(s => {
                    if (s.includes(symptom) || symptom.includes(s.substring(0, 3))) {
                        scores[dept] += 2;
                    }
                });
            });
        });

        // Get top matching departments
        const sortedDepts = Object.entries(scores)
            .sort((a, b) => b[1] - a[1])
            .filter(([, score]) => score > 0);

        return sortedDepts.length > 0 ? sortedDepts[0][0] : 'General/Family Medicine';
    }

    // Get department information
    getDepartmentInfo(departmentName) {
        return this.departmentMap[departmentName] || {
            description: 'General medical care',
            keywords: [],
            symptoms: []
        };
    }

    // Get recommended doctors
    getRecommendedDoctors(department, location) {
        const allDoctors = getDoctorsByLocation(location);
        const deptDoctors = allDoctors.filter(doc => doc.department === department);

        // Sort by rating and distance
        return deptDoctors.sort((a, b) => {
            const ratingDiff = b.rating - a.rating;
            if (ratingDiff !== 0) return ratingDiff;
            return a.distance - b.distance;
        });
    }

    // Validate location exists in database
    isLocationAvailable(location) {
        const normalizedLocation = location.toLowerCase();
        return Object.keys(doctorsDatabase).includes(normalizedLocation);
    }

    // Get available locations
    getAvailableLocations() {
        return Object.keys(doctorsDatabase).map(loc => 
            loc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        );
    }
}

// Initialize symptom matcher
const symptomMatcher = new SymptomMatcher();

// Sample consultation history for demonstration
class ConsultationHistory {
    constructor() {
        this.consultations = this.loadConsultations();
    }

    loadConsultations() {
        const stored = localStorage.getItem('consultationHistory');
        return stored ? JSON.parse(stored) : [];
    }

    saveConsultations() {
        localStorage.setItem('consultationHistory', JSON.stringify(this.consultations));
    }

    addConsultation(consultation) {
        consultation.id = Date.now().toString();
        consultation.date = new Date().toISOString();
        this.consultations.push(consultation);
        this.saveConsultations();
        return consultation;
    }

    getConsultations() {
        return this.consultations;
    }

    formatConsultationCard(consultation) {
        const date = new Date(consultation.date);
        const dateStr = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });

        return `
            <div class="appointment-card">
                <h3>👨‍⚕️ ${consultation.doctorName}</h3>
                <div class="appointment-detail">
                    <strong>Department</strong>
                    <span>${consultation.department}</span>
                </div>
                <div class="appointment-detail">
                    <strong>Hospital</strong>
                    <span>${consultation.hospital}</span>
                </div>
                <div class="appointment-detail">
                    <strong>Date</strong>
                    <span>${consultation.appointmentDate}</span>
                </div>
                <div class="appointment-detail">
                    <strong>Time</strong>
                    <span>${consultation.appointmentTime}</span>
                </div>
                <div class="appointment-detail">
                    <strong>Symptoms</strong>
                    <span>${consultation.symptoms}</span>
                </div>
                <div class="appointment-detail">
                    <strong>Booked On</strong>
                    <span>${dateStr}</span>
                </div>
                <span class="appointment-status ${consultation.status === 'upcoming' ? 'status-upcoming' : 'status-completed'}">
                    ${consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
                </span>
            </div>
        `;
    }
}

// Initialize consultation history
const consultationHistory = new ConsultationHistory();
