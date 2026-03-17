// Medicine Reminder System
class ReminderManager {
    constructor() {
        this.reminders = this.loadReminders();
        this.initializeReminders();
    }

    // Load reminders from localStorage
    loadReminders() {
        const stored = localStorage.getItem('medicineReminders');
        return stored ? JSON.parse(stored) : [];
    }

    // Save reminders to localStorage
    saveReminders() {
        localStorage.setItem('medicineReminders', JSON.stringify(this.reminders));
    }

    // Add a new reminder
    addReminder(reminder) {
        reminder.id = Date.now().toString();
        reminder.createdAt = new Date();
        reminder.isActive = true;
        this.reminders.push(reminder);
        this.saveReminders();
        return reminder;
    }

    // Remove a reminder
    removeReminder(reminderId) {
        this.reminders = this.reminders.filter(r => r.id !== reminderId);
        this.saveReminders();
    }

    // Get all active reminders
    getActiveReminders() {
        const today = new Date();
        return this.reminders.filter(reminder => {
            const startDate = new Date(reminder.startDate);
            const endDate = reminder.endDate ? new Date(reminder.endDate) : null;
            return startDate <= today && (!endDate || endDate >= today) && reminder.isActive;
        });
    }

    // Check if reminder should notify
    shouldNotifyNow(reminder) {
        const now = new Date();
        const [hours, minutes] = reminder.reminderTime.split(':');
        const reminderTime = new Date();
        reminderTime.setHours(parseInt(hours), parseInt(minutes), 0);

        // Check if current time is within 5 minutes of reminder time
        const diff = Math.abs(reminderTime - now);
        return diff <= 5 * 60 * 1000;
    }

    // Initialize reminder notifications
    initializeReminders() {
        // Check reminders every minute
        setInterval(() => {
            const activeReminders = this.getActiveReminders();
            activeReminders.forEach(reminder => {
                if (this.shouldNotifyNow(reminder)) {
                    this.sendNotification(reminder);
                }
            });
        }, 60000); // Check every minute
    }

    // Send notification (browser notification API)
    sendNotification(reminder) {
        if ('Notification' in window && Notification.permission === 'granted') {
            const notification = new Notification('💊 Medicine Reminder', {
                body: `Time to take ${reminder.medicineName} (${reminder.dosage})`,
                icon: '💊'
            });
            notification.onclick = () => window.focus();
        }
    }

    // Request notification permission
    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }

    // Get reminder display information
    getReminderDisplay() {
        return this.reminders.map(reminder => ({
            ...reminder,
            status: this.getReminderStatus(reminder),
            nextDue: this.getNextDueDate(reminder)
        }));
    }

    // Get reminder status
    getReminderStatus(reminder) {
        const today = new Date();
        const startDate = new Date(reminder.startDate);
        const endDate = reminder.endDate ? new Date(reminder.endDate) : null;

        if (startDate > today) {
            return 'Not Started';
        } else if (!reminder.isActive) {
            return 'Inactive';
        } else if (endDate && endDate < today) {
            return 'Completed';
        } else {
            return 'Active';
        }
    }

    // Get next due date
    getNextDueDate(reminder) {
        const today = new Date();
        const [hours, minutes] = reminder.reminderTime.split(':');
        const nextDue = new Date(today);
        nextDue.setHours(parseInt(hours), parseInt(minutes), 0);

        if (nextDue < today) {
            nextDue.setDate(nextDue.getDate() + 1);
        }

        return nextDue.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Format reminder details for display
    formatReminderCard(reminder) {
        const status = this.getReminderStatus(reminder);
        const statusClass = status === 'Active' ? 'success' : status === 'Completed' ? 'completed' : 'inactive';

        return `
            <div class="reminder-card">
                <h4>💊 ${reminder.medicineName}</h4>
                <div class="reminder-detail">
                    <strong>Dosage:</strong> ${reminder.dosage}
                </div>
                <div class="reminder-detail">
                    <strong>Frequency:</strong> ${reminder.frequency.replace(/_/g, ' ').toUpperCase()}
                </div>
                <div class="reminder-detail">
                    <strong>Time:</strong> ${reminder.reminderTime}
                </div>
                <div class="reminder-detail">
                    <strong>Duration:</strong> ${reminder.startDate} to ${reminder.endDate || 'Ongoing'}
                </div>
                <div class="reminder-detail">
                    <strong>Next Due:</strong> ${this.getNextDueDate(reminder)}
                </div>
                <span class="reminder-status">${status}</span>
                <button class="btn btn-danger btn-small" onclick="removeReminder('${reminder.id}')">
                    Delete Reminder
                </button>
            </div>
        `;
    }
}

// Initialize reminder manager
const reminderManager = new ReminderManager();

// Request notification permission on load
document.addEventListener('DOMContentLoaded', () => {
    reminderManager.requestNotificationPermission();
});
