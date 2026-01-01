/* ============================================
   FitTrack Pro - Main JavaScript
   Simple version - No authentication required
   ============================================ */

const FitTrackApp = {
    version: '1.0.0',
    user: {
        id: 1,
        name: 'Fitness User',
        email: 'user@fittrack.com'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 FitTrack Pro v' + FitTrackApp.version);
    
    updateUserInterface();
    initializeSmoothScroll();
    initializeScrollTop();
    
    console.log('✅ App Ready - No login required');
});

function updateUserInterface() {
    const nameElements = document.querySelectorAll('.user-name-display');
    nameElements.forEach(el => {
        el.textContent = FitTrackApp.user.name;
    });
    
    const emailElements = document.querySelectorAll('.user-email-display');
    emailElements.forEach(el => {
        el.textContent = FitTrackApp.user.email;
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

function initializeScrollTop() {
    const btn = document.getElementById('scrollTop');
    if (btn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });
        
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

function showNotification(message, type, duration) {
    if (!type) type = 'info';
    if (!duration) duration = 3000;
    
    let bgColor = 'bg-primary';
    if (type === 'success') bgColor = 'bg-success';
    if (type === 'error') bgColor = 'bg-danger';
    
    const toastHtml = `
        <div class="toast align-items-center text-white ${bgColor} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(container);
    }
    
    container.insertAdjacentHTML('beforeend', toastHtml);
    const toast = new bootstrap.Toast(container.lastElementChild, { delay: duration });
    toast.show();
}

const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            return null;
        }
    },
    
    remove: function(key) {
        localStorage.removeItem(key);
    }
};

const DateUtils = {
    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    },
    
    getRelativeTime: function(date) {
        const diff = Date.now() - new Date(date);
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor(diff / 60000);
        
        if (days > 0) return days + ' day' + (days > 1 ? 's' : '') + ' ago';
        if (hours > 0) return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
        if (minutes > 0) return minutes + ' minute' + (minutes > 1 ? 's' : '') + ' ago';
        return 'Just now';
    }
};

const NumberUtils = {
    formatNumber: function(num) {
        return num.toLocaleString('en-US');
    }
};

const DataExport = {
    exportToCSV: function(data, filename) {
        if (!data || data.length === 0) {
            alert('No data to export');
            return;
        }
        
        const headers = Object.keys(data[0]);
        const rows = [headers.join(',')];
        
        data.forEach(row => {
            const values = headers.map(h => '"' + (row[h] || '') + '"');
            rows.push(values.join(','));
        });
        
        const csv = rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename + '.csv';
        link.click();
        URL.revokeObjectURL(url);
        
        showNotification('Data exported successfully!', 'success');
    }
};

window.FitTrackApp = FitTrackApp;
window.showNotification = showNotification;
window.Storage = Storage;
window.DateUtils = DateUtils;
window.NumberUtils = NumberUtils;
window.DataExport = DataExport;

console.log('📦 Main.js loaded - No login mode');