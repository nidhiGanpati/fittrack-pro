/* ============================================
   FitTrack Pro - Dashboard JavaScript
   ============================================ */

const DashboardData = {
    workouts: [],
    stats: {
        totalWorkouts: 42,
        caloriesBurned: 8540,
        activeMinutes: 1260,
        currentStreak: 7
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('📊 Initializing Dashboard...');
    
    if (!FitTrackApp.user) {
        window.location.href = 'index.html';
        return;
    }
    
    loadDashboardData();
    initializeDashboardStats();
    initializeCharts();
    initializeWorkoutLog();
    initializeQuickActions();
    
    console.log('✅ Dashboard Initialized');
});

function loadDashboardData() {
    const saved = Storage.get('fittrack_dashboard_' + FitTrackApp.user.id);
    if (saved) {
        DashboardData.workouts = saved.workouts || [];
        DashboardData.stats = saved.stats || DashboardData.stats;
    } else {
        initializeDemoData();
    }
}

function saveDashboardData() {
    Storage.set('fittrack_dashboard_' + FitTrackApp.user.id, {
        workouts: DashboardData.workouts,
        stats: DashboardData.stats,
        lastUpdated: new Date().toISOString()
    });
}

function initializeDemoData() {
    DashboardData.workouts = [
        {
            id: 1,
            date: new Date().toISOString(),
            type: 'Running',
            duration: 30,
            calories: 320,
            notes: 'Morning run'
        },
        {
            id: 2,
            date: new Date(Date.now() - 86400000).toISOString(),
            type: 'Strength Training',
            duration: 45,
            calories: 280,
            notes: 'Upper body'
        },
        {
            id: 3,
            date: new Date(Date.now() - 172800000).toISOString(),
            type: 'Yoga',
            duration: 60,
            calories: 180,
            notes: 'Relaxing flow'
        }
    ];
    saveDashboardData();
}

function initializeDashboardStats() {
    document.getElementById('totalWorkouts').textContent = DashboardData.stats.totalWorkouts;
    document.getElementById('caloriesBurned').textContent = NumberUtils.formatNumber(DashboardData.stats.caloriesBurned);
    document.getElementById('activeMinutes').textContent = NumberUtils.formatNumber(DashboardData.stats.activeMinutes);
    document.getElementById('currentStreak').textContent = DashboardData.stats.currentStreak;
}

function initializeCharts() {
    const weeklyCtx = document.getElementById('weeklyProgressChart');
    if (weeklyCtx && typeof Chart !== 'undefined') {
        new Chart(weeklyCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Calories Burned',
                    data: [320, 450, 380, 420, 520, 290, 410],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
    
    const distributionCtx = document.getElementById('workoutDistributionChart');
    if (distributionCtx && typeof Chart !== 'undefined') {
        new Chart(distributionCtx, {
            type: 'doughnut',
            data: {
                labels: ['Running', 'Strength', 'Yoga', 'Cycling'],
                datasets: [{
                    data: [35, 30, 20, 15],
                    backgroundColor: ['#6366f1', '#8b5cf6', '#10b981', '#f59e0b']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }
}

function initializeWorkoutLog() {
    const container = document.getElementById('workoutLog');
    if (!container) return;
    
    if (DashboardData.workouts.length === 0) {
        container.innerHTML = '<p class="text-center text-muted py-4">No workouts logged yet</p>';
        return;
    }
    
    let html = '';
    DashboardData.workouts.slice(0, 5).forEach(workout => {
        html += `
            <div class="d-flex align-items-center justify-content-between p-3 mb-2 bg-light rounded-3">
                <div>
                    <h6 class="mb-0">${workout.type}</h6>
                    <small class="text-muted">${DateUtils.getRelativeTime(workout.date)}</small>
                </div>
                <div>
                    <span class="badge bg-primary">${workout.duration} min</span>
                    <span class="badge bg-success ms-1">${workout.calories} cal</span>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function initializeQuickActions() {
    const container = document.getElementById('quickActions');
    if (!container) return;
    
    const actions = [
        { icon: 'plus-circle', title: 'Log Workout', action: 'openLogWorkoutModal()' },
        { icon: 'trophy', title: 'Set Goal', action: 'openSetGoalModal()' },
        { icon: 'graph-up', title: 'View Progress', action: 'navigateToProgress()' },
        { icon: 'calendar-check', title: 'Schedule', action: 'openScheduleModal()' }
    ];
    
    let html = '';
    actions.forEach(action => {
        html += `
            <div class="col-md-3 col-sm-6 mb-3">
                <div class="card p-4 text-center h-100" style="cursor: pointer; transition: all 0.3s;" 
                     onmouseover="this.style.transform='translateY(-5px)'" 
                     onmouseout="this.style.transform='translateY(0)'"
                     onclick="${action.action}">
                    <i class="bi bi-${action.icon} fs-1 text-primary mb-3"></i>
                    <h6 class="mb-0">${action.title}</h6>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function openLogWorkoutModal() {
    showNotification('Log Workout feature - Click the form to add a workout!', 'info');
}

function openSetGoalModal() {
    showNotification('Set Goal feature coming soon!', 'info');
}

function navigateToProgress() {
    window.location.href = 'progress.html';
}

function openScheduleModal() {
    showNotification('Schedule feature coming soon!', 'info');
}

// Export button functions
function exportJSON() {
    DataExport.exportToJSON(DashboardData.workouts, 'workouts');
}

function exportCSV() {
    DataExport.exportToCSV(DashboardData.workouts);
}

function exportExcel() {
    DataExport.exportToExcel(DashboardData.workouts);
}

function exportBackup() {
    DataExport.exportFullBackup();
}

function triggerImport() {
    document.getElementById('importFile').click();
}

function printSummary() {
    ReportGenerator.generateWorkoutReport(DashboardData.workouts, 'summary');
}

function printDetailed() {
    ReportGenerator.generateWorkoutReport(DashboardData.workouts, 'detailed');
}

function clearCache() {
    CacheManager.clear();
}

function showCacheStats() {
    const stats = CacheManager.getStats();
    alert(`📊 Cache Statistics\n\nCached Items: ${stats.count}\nKeys: ${stats.keys.join(', ') || 'None'}`);
}

window.openLogWorkoutModal = openLogWorkoutModal;
window.openSetGoalModal = openSetGoalModal;
window.navigateToProgress = navigateToProgress;
window.openScheduleModal = openScheduleModal;
window.exportJSON = exportJSON;
window.exportCSV = exportCSV;
window.exportExcel = exportExcel;
window.exportBackup = exportBackup;
window.triggerImport = triggerImport;
window.printSummary = printSummary;
window.printDetailed = printDetailed;
window.clearCache = clearCache;
window.showCacheStats = showCacheStats;
window.DashboardData = DashboardData;

console.log('📊 Dashboard JS Loaded');