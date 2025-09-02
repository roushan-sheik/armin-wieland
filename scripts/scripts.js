document.addEventListener('DOMContentLoaded', function() {
    // All your existing code goes here
    
    let currentStep = 1;
    const totalSteps = 2;
    // Elements
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const submitBtn = document.getElementById('submitBtn');
    const currentStepSpan = document.getElementById('current-step');
    const progressBar = document.getElementById('progress-bar');
    const form = document.getElementById('registrationForm');
    // Password elements
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Update step display
    function updateStepDisplay() {
        currentStepSpan.textContent = currentStep;
        
        // Update progress bar
        const progressPercentage = (currentStep / totalSteps) * 100;
        progressBar.style.width = progressPercentage + '%';
        
        if (currentStep === 1) {
            step1.classList.remove('hidden');
            step2.classList.add('hidden');
            nextBtn.classList.remove('hidden');
            backBtn.classList.add('hidden');
            submitBtn.classList.add('hidden');
        } else {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
            nextBtn.classList.add('hidden');
            backBtn.classList.remove('hidden');
            submitBtn.classList.remove('hidden');
        }
    }
    
    // Validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validateMobile(mobile) {
        const mobileRegex = /^0[0-9]{9}$/;
        return mobileRegex.test(mobile);
    }
    
    function calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        
        return score;
    }
    
    function updatePasswordStrength(password) {
        const strength = calculatePasswordStrength(password);
        const indicators = ['strength-1', 'strength-2', 'strength-3', 'strength-4'];
        
        indicators.forEach((id, index) => {
            const element = document.getElementById(id);
            element.className = 'password-strength-bar flex-1';
            
            if (index < strength) {
                if (strength === 1) element.classList.add('strength-weak');
                else if (strength === 2) element.classList.add('strength-fair');
                else if (strength === 3) element.classList.add('strength-good');
                else if (strength >= 4) element.classList.add('strength-strong');
            } else {
                element.classList.add('strength-gray');
            }
        });
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
    
    function validateStep1() {
        let isValid = true;
        
        // First Name
        const firstName = document.getElementById('firstName').value.trim();
        if (!firstName) {
            showError('firstName', 'First name is required');
            isValid = false;
        } else {
            hideError('firstName');
        }
        // Last Name
        const lastName = document.getElementById('lastName').value.trim();
        if (!lastName) {
            showError('lastName', 'Last name is required');
            isValid = false;
        } else {
            hideError('lastName');
        }
        // Mobile Number
        const mobile = document.getElementById('mobile').value.trim();
        if (!mobile) {
            showError('mobile', 'Mobile number is required');
            isValid = false;
        } else if (!validateMobile(mobile)) {
            showError('mobile', 'Please enter a valid mobile number (08XXXXXXX)');
            isValid = false;
        } else {
            hideError('mobile');
        }
        // Email
        const email = document.getElementById('email').value.trim();
        if (!email) {
            showError('email', 'Email address is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError('email');
        }
        return isValid;
    }
    
    function validateStep2() {
        let isValid = true;
        
        // Physical Address
        const physicalAddress = document.getElementById('physicalAddress').value.trim();
        if (!physicalAddress) {
            showError('physicalAddress', 'Physical address is required');
            isValid = false;
        } else {
            hideError('physicalAddress');
        }
        // Password
        const password = document.getElementById('password').value;
        if (!password) {
            showError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 8) {
            showError('password', 'Password must be at least 8 characters');
            isValid = false;
        } else {
            hideError('password');
        }
        // Confirm Password
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (!confirmPassword) {
            showError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match');
            isValid = false;
        } else {
            hideError('confirmPassword');
        }
        return isValid;
    }
    
    // Event Listeners
    nextBtn.addEventListener('click', function() {
        if (validateStep1()) {
            currentStep = 2;
            updateStepDisplay();
        }
    });
    
    backBtn.addEventListener('click', function() {
        currentStep = 1;
        updateStepDisplay();
    });
    
    // Password strength tracking
    passwordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
        if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
            showError('confirmPassword', 'Passwords do not match');
        } else if (confirmPasswordInput.value && this.value === confirmPasswordInput.value) {
            hideError('confirmPassword');
        }
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        if (passwordInput.value && this.value !== passwordInput.value) {
            showError('confirmPassword', 'Passwords do not match');
        } else if (passwordInput.value && this.value === passwordInput.value) {
            hideError('confirmPassword');
        }
    });
    
    // Password visibility toggles
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (currentStep === 2 && validateStep2()) {
            // Collect all form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                idNumber: document.getElementById('idNumber').value.trim(),
                mobile: document.getElementById('mobile').value.trim(),
                email: document.getElementById('email').value.trim(),
                postalAddress: document.getElementById('postalAddress').value.trim(),
                physicalAddress: document.getElementById('physicalAddress').value.trim(),
                password: document.getElementById('password').value
            };
            
            // Here you would typically send the data to your backend
            console.log('Registration data:', formData);
            
            // Show success modal
            document.getElementById('successModal').classList.remove('hidden');
        }
    });
    
    // Real-time validation for better UX
    document.getElementById('firstName').addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError('firstName', 'First name is required');
        } else {
            hideError('firstName');
        }
    });
    
    document.getElementById('lastName').addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError('lastName', 'Last name is required');
        } else {
            hideError('lastName');
        }
    });
    
    document.getElementById('mobile').addEventListener('blur', function() {
        const mobile = this.value.trim();
        if (!mobile) {
            showError('mobile', 'Mobile number is required');
        } else if (!validateMobile(mobile)) {
            showError('mobile', 'Please enter a valid mobile number (08XXXXXXX)');
        } else {
            hideError('mobile');
        }
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        const email = this.value.trim();
        if (!email) {
            showError('email', 'Email address is required');
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
        } else {
            hideError('email');
        }
    });
    
    document.getElementById('physicalAddress').addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError('physicalAddress', 'Physical address is required');
        } else {
            hideError('physicalAddress');
        }
    });
    
    // Initialize
    updateStepDisplay();
    
    // Already have an account button functionality
    const alreadyHaveAccountBtn = document.getElementById('alreadyHaveAccountBtn');
    
    if (alreadyHaveAccountBtn) {
        alreadyHaveAccountBtn.addEventListener('click', function() {
            // Redirect to login page
            window.location.href = 'pages/login.html';
        });
    } else {
        console.error('Button with ID "alreadyHaveAccountBtn" not found');
    }
});

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (currentStep === 2 && validateStep2()) {
        // Collect all form data
        const formData = {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            idNumber: document.getElementById('idNumber').value.trim(),
            mobile: document.getElementById('mobile').value.trim(),
            email: document.getElementById('email').value.trim(),
            postalAddress: document.getElementById('postalAddress').value.trim(),
            physicalAddress: document.getElementById('physicalAddress').value.trim(),
            password: document.getElementById('password').value
        };
        
        // Here you would typically send the data to your backend
        console.log('Registration data:', formData);
        console.table(formData)
        
        // Show success modal
        document.getElementById('successModal').classList.remove('hidden');
    }
});

// Continue button functionality
document.addEventListener('DOMContentLoaded', function() {
    const continueBtn = document.getElementById('continueBtn');
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            // Redirect to login page
            window.location.href = 'pages/login.html';
        });
    } else {
        console.error('Button with ID "continueBtn" not found');
    }
});