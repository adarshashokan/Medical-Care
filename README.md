# MediCare - Medical Consultation & Doctor Finder

A modern web application for medical consultations that helps patients find the right doctors and specialties based on their symptoms, with integrated medicine reminder system.

## 🎯 Features

### 1. **Symptom-Based Doctor Recommendation**
   - Input patient details (name, age, gender, location)
   - Describe symptoms and duration
   - AI-powered symptom matcher recommends appropriate medical departments
   - Lists doctors in your locality with ratings, experience, and availability

### 2. **Doctor & Clinic Search**
   - Find doctors by location (New York, Mumbai, Los Angeles, London, Singapore)
   - Filter by specialty and department
   - View doctor ratings, experience, consultation fees
   - See distance from your location
   - Check real-time availability

### 3. **Appointment Booking**
   - Select preferred date and time
   - Automatic confirmation with doctor details
   - Appointment history tracking
   - View past and upcoming appointments

### 4. **Medicine Reminder System**
   - Add medicine reminders with dosage and frequency
   - Set specific reminder times
   - Browser notifications for reminder alerts
   - Track medicine duration with start and end dates
   - Delete completed or discontinued medicines

### 5. **Consultation History**
   - View all past appointments
   - Track consultation details
   - Status updates (Upcoming/Completed)
   - Export history as JSON

## 📁 Project Structure

```
medicine/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Complete styling (responsive design)
├── js/
│   ├── app.js             # Main application logic
│   ├── data.js            # Doctors and clinic database
│   ├── reminder.js        # Medicine reminder manager
│   └── symptomMatcher.js  # Symptom to department matcher
├── assets/                # Placeholder for images/media
├── data/                  # Placeholder for data files
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build tools required
- No backend server needed (works offline with localStorage)

### How to Run

1. **Open in Browser**
   - Simply open `index.html` directly in your web browser
   - File protocol works fine: `file:///path/to/medicine/index.html`

2. **With Local Server (Recommended)**
   - Using Python 3: `python -m http.server 8000`
   - Using Python 2: `python -m SimpleHTTPServer 8000`
   - Using Node.js: `npx http-server`
   - Open `http://localhost:8000` in your browser

3. **Deploy Online**
   - Deploy to GitHub Pages, Netlify, or any static hosting
   - No backend modifications needed

## 📋 Available Locations & Doctors

The application includes comprehensive doctor data for:

### **New York** 🗽
- Dr. James Wilson (Cardiology)
- Dr. Sarah Johnson (General/Family Medicine)
- Dr. Michael Chen (Orthopedics)

### **Mumbai** 🇮🇳
- Dr. Rajesh Kumar (General/Family Medicine)
- Dr. Priya Sharma (Gynecology)
- Dr. Amit Patel (Cardiology)
- Dr. Neha Desai (Neurology)

### **Los Angeles** 🌴
- Dr. Patricia Martinez (Dermatology)
- Dr. David Kim (Orthopedics)
- Dr. Emily Rodriguez (Pulmonology)

### **London** 🇬🇧
- Dr. Christopher Brook (Cardiology)
- Dr. Anna Thompson (General/Family Medicine)
- Dr. Marcus Johnson (Psychiatry)

### **Singapore** 🇸🇬
- Dr. Lee Wei Ming (General/Family Medicine)
- Dr. Priya Kapoor (Pediatrics)
- Dr. Thomas Ng (ENT)

## 🏥 Medical Departments Supported

1. **General/Family Medicine** - For common illnesses and preventive care
2. **Cardiology** - Heart and cardiovascular conditions
3. **Orthopedics** - Bone and joint disorders
4. **Neurology** - Brain and nervous system conditions
5. **Dermatology** - Skin and hair conditions
6. **Gastroenterology** - Digestive system disorders
7. **ENT (Otolaryngology)** - Ear, nose, and throat
8. **Pulmonology** - Respiratory and lung conditions
9. **Urology** - Urinary and reproductive system
10. **Gynecology** - Women's reproductive health
11. **Pediatrics** - Children's health
12. **Psychiatry** - Mental health and psychology

