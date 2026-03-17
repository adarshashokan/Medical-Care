// Department to Symptoms Mapping
const departmentSymptomMap = {
    'General/Family Medicine': {
        symptoms: ['fever', 'cold', 'cough', 'general checkup', 'diet', 'fatigue'],
        keywords: ['general', 'fever', 'cold', 'fatigue', 'checkup'],
        description: 'General medicine for common illnesses and preventive health care'
    },
    'Cardiology': {
        symptoms: ['chest pain', 'heart palpitations', 'heart disease', 'blood pressure', 'breathlessness'],
        keywords: ['heart', 'chest', 'cardiac', 'blood pressure', 'palpitations'],
        description: 'Specialist care for heart and cardiovascular conditions'
    },
    'Orthopedics': {
        symptoms: ['bone fracture', 'joint pain', 'back pain', 'arthritis', 'knee pain', 'shoulder pain'],
        keywords: ['bone', 'fracture', 'joint', 'arthritis', 'orthopedic'],
        description: 'Treatment for bone, joint, and musculoskeletal disorders'
    },
    'Neurology': {
        symptoms: ['headache', 'migraine', 'dizziness', 'numbness', 'seizure', 'stroke', 'tremor'],
        keywords: ['headache', 'migraine', 'dizziness', 'neurological', 'brain'],
        description: 'Specialist care for nervous system and brain disorders'
    },
    'Dermatology': {
        symptoms: ['skin rash', 'acne', 'eczema', 'psoriasis', 'hair loss', 'fungal infection'],
        keywords: ['skin', 'rash', 'acne', 'dermatology', 'eczema'],
        description: 'Treatment for skin, hair, and nail conditions'
    },
    'Gastroenterology': {
        symptoms: ['stomach pain', 'diarrhea', 'constipation', 'acid reflux', 'nausea', 'vomiting'],
        keywords: ['stomach', 'diarrhea', 'gastric', 'digestive'],
        description: 'Specialist care for digestive system conditions'
    },
    'ENT (Otolaryngology)': {
        symptoms: ['ear pain', 'sore throat', 'sinusitis', 'hearing loss', 'throat infection'],
        keywords: ['ear', 'throat', 'nose', 'sinusitis', 'ent'],
        description: 'Treatment for ear, nose, and throat conditions'
    },
    'Pulmonology': {
        symptoms: ['persistent cough', 'asthma', 'breathing difficulty', 'lung infection', 'bronchitis'],
        keywords: ['cough', 'asthma', 'lung', 'respiratory', 'breathing'],
        description: 'Specialist care for respiratory and lung conditions'
    },
    'Urology': {
        symptoms: ['urinary problems', 'kidney stones', 'prostate issues', 'urinary tract infection'],
        keywords: ['urinary', 'kidney', 'prostate', 'urology'],
        description: 'Treatment for urinary and male reproductive system conditions'
    },
    'Gynecology': {
        symptoms: ['menstrual problems', 'pregnancy', 'pelvic pain', 'contraception', 'womens health'],
        keywords: ['menstrual', 'pregnancy', 'gynecology', 'womens'],
        description: 'Specialist care for womens reproductive health'
    },
    'Pediatrics': {
        symptoms: ['child fever', 'childhood illness', 'vaccination', 'growth', 'dental'],
        keywords: ['child', 'baby', 'pediatric', 'infant', 'toddler'],
        description: 'Medical care for infants, children, and adolescents'
    },
    'Psychiatry': {
        symptoms: ['anxiety', 'depression', 'stress', 'insomnia', 'mental health'],
        keywords: ['anxiety', 'depression', 'mental health', 'psychiatry', 'stress'],
        description: 'Mental health and psychiatric care'
    }
};

