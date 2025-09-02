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
    
    // Change the icon based on the password visibility state
    if (type === 'password') {
        // Show eye icon (password is hidden)
        this.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>';
    } else {
        // Show eye-slash icon (password is visible)
        this.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>';
    }
});
    
    // Form submission
   loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    if (validateLoginForm()) {
        // Dynamically collect form data
        const loginData = {};
        new FormData(loginForm).forEach((value, key) => {
            loginData[key] = value.trim ? value.trim() : value;
        });

        // Add checkbox manually (FormData ignores unchecked)
        loginData.rememberMe = document.getElementById('remember-me').checked;

        // Console log full data
        console.log('Login data:', loginData);
        console.table(loginData); // nicer table format in dev console

        // Demo: simulate failed login
        loginErrorModal.classList.remove('hidden');
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

 
});