## 💊 Key Features Explained

### Symptom Matcher
- Automatically analyzes symptoms entered by patient
- Uses keyword matching and relevance scoring
- Recommends most appropriate department
- Provides department description and guidelines

### Doctor Recommendation
- Sorts doctors by:
  - Rating (highest first)
  - Distance (closest first)
  - Experience (years of practice)
  - Consultation fees

### Medicine Reminders
- **Frequency Options**: Once Daily, Twice Daily, Three Times Daily, As Needed
- **Browser Notifications**: Alerts when it's time to take medicine
- **Duration Tracking**: Set medicine start and end dates
- **Status**: Active, Not Started, or Completed

### Data Persistence
- All data stored in browser's localStorage
- Survives page refreshes
- Manual export/import available
- No account creation needed

## 🎨 Design Features

### Responsive Design
- Mobile-friendly layout
- Works on tablets and desktops
- Optimized for all screen sizes
- Touch-friendly buttons and inputs

### Modern UI
- Gradient backgrounds and smooth transitions
- Card-based layout for better organization
- Color-coded status indicators
- Smooth scroll animations
- Professional typography

### Accessibility
- Semantic HTML structure
- Proper form labels
- Clear visual hierarchy
- High contrast colors
- Keyboard navigation support

## 📱 Browser Notifications

### How to Enable
1. When you open the app, grant notification permission
2. Reminders will alert you at scheduled times
3. Click notification to bring app to focus

### Notification Frequency
- Check reminders every minute
- Alert within 5 minutes of scheduled time
- Works even if app is running in background

## 💾 Data Storage

### localStorage Keys Used
- `medicineReminders` - All medicine reminders
- `consultationHistory` - All booked appointments

### Clear Data
```javascript
// Open browser console (F12) and run:
localStorage.clear(); // Clears all data
location.reload(); // Refresh the page
```

## 🔒 Privacy & Security

- ✅ No data sent to servers
- ✅ All information stored locally on your device
- ✅ No login or registration required
- ✅ No cookies or trackers
- ✅ HIPAA-friendly for personal use

## 🛠️ Customization

### Add New Doctors
Edit `js/data.js` and add to `doctorsDatabase`:
```javascript
'your-city': [
    {
        id: 100,
        name: 'Dr. Your Name',
        department: 'Your Department',
        hospital: 'Your Hospital',
        experience: 10,
        rating: 4.8,
        distance: 2.5,
        phone: '(123) 456-7890',
        availableSlots: ['09:00', '14:00'],
        fees: 150
    }
]
```

### Add New Departments
Edit `js/symptomMatcher.js` and add to `departmentSymptomMap`:
```javascript
'Your Department': {
    symptoms: ['symptom1', 'symptom2'],
    keywords: ['keyword1', 'keyword2'],
    description: 'Department description'
}
```

### Modify Styles
Edit `css/styles.css` to customize:
- Colors (CSS variables at top)
- Fonts and typography
- Layout and spacing
- Animations and transitions

## 🐛 Troubleshooting

### Doctors Not Showing
- Check if location spelling matches exactly
- Available locations: New York, Mumbai, Los Angeles, London, Singapore
- Location names are case-insensitive

### Reminders Not Notifying
- Grant browser notification permission
- Check reminder time is set correctly
- Browser must be open for notifications
- Check browser notification settings

### Data Not Saving
- Ensure localStorage is enabled in browser
- Check browser privacy settings
- Clear browser cache if having issues
- Try a different browser

## 📞 Support

For bugs, feature requests, or questions, please document:
- What you were trying to do
- What happened instead
- Your browser and OS
- Steps to reproduce

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Disclaimer

**IMPORTANT**: This application is for informational purposes only and should NOT replace professional medical advice. Always:
- Consult qualified healthcare professionals
- Do not self-diagnose based on symptoms
- Follow doctor's recommendations strictly
- Seek emergency care for serious symptoms
- Maintain regular health checkups

---

**Version**: 2.0  
**Last Updated**: March 17, 2026  
**Status**: Production Ready ✅