// Sample Doctors Data by Location
const doctorsDatabase = {
    'new york': [
        {
            id: 1,
            name: 'Dr. James Wilson',
            department: 'Cardiology',
            specialization: 'Interventional Cardiology',
            hospital: 'Manhattan Heart Hospital',
            experience: 15,
            rating: 4.8,
            distance: 2.3,
            phone: '(212) 555-0101',
            availableSlots: ['09:00', '10:30', '14:00', '15:45'],
            fees: 150
        },
        {
            id: 2,
            name: 'Dr. Sarah Johnson',
            department: 'General/Family Medicine',
            specialization: 'Internal Medicine',
            hospital: 'NYC Health Center',
            experience: 12,
            rating: 4.7,
            distance: 1.5,
            phone: '(212) 555-0102',
            availableSlots: ['08:00', '11:00', '13:30', '16:00'],
            fees: 100
        },
        {
            id: 3,
            name: 'Dr. Michael Chen',
            department: 'Orthopedics',
            specialization: 'Sports Medicine',
            hospital: 'Sports Injury Center',
            experience: 18,
            rating: 4.9,
            distance: 3.1,
            phone: '(212) 555-0103',
            availableSlots: ['09:30', '13:45', '15:15'],
            fees: 120
        }
    ],
    'mumbai': [
        {
            id: 4,
            name: 'Dr. Rajesh Kumar',
            department: 'General/Family Medicine',
            specialization: 'Family Medicine',
            hospital: 'Apollo Hospital Mumbai',
            experience: 20,
            rating: 4.8,
            distance: 2.0,
            phone: '(22) 6789-0101',
            availableSlots: ['08:00', '10:00', '14:00', '16:30'],
            fees: 80
        },
        {
            id: 5,
            name: 'Dr. Priya Sharma',
            department: 'Gynecology',
            specialization: 'Obstetrics',
            hospital: 'Mumbai Women Health Clinic',
            experience: 16,
            rating: 4.9,
            distance: 1.8,
            phone: '(22) 6789-0102',
            availableSlots: ['09:00', '11:30', '15:00'],
            fees: 100
        },
        {
            id: 6,
            name: 'Dr. Amit Patel',
            department: 'Cardiology',
            specialization: 'Preventive Cardiology',
            hospital: 'Heart Care Institute',
            experience: 19,
            rating: 4.7,
            distance: 2.5,
            phone: '(22) 6789-0103',
            availableSlots: ['10:00', '14:30'],
            fees: 120
        },
        {
            id: 7,
            name: 'Dr. Neha Desai',
            department: 'Neurology',
            specialization: 'Headache Disorders',
            hospital: 'Neuro Center Mumbai',
            experience: 14,
            rating: 4.6,
            distance: 3.2,
            phone: '(22) 6789-0104',
            availableSlots: ['09:30', '13:00', '16:45'],
            fees: 110
        }
    ],
    'los angeles': [
        {
            id: 8,
            name: 'Dr. Patricia Martinez',
            department: 'Dermatology',
            specialization: 'Cosmetic Dermatology',
            hospital: 'LA Skin Clinic',
            experience: 13,
            rating: 4.8,
            distance: 1.2,
            phone: '(213) 555-0201',
            availableSlots: ['10:00', '12:00', '14:30', '17:00'],
            fees: 130
        },
        {
            id: 9,
            name: 'Dr. David Kim',
            department: 'Orthopedics',
            specialization: 'Joint Replacement',
            hospital: 'California Orthopedic Center',
            experience: 17,
            rating: 4.9,
            distance: 2.8,
            phone: '(213) 555-0202',
            availableSlots: ['08:30', '13:00', '15:30'],
            fees: 140
        },
        {
            id: 10,
            name: 'Dr. Emily Rodriguez',
            department: 'Pulmonology',
            specialization: 'Asthma Management',
            hospital: 'Respiratory Health LA',
            experience: 11,
            rating: 4.7,
            distance: 1.9,
            phone: '(213) 555-0203',
            availableSlots: ['09:00', '11:30', '14:00', '16:00'],
            fees: 115
        }
    ],
    'london': [
        {
            id: 11,
            name: 'Dr. Christopher Brook',
            department: 'Cardiology',
            specialization: 'Cardiac Surgery',
            hospital: 'Royal Heart London',
            experience: 22,
            rating: 4.9,
            distance: 1.1,
            phone: '(20) 7946-0101',
            availableSlots: ['09:00', '10:30', '13:45', '15:00'],
            fees: 160
        },
        {
            id: 12,
            name: 'Dr. Anna Thompson',
            department: 'General/Family Medicine',
            specialization: 'Preventive Medicine',
            hospital: 'Central London Health',
            experience: 14,
            rating: 4.8,
            distance: 0.8,
            phone: '(20) 7946-0102',
            availableSlots: ['08:00', '10:00', '12:30', '14:30', '16:00'],
            fees: 110
        },
        {
            id: 13,
            name: 'Dr. Marcus Johnson',
            department: 'Psychiatry',
            specialization: 'Clinical Psychology',
            hospital: 'Mental Health Clinic London',
            experience: 16,
            rating: 4.7,
            distance: 2.5,
            phone: '(20) 7946-0103',
            availableSlots: ['10:00', '14:00', '16:00'],
            fees: 125
        }
    ],
    'singapore': [
        {
            id: 14,
            name: 'Dr. Lee Wei Ming',
            department: 'General/Family Medicine',
            specialization: 'Family Medicine',
            hospital: 'Singapore Health Clinic',
            experience: 15,
            rating: 4.8,
            distance: 1.5,
            phone: '(65) 6789-0101',
            availableSlots: ['08:00', '09:30', '13:00', '15:30'],
            fees: 90
        },
        {
            id: 15,
            name: 'Dr. Priya Kapoor',
            department: 'Pediatrics',
            specialization: 'Child Development',
            hospital: 'Children Health Singapore',
            experience: 12,
            rating: 4.9,
            distance: 2.0,
            phone: '(65) 6789-0102',
            availableSlots: ['09:00', '11:00', '14:30', '16:00'],
            fees: 85
        },
        {
            id: 16,
            name: 'Dr. Thomas Ng',
            department: 'ENT (Otolaryngology)',
            specialization: 'Audiology',
            hospital: 'Ear Institute Singapore',
            experience: 16,
            rating: 4.7,
            distance: 1.8,
            phone: '(65) 6789-0103',
            availableSlots: ['10:00', '12:00', '15:00'],
            fees: 100
        }
    ]
};

