/**
 * AUTH.JS - Centralized Authentication Module
 * Handles all authentication logic for the application
 * 
 * ENHANCED VERSION with smart error detection for seamless new user flow
 */

// Import configuration
// Assumes config.js is loaded before this script

const Auth = (function() {
    'use strict';

    // ============================================================
    // CONSTANTS
    // ============================================================
    const TOKEN_KEY = 'cc_token';  // Changed to match legacy pages
    const EXPIRES_KEY = 'cc_expires_at';  // Changed to match legacy pages
    const USER_KEY = 'nf_user_data';
    const ADMIN_KEY = 'nf_admin_auth';
    const ADMIN_EMAIL_KEY = 'nf_admin_email';
    
    const TOKEN_EXPIRY_HOURS = 12;
    const MIN_PASSWORD_LENGTH = 6; // TODO: Increase to 12+ for production

    // ============================================================
    // COOKIE HELPERS
    // ============================================================
    
    /**
     * Set a cookie with expiration
     * @param {string} name - Cookie name
     * @param {string} value - Cookie value
     * @param {number} hours - Hours until expiration
     */
    function setCookie(name, value, hours) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (hours * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }

    /**
     * Get a cookie value
     * @param {string} name - Cookie name
     * @returns {string|null} Cookie value or null
     */
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    }

    /**
     * Delete a cookie
     * @param {string} name - Cookie name
     */
    function deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    // ============================================================
    // STORAGE HELPERS (Cookie + localStorage fallback)
    // ============================================================
    
    /**
     * Set value in both cookie and localStorage
     * @param {string} key - Storage key
     * @param {string} value - Storage value
     * @param {number} hours - Hours until expiration (for cookie)
     */
    function setStorage(key, value, hours = TOKEN_EXPIRY_HOURS) {
        setCookie(key, value, hours);
        try {
            localStorage.setItem(key, value);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
    }

    /**
     * Get value from cookie (preferred) or localStorage (fallback)
     * @param {string} key - Storage key
     * @returns {string|null} Stored value or null
     */
    function getStorage(key) {
        const cookieValue = getCookie(key);
        if (cookieValue) return cookieValue;
        
        try {
            const localValue = localStorage.getItem(key);
            if (localValue) {
                // Sync to cookie if found in localStorage
                setCookie(key, localValue, TOKEN_EXPIRY_HOURS);
                return localValue;
            }
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        return null;
    }

    /**
     * Remove value from both cookie and localStorage
     * @param {string} key - Storage key
     */
    function removeStorage(key) {
        deleteCookie(key);
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
    }

    /**
     * Clear all auth-related storage
     */
    function clearAllStorage() {
        removeStorage(TOKEN_KEY);
        removeStorage(EXPIRES_KEY);
        removeStorage(USER_KEY);
        removeStorage(ADMIN_KEY);
        removeStorage(ADMIN_EMAIL_KEY);
    }

    // ============================================================
    // UTILITY FUNCTIONS
    // ============================================================

    /**
     * Normalize a name (trim and collapse whitespace)
     * @param {string} name - Raw name input
     * @returns {string} Normalized name
     */
    function normalizeName(name) {
        return String(name || "").trim().replace(/\s+/g, " ");
    }

    /**
     * Generate derived email from name
     * @param {string} name - Full name
     * @returns {string} Derived email address
     */
    function derivedEmailFromName(name) {
        const clean = normalizeName(name)
            .toLowerCase()
            .replace(/[^a-z\s]/g, "")
            .replace(/\s+/g, "");
        return clean ? `${clean}.ail@gmail.com` : "";
    }

    /**
     * Validate password strength
     * @param {string} password - Password to validate
     * @returns {object} {valid: boolean, message: string}
     */
    function validatePassword(password) {
        if (!password) {
            return { valid: false, message: 'Password is required' };
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            return { valid: false, message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` };
        }
        // TODO: Add complexity requirements for production
        // - At least one uppercase letter
        // - At least one lowercase letter
        // - At least one number
        // - At least one special character
        return { valid: true, message: 'Password is valid' };
    }

    // ============================================================
    // API COMMUNICATION
    // ============================================================

    /**
     * Make an authenticated API call
     * @param {string} action - API action/endpoint
     * @param {object} payload - Request payload
     * @returns {Promise<object>} API response data
     */
    async function apiCall(action, payload = {}) {
        const url = typeof CFWORKER !== 'undefined' ? CFWORKER : (typeof AUTH !== 'undefined' ? AUTH : '');
        
        if (!url) {
            throw new Error('API URL not configured. Make sure config.js is loaded.');
        }

        const endpoint = `${url}/${action}`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const text = await response.text();
            let data;
            
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                throw new Error(text || 'Invalid server response');
            }

            if (!data || data.ok !== true) {
                const errorMsg = (data && (data.error || data.detail)) 
                    ? (data.error + (data.detail ? ` — ${data.detail}` : "")) 
                    : "Request failed";
                throw new Error(errorMsg);
            }

            return data;
        } catch (error) {
            console.error(`API Error (${action}):`, error);
            throw error;
        }
    }

    // ============================================================
    // SESSION MANAGEMENT
    // ============================================================

    /**
     * Set user session
     * @param {string} token - Auth token
     * @param {string} expiresAt - Expiration timestamp
     * @param {object} userData - Optional user data to store
     */
    function setSession(token, expiresAt, userData = null) {
        if (!token) {
            clearAllStorage();
            return;
        }

        setStorage(TOKEN_KEY, token);
        if (expiresAt) {
            setStorage(EXPIRES_KEY, expiresAt);
        }
        if (userData) {
            setStorage(USER_KEY, JSON.stringify(userData));
        }
    }

    /**
     * Get current auth token
     * @returns {string|null} Auth token or null
     */
    function getToken() {
        return getStorage(TOKEN_KEY);
    }

    /**
     * Get session expiration
     * @returns {string|null} Expiration timestamp or null
     */
    function getExpiration() {
        return getStorage(EXPIRES_KEY);
    }

    /**
     * Get stored user data
     * @returns {object|null} User data or null
     */
    function getUserData() {
        const data = getStorage(USER_KEY);
        if (!data) return null;
        
        try {
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
    }

    /**
     * Check if session is still valid (client-side check only)
     * @returns {boolean} True if session exists and hasn't expired
     */
    function isSessionValid() {
        const token = getToken();
        const expiresAt = getExpiration();

        // If no token, definitely invalid
        if (!token) {
            console.log('isSessionValid: No token found');
            return false;
        }

        // If we have a token but no expiration, assume valid (let server validate)
        if (!expiresAt) {
            console.log('isSessionValid: Token exists but no expiration, assuming valid');
            return true;
        }

        const now = Date.now();
        const expiry = parseInt(expiresAt, 10);
        
        const isValid = now < expiry;
        console.log('isSessionValid:', {
            hasToken: !!token,
            now: new Date(now).toLocaleString(),
            expiry: new Date(expiry).toLocaleString(),
            isValid: isValid
        });

        return isValid;
    }

    /**
     * Clear current session
     */
    function clearSession() {
        clearAllStorage();
    }

    // ============================================================
    // AUTHENTICATION METHODS
    // ============================================================

    /**
     * Login user
     * @param {string} username - User's full name
     * @param {string} password - User's password
     * @returns {Promise<object>} {success: boolean, token: string, userData: object}
     * @throws {Error} Special error codes: 'USER_NOT_FOUND', 'USER_NOT_VERIFIED', or specific error message
     */
    async function login(username, password) {
        const normalizedName = normalizeName(username);
        const email = derivedEmailFromName(username);

        if (!normalizedName) {
            throw new Error('Please enter your full name');
        }
        if (!password) {
            throw new Error('Please enter your password');
        }

        try {
            const response = await apiCall('login', {
                username: normalizedName,
                password: password,
                email: email
            });

            if (response.token) {
                // Handle both expires_at and expiresAt (backend inconsistency)
                const expiresAt = response.expires_at || response.expiresAt;
                
                setSession(response.token, expiresAt, {
                    username: normalizedName,
                    email: email
                });
                
                console.log('Session saved:', {
                    token: response.token.substring(0, 20) + '...',
                    expiresAt: expiresAt,
                    expiresDate: expiresAt ? new Date(parseInt(expiresAt)).toLocaleString() : 'N/A'
                });
            }

            return {
                success: true,
                token: response.token,
                userData: { username: normalizedName, email: email }
            };
            
        } catch (error) {
            // Enhanced error detection for better UX routing
            const errorMsg = error.message.toLowerCase();
            
            // Check for "user not found" variations
            if (errorMsg.includes('user not found') || 
                errorMsg.includes('does not exist') ||
                errorMsg.includes('user does not exist') ||
                errorMsg.includes('no user found') ||
                errorMsg.includes('invalid username') ||
                errorMsg.includes('invalid login')) {
                throw new Error('USER_NOT_FOUND'); // Special error code for routing to registration
            }
            
            // Check for "not verified" variations
            if (errorMsg.includes('not verified') || 
                errorMsg.includes('unverified') ||
                errorMsg.includes('verify your account') ||
                errorMsg.includes('email verification required') ||
                errorMsg.includes('please verify')) {
                throw new Error('USER_NOT_VERIFIED'); // Special error code for routing to verification
            }
            
            // Check for wrong password
            if (errorMsg.includes('invalid password') ||
                errorMsg.includes('incorrect password') ||
                errorMsg.includes('wrong password')) {
                throw new Error('Invalid password. Please try again.');
            }
            
            // Re-throw original error for all other cases
            throw error;
        }
    }

    /**
     * Signup new user
     * @param {string} username - User's full name
     * @param {string} password - User's password
     * @returns {Promise<object>} {success: boolean, message: string}
     */
    async function signup(username, password) {
        const normalizedName = normalizeName(username);
        const email = derivedEmailFromName(username);

        if (!normalizedName) {
            throw new Error('Please enter your full name');
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            throw new Error(passwordValidation.message);
        }

        const response = await apiCall('signup', {
            username: normalizedName,
            password: password,
            email: email
        });

        return {
            success: true,
            message: 'Verification code sent to your email',
            email: email,
            username: normalizedName
        };
    }

    /**
     * Verify user account with code
     * @param {string} username - User's full name
     * @param {string} code - 6-digit verification code
     * @returns {Promise<object>} {success: boolean, message: string}
     */
    async function verify(username, code) {
        const normalizedName = normalizeName(username);
        const email = derivedEmailFromName(username);

        if (!normalizedName) {
            throw new Error('Session expired. Please start over.');
        }
        if (!/^\d{6}$/.test(code)) {
            throw new Error('Please enter a valid 6-digit code');
        }

        const response = await apiCall('verify', {
            username: normalizedName,
            code: code,
            email: email
        });

        return {
            success: true,
            message: 'Account verified successfully'
        };
    }

    /**
     * Validate current session with server
     * @returns {Promise<boolean>} True if session is valid on server
     */
    async function validateSession() {
        const token = getToken();
        if (!token) return false;

        try {
            await apiCall('me', { token });
            return true;
        } catch (error) {
            clearSession();
            return false;
        }
    }

    /**
     * Logout user
     */
    function logout() {
        clearSession();
    }

    /**
     * Require authentication - redirect to login if not authenticated
     * @param {string} loginPage - URL of login page (default: 'login.html')
     * @returns {Promise<boolean>} True if authenticated
     */
    async function requireAuth(loginPage = 'login.html') {
        if (!isSessionValid()) {
            window.location.href = loginPage;
            return false;
        }

        // Validate with server
        const isValid = await validateSession();
        if (!isValid) {
            window.location.href = loginPage;
            return false;
        }

        return true;
    }

    // ============================================================
    // ADMIN AUTHENTICATION
    // ============================================================

    /**
     * Set admin session
     * @param {string} email - Admin email
     */
    function setAdminSession(email) {
        setStorage(ADMIN_KEY, 'true');
        setStorage(ADMIN_EMAIL_KEY, email);
    }

    /**
     * Check if user has admin privileges
     * @returns {boolean} True if user is admin
     */
    function isAdmin() {
        const isAdminAuth = getStorage(ADMIN_KEY) === 'true';
        const adminEmail = getStorage(ADMIN_EMAIL_KEY);
        
        // TODO: Replace with server-side validation
        // This is still vulnerable to client-side manipulation
        // Need to validate admin status on EVERY API call
        return isAdminAuth && adminEmail;
    }

    /**
     * Get admin email
     * @returns {string|null} Admin email or null
     */
    function getAdminEmail() {
        return getStorage(ADMIN_EMAIL_KEY);
    }

    /**
     * Clear admin session
     */
    function clearAdminSession() {
        removeStorage(ADMIN_KEY);
        removeStorage(ADMIN_EMAIL_KEY);
    }

    /**
     * Send admin verification code
     * @param {string} email - Admin email
     * @returns {Promise<object>} {success: boolean, message: string}
     */
    async function sendAdminVerification(email) {
        const response = await apiCall('sendVerification', { email });
        return {
            success: true,
            message: 'Verification code sent to your email'
        };
    }

    /**
     * Verify admin code and login
     * @param {string} email - Admin email
     * @param {string} code - Verification code
     * @returns {Promise<object>} {success: boolean, message: string}
     */
    async function verifyAdminCode(email, code) {
        const response = await apiCall('verifyCode', { email, code });
        
        if (response.success) {
            setAdminSession(email);
        }
        
        return {
            success: true,
            message: 'Admin login successful'
        };
    }

    /**
     * Logout admin
     */
    function logoutAdmin() {
        clearAdminSession();
    }

    // ============================================================
    // PUBLIC API
    // ============================================================
    return {
        // User Authentication
        login,
        signup,
        verify,
        logout,
        requireAuth,
        validateSession,
        
        // Session Management
        setSession,
        getToken,
        getExpiration,
        getUserData,
        isSessionValid,
        clearSession,
        
        // Admin Authentication
        isAdmin,
        getAdminEmail,
        setAdminSession,
        clearAdminSession,
        sendAdminVerification,
        verifyAdminCode,
        logoutAdmin,
        
        // Utilities
        normalizeName,
        derivedEmailFromName,
        validatePassword,
        
        // Direct API access (if needed)
        apiCall
    };
})();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
