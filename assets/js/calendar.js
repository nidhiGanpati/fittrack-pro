/* ============================================
   FitTrack Pro - Workout Calendar
   Calendar View System
   ============================================ */

const WorkoutCalendar = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    workouts: [],
    container: null,
    
    init: function(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error('Calendar container not found');
            return;
        }
        
        this.loadWorkouts();
        this.render();
        this.setupEventListeners();
    },
    
    loadWorkouts: function() {
        if (!FitTrackApp.user) return;
        
        const data = Storage.get('fittrack_dashboard_' + FitTrackApp.user.id);
        this.workouts = data && data.workouts ? data.workouts : [];
    },
    
    render: function() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        
        let html = `
            <div class="calendar-header d-flex justify-content-between align-items-center mb-4">
                <button class="btn btn-outline-primary btn-sm" onclick="WorkoutCalendar.previousMonth()">
                    <i class="bi bi-chevron-left"></i> Previous
                </button>
                <h4 class="mb-0">${monthNames[this.currentMonth]} ${this.currentYear}</h4>
                <button class="btn btn-outline-primary btn-sm" onclick="WorkoutCalendar.nextMonth()">
                    Next <i class="bi bi-chevron-right"></i>
                </button>
            </div>
            
            <div class="calendar-grid">
                <div class="calendar-row">
                    <div class="calendar-day-header">Sun</div>
                    <div class="calendar-day-header">Mon</div>
                    <div class="calendar-day-header">Tue</div>
                    <div class="calendar-day-header">Wed</div>
                    <div class="calendar-day-header">Thu</div>
                    <div class="calendar-day-header">Fri</div>
                    <div class="calendar-day-header">Sat</div>
                </div>
        `;
        
        let dayCount = 1;
        for (let i = 0; i < 6; i++) {
            html += '<div class="calendar-row">';
            
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || dayCount > daysInMonth) {
                    html += '<div class="calendar-day empty"></div>';
                } else {
                    const workoutsOnDay = this.getWorkoutsForDay(dayCount);
                    const isToday = this.isToday(dayCount);
                    const hasWorkout = workoutsOnDay.length > 0;
                    
                    html += `
                        <div class="calendar-day ${isToday ? 'today' : ''} ${hasWorkout ? 'has-workout' : ''}" 
                             onclick="WorkoutCalendar.showDayDetails(${dayCount})">
                            <div class="day-number">${dayCount}</div>
                            ${hasWorkout ? `<div class="workout-indicator">${workoutsOnDay.length}</div>` : ''}
                        </div>
                    `;
                    dayCount++;
                }
            }
            
            html += '</div>';
            
            if (dayCount > daysInMonth) break;
        }
        
        html += '</div>';
        
        this.container.innerHTML = html;
    },
    
    getWorkoutsForDay: function(day) {
        const targetDate = new Date(this.currentYear, this.currentMonth, day);
        
        return this.workouts.filter(workout => {
            const workoutDate = new Date(workout.date);
            return workoutDate.getDate() === day &&
                   workoutDate.getMonth() === this.currentMonth &&
                   workoutDate.getFullYear() === this.currentYear;
        });
    },
    
    isToday: function(day) {
        const today = new Date();
        return day === today.getDate() &&
               this.currentMonth === today.getMonth() &&
               this.currentYear === today.getFullYear();
    },
    
    showDayDetails: function(day) {
        const workouts = this.getWorkoutsForDay(day);
        const date = new Date(this.currentYear, this.currentMonth, day);
        const dateStr = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        let message = `📅 ${dateStr}\n\n`;
        
        if (workouts.length === 0) {
            message += 'No workouts on this day.\n\n';
            message += 'Would you like to log a workout?';
        } else {
            message += `🏋️ ${workouts.length} Workout${workouts.length > 1 ? 's' : ''}:\n\n`;
            workouts.forEach((workout, index) => {
                message += `${index + 1}. ${workout.type}\n`;
                message += `   Duration: ${workout.duration} min | Calories: ${workout.calories}\n`;
                if (workout.notes) {
                    message += `   Notes: ${workout.notes}\n`;
                }
                message += '\n';
            });
        }
        
        if (confirm(message)) {
            if (workouts.length === 0) {
                openLogWorkoutModal();
            }
        }
    },
    
    previousMonth: function() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.render();
    },
    
    nextMonth: function() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.render();
    },
    
    setupEventListeners: function() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.previousMonth();
            if (e.key === 'ArrowRight') this.nextMonth();
        });
    }
};

window.WorkoutCalendar = WorkoutCalendar;
console.log('📅 Calendar Module Loaded');