// Function to get doctors based on location and department
function getDoctorsByLocationAndDepartment(location, department) {
    const normalizedLocation = location.toLowerCase();
    const doctors = doctorsDatabase[normalizedLocation] || [];
    return doctors.filter(doc => doc.department === department);
}

// Function to get all doctors in a location
function getDoctorsByLocation(location) {
    const normalizedLocation = location.toLowerCase();
    return doctorsDatabase[normalizedLocation] || [];
}

// Function to format doctor details for display
function formatDoctorCard(doctor) {
    return `
        <div class="doctor-card">
            <h3>👨‍⚕️ ${doctor.name}</h3>
            <div class="doctor-info">
                <strong>Specialty:</strong> ${doctor.specialization}
            </div>
            <div class="doctor-info">
                <strong>Hospital:</strong> ${doctor.hospital}
            </div>
            <div class="doctor-info">
                <strong>Experience:</strong> ${doctor.experience} years
            </div>
            <div class="doctor-info">
                <strong>Consultation Fee:</strong> $${doctor.fees}
            </div>
            <div class="doctor-info">
                <strong>Phone:</strong> ${doctor.phone}
            </div>
            <div class="rating">⭐ ${doctor.rating}/5.0 (Verified)</div>
            <span class="distance">📍 ${doctor.distance} km away</span>
            <span class="availability">✅ Available Today</span>
            <button class="btn btn-primary btn-small" onclick="selectDoctor('${doctor.id}', '${doctor.name}')">
                Schedule Appointment
            </button>
        </div>
    `;
}
