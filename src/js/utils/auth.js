// ============================================
// AUTHENTICATION UTILITIES
// ============================================

const Auth = {
    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem('user') !== null;
    },
    
    // Get current user
    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    // Login user
    login(email, password) {
        // In real app, this would be an API call
        const user = {
            email: email,
            fullName: email.split('@')[0],
            role: 'user',
            avatar: null
        };
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    },
    
    // Logout user
    logout() {
        localStorage.removeItem('user');
        window.location.href = '../../index.html';
    },
    
    // Protect route - redirect if not logged in
    protectRoute(redirectPath = '../../pages/auth/login.html') {
        if (!this.isLoggedIn()) {
            window.location.href = redirectPath;
            return false;
        }
        return true;
    },
    
    // Check user role
    hasRole(requiredRole) {
        const user = this.getCurrentUser();
        if (!user) return false;
        return user.role === requiredRole || user.role === 'admin';
    },
    
    // Check if admin
    isAdmin() {
        return this.hasRole('admin');
    }
};

// Export for use in other modules
window.Auth = Auth;
