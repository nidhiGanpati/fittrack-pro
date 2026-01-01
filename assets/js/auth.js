/* ============================================
   FitTrack Pro - Authentication System
   Pure logic, no assumptions
   ============================================ */

// User Authentication Class
class UserAuth {
    constructor() {
        this.users = this.loadUsersFromStorage();
        this.currentUser = this.loadCurrentUserFromStorage();
        this.initializeDemoAccount();
    }
    
    // Load users from localStorage
    loadUsersFromStorage() {
        try {
            const usersJson = localStorage.getItem('fittrack_users');
            if (usersJson) {
                return JSON.parse(usersJson);
            }
            return [];
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }
    
    // Save users to localStorage
    saveUsersToStorage() {
        try {
            localStorage.setItem('fittrack_users', JSON.stringify(this.users));
            return true;
        } catch (error) {
            console.error('Error saving users:', error);
            return false;
        }
    }
    
    // Load current logged-in user
    loadCurrentUserFromStorage() {
        try {
            const userJson = localStorage.getItem('fittrack_current_user');
            if (userJson) {
                return JSON.parse(userJson);
            }
            return null;
        } catch (error) {
            console.error('Error loading current user:', error);
            return null;
        }
    }
    
    // Save current user to localStorage
    saveCurrentUserToStorage(user) {
        try {
            localStorage.setItem('fittrack_current_user', JSON.stringify(user));
            this.currentUser = user;
            return true;
        } catch (error) {
            console.error('Error saving current user:', error);
            return false;
        }
    }
    
    // Clear current user
    clearCurrentUser() {
        localStorage.removeItem('fittrack_current_user');
        this.currentUser = null;
    }
    
    // Initialize demo account ONLY if no users exist
    initializeDemoAccount() {
        if (this.users.length === 0) {
            try {
                this.register('Pro Athlete', 'athlete@fittrack.com', 'FitPro2024');
                console.log('✅ Demo account created: athlete@fittrack.com / FitPro2024');
            } catch (error) {
                console.log('Demo account creation failed:', error.message);
            }
        }
    }
    
    // Register new user - EXPLICIT VALIDATION
    register(name, email, password) {
        // Validate inputs
        if (!name || name.trim() === '') {
            throw new Error('Name is required');
        }
        
        if (!email || email.trim() === '') {
            throw new Error('Email is required');
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            throw new Error('Invalid email format');
        }
        
        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        
        // Check if email already exists
        const existingUser = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            throw new Error('This email is already registered. Please login instead.');
        }
        
        // Create new user object
        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: btoa(password), // Simple encoding (NOT secure for production)
            createdAt: new Date().toISOString(),
            loginCount: 0,
            lastLogin: null
        };
        
        // Add user to array
        this.users.push(newUser);
        
        // Save to storage
        this.saveUsersToStorage();
        
        return newUser;
    }
    
    // Login user - EXPLICIT VALIDATION
    login(email, password) {
        // Validate inputs
        if (!email || email.trim() === '') {
            throw new Error('Email is required');
        }
        
        if (!password || password.trim() === '') {
            throw new Error('Password is required');
        }
        
        // Find user by email
        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
        
        if (!user) {
            throw new Error('No account found with this email. Please sign up first.');
        }
        
        // Verify password
        const storedPassword = atob(user.password);
        if (storedPassword !== password) {
            throw new Error('Incorrect password. Please try again.');
        }
        
        // Update login count and last login
        user.loginCount = (user.loginCount || 0) + 1;
        user.lastLogin = new Date().toISOString();
        
        // Save updated user data
        this.saveUsersToStorage();
        
        // Save as current user
        this.saveCurrentUserToStorage(user);
        
        return user;
    }
    
    // Logout user
    logout() {
        this.clearCurrentUser();
        return true;
    }
    
    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }
    
    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize authentication system
const auth = new UserAuth();

// Export to window
window.auth = auth;

console.log('🔐 Authentication System Loaded');
console.log('👥 Total users:', auth.users.length);
console.log('🔑 Demo: athlete@fittrack.com / FitPro2024');