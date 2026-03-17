// Main Application Logic
let selectedDoctorId = null;
let selectedDoctorName = null;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadConsultationHistory();
    loadReminders();
    setMinimumDates();
});

// Initialize all event listeners
function initializeEventListeners() {
    // Consultation form submission
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', handleConsultationSubmit);
    }

    // Reminder form submission
    const reminderForm = document.getElementById('reminderForm');
    if (reminderForm) {
        reminderForm.addEventListener('submit', handleReminderSubmit);
    }

    // Appointment booking form
    const bookAppointmentForm = document.getElementById('bookAppointmentForm');
    if (bookAppointmentForm) {
        bookAppointmentForm.addEventListener('submit', handleAppointmentSubmit);
    }
}

// Handle consultation form submission
function handleConsultationSubmit(e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const location = document.getElementById('location').value.trim();
    const symptoms = document.getElementById('symptoms').value.trim();
    const duration = document.getElementById('duration').value;
    const medications = document.getElementById('medications').value.trim();

    // Validate inputs
    if (!fullName || !age || !gender || !location || !symptoms) {
        alert('Please fill in all required fields');
        return;
    }

    // Check if location is available in our database
    if (!symptomMatcher.isLocationAvailable(location)) {
        const availableLocations = symptomMatcher.getAvailableLocations().join(', ');
        alert(`Location not available. Available cities: ${availableLocations}`);
        return;
    }

    // Match symptoms to department
    const recommendedDepartment = symptomMatcher.matchSymptomsToDepartment(symptoms);
    const deptInfo = symptomMatcher.getDepartmentInfo(recommendedDepartment);

    // Get recommended doctors
    const recommendedDoctors = symptomMatcher.getRecommendedDoctors(recommendedDepartment, location);

    // Display results
    displayResults(recommendedDepartment, deptInfo, recommendedDoctors, symptoms, location);

    // Scroll to results
    document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
}

// Display consultation results
function displayResults(department, deptInfo, doctors, symptoms, location) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('hidden');

    // Update department information
    document.getElementById('departmentName').textContent = department;
    document.getElementById('departmentDescription').textContent = deptInfo.description;

    // Display doctors list
    const doctorsList = document.getElementById('doctorsList');
    if (doctors.length > 0) {
        doctorsList.innerHTML = doctors.map(doc => formatDoctorCard(doc)).join('');
    } else {
        // Show alternative doctors from nearby departments
        doctorsList.innerHTML = `
            <div class="empty-state">
                <h3>No doctors available in ${location}</h3>
                <p>Please try another location or contact us for referrals.</p>
            </div>
        `;
    }

    // Hide appointment form initially
    document.getElementById('appointmentForm').classList.add('hidden');
}

// Select a doctor for appointment
function selectDoctor(doctorId, doctorName) {
    selectedDoctorId = doctorId;
    selectedDoctorName = doctorName;
    document.getElementById('appointmentForm').classList.remove('hidden');
    document.getElementById('appointmentForm').scrollIntoView({ behavior: 'smooth' });
}

// Handle appointment booking
function handleAppointmentSubmit(e) {
    e.preventDefault();

    if (!selectedDoctorId) {
        alert('Please select a doctor first');
        return;
    }

    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;

    if (!appointmentDate || !appointmentTime) {
        alert('Please select date and time');
        return;
    }

    // Create appointment record
    const appointment = {
        id: selectedDoctorId,
        doctorName: selectedDoctorName,
        appointmentDate: new Date(appointmentDate).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        }),
        appointmentTime: appointmentTime,
        status: 'upcoming',
        symptoms: document.getElementById('symptoms').value,
        department: document.getElementById('departmentName').textContent,
        hospital: 'Hospital Name' // Will be populated from doctor data
    };

    // Save appointment to history
    consultationHistory.addConsultation(appointment);

    // Show success message
    alert(`✅ Appointment booked successfully!\n\nDoctor: ${selectedDoctorName}\nDate: ${appointment.appointmentDate}\nTime: ${appointmentTime}\n\nYou will receive a confirmation SMS shortly.`);

    // Reset form
    document.getElementById('consultationForm').reset();
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('appointmentForm').classList.add('hidden');

    // Reload appointment history
    loadConsultationHistory();
}

// Handle medicine reminder submission
function handleReminderSubmit(e) {
    e.preventDefault();

    const medicineName = document.getElementById('medicineName').value.trim();
    const dosage = document.getElementById('dosage').value.trim();
    const frequency = document.getElementById('frequency').value;
    const reminderTime = document.getElementById('reminderTime').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!medicineName || !dosage || !frequency || !reminderTime || !startDate) {
        alert('Please fill in all required fields');
        return;
    }

    // Create reminder object
    const reminder = {
        medicineName,
        dosage,
        frequency,
        reminderTime,
        startDate,
        endDate: endDate || null
    };

    // Add reminder using reminder manager
    reminderManager.addReminder(reminder);

    // Show success message
    alert(`✅ Medicine reminder added!\n\n${medicineName} - ${dosage}\nFrequency: ${frequency}\nReminder at: ${reminderTime}`);

    // Reset form
    document.getElementById('reminderForm').reset();

    // Reload reminders
    loadReminders();
}

// Load and display consultation history
function loadConsultationHistory() {
    const consultations = consultationHistory.getConsultations();
    const container = document.getElementById('appointmentsContainer');

    if (consultations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No appointments yet</h3>
                <p>Get a consultation to book your first appointment.</p>
            </div>
        `;
    } else {
        container.innerHTML = consultations
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(consultation => consultationHistory.formatConsultationCard(consultation))
            .join('');
    }
}

// Load and display reminders
function loadReminders() {
    const reminders = reminderManager.getReminderDisplay();
    const container = document.getElementById('remindersContainer');

    if (reminders.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>No medicine reminders set</h3>
                <p>Add a reminder above to get started.</p>
            </div>
        `;
    } else {
        container.innerHTML = reminders
            .map(reminder => reminderManager.formatReminderCard(reminder))
            .join('');
    }
}

// Remove reminder
function removeReminder(reminderId) {
    if (confirm('Are you sure you want to delete this reminder?')) {
        reminderManager.removeReminder(reminderId);
        loadReminders();
        alert('Reminder deleted successfully');
    }
}

// Show section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Reload data when section is shown
        if (sectionId === 'history') {
            loadConsultationHistory();
        } else if (sectionId === 'reminders') {
            loadReminders();
        }
    }
}

// Set minimum dates for date inputs
function setMinimumDates() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    // Set minimum date for appointment
    const appointmentDateInput = document.getElementById('appointmentDate');
    if (appointmentDateInput) {
        appointmentDateInput.setAttribute('min', todayString);
    }

    // Set minimum date for reminder start date
    const startDateInput = document.getElementById('startDate');
    if (startDateInput) {
        startDateInput.setAttribute('min', todayString);
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `${type}-message`;
    alertDiv.textContent = message;
    document.body.prepend(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Export data functionality
function exportAppointments() {
    const consultations = consultationHistory.getConsultations();
    const dataStr = JSON.stringify(consultations, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'medical_appointments.json';
    link.click();
}

function exportReminders() {
    const reminders = reminderManager.getReminderDisplay();
    const dataStr = JSON.stringify(reminders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'medicine_reminders.json';
    link.click();
}
