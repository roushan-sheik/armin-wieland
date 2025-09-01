document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const loginErrorModal = document.getElementById('loginErrorModal');
    const closeErrorModal = document.getElementById('closeErrorModal');
    
    // Validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + '-error');
        field.classList.add('input-error');
        error.textContent = message;
        error.classList.remove('hidden');
    }
    
    function hideError(fieldId) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(fieldId + '-error');
        field.classList.remove('input-error');
        error.classList.add('hidden');
    }
    
    function validateLoginForm() {
        let isValid = true;
        
        // Email validation
        const email = emailInput.value.trim();
        if (!email) {
            showError('email', 'Email address is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError('email');
        }
        
        // Password validation
        const password = passwordInput.value;
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else {
            hideError('password');
        }
        
        return isValid;
    }
    
    // Password visibility toggle
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });
    
    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateLoginForm()) {
            // Collect form data
            const loginData = {
                email: emailInput.value.trim(),
                password: passwordInput.value,
                rememberMe: document.getElementById('remember-me').checked
            };
            
            // Here you would typically send the data to your backend for authentication
            console.log('Login data:', loginData);
            
            // For demo purposes, we'll simulate a failed login
            // In a real application, you would handle the response from your API
            loginErrorModal.classList.remove('hidden');
            
            // If login is successful, you would redirect to the dashboard or home page
            // window.location.href = 'dashboard.html';
        }
    });
    
    // Close error modal
    closeErrorModal.addEventListener('click', function() {
        loginErrorModal.classList.add('hidden');
    });
    
    // Real-time validation
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (!email) {
            showError('email', 'Email address is required');
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
        } else {
            hideError('email');
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        if (!this.value) {
            showError('password', 'Password is required');
        } else {
            hideError('password');
        }
    });

    // Change Password button functionality
    const changePassBtn = document.getElementById('changePassRoute');
    
    if (changePassBtn) {
        changePassBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent form submission
            // Redirect to change password page
            window.location.href = 'changePassword.html';
        });
    } else {
        console.error('Button with ID "changePassRoute" not found');
    }
});