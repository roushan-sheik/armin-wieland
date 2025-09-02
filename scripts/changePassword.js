// Elements
const changePasswordForm = document.getElementById('changePasswordForm');
const currentPasswordInput = document.getElementById('currentPassword');
const newPasswordInput = document.getElementById('newPassword');
const confirmPasswordInput = document.getElementById('confirmPassword');
const toggleCurrentPassword = document.getElementById('toggleCurrentPassword');
const toggleNewPassword = document.getElementById('toggleNewPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
const successModal = document.getElementById('successModal');
const goToLoginBtn = document.getElementById('goToLoginBtn');
const passwordMatch = document.getElementById('password-match');
const matchText = document.getElementById('match-text');

// Password requirement elements
const lengthReq = document.getElementById('length-req');
const lowercaseReq = document.getElementById('lowercase-req');
const uppercaseReq = document.getElementById('uppercase-req');
const numberReq = document.getElementById('number-req');
const specialReq = document.getElementById('special-req');

// Validation functions
function validatePasswordRequirements(password) {
    const requirements = {
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    return requirements;
}

function updatePasswordRequirements(password) {
    const requirements = validatePasswordRequirements(password);
    
    // Update length requirement
    if (requirements.length) {
        lengthReq.querySelector('svg').classList.remove('text-gray-400');
        lengthReq.querySelector('svg').classList.add('text-green-500');
    } else {
        lengthReq.querySelector('svg').classList.remove('text-green-500');
        lengthReq.querySelector('svg').classList.add('text-gray-400');
    }
    
    // Update lowercase requirement
    if (requirements.lowercase) {
        lowercaseReq.querySelector('svg').classList.remove('text-gray-400');
        lowercaseReq.querySelector('svg').classList.add('text-green-500');
    } else {
        lowercaseReq.querySelector('svg').classList.remove('text-green-500');
        lowercaseReq.querySelector('svg').classList.add('text-gray-400');
    }
    
    // Update uppercase requirement
    if (requirements.uppercase) {
        uppercaseReq.querySelector('svg').classList.remove('text-gray-400');
        uppercaseReq.querySelector('svg').classList.add('text-green-500');
    } else {
        uppercaseReq.querySelector('svg').classList.remove('text-green-500');
        uppercaseReq.querySelector('svg').classList.add('text-gray-400');
    }
    
    // Update number requirement
    if (requirements.number) {
        numberReq.querySelector('svg').classList.remove('text-gray-400');
        numberReq.querySelector('svg').classList.add('text-green-500');
    } else {
        numberReq.querySelector('svg').classList.remove('text-green-500');
        numberReq.querySelector('svg').classList.add('text-gray-400');
    }
    
    // Update special character requirement
    if (requirements.special) {
        specialReq.querySelector('svg').classList.remove('text-gray-400');
        specialReq.querySelector('svg').classList.add('text-green-500');
    } else {
        specialReq.querySelector('svg').classList.remove('text-green-500');
        specialReq.querySelector('svg').classList.add('text-gray-400');
    }
    
    // Return true if all requirements are met
    return Object.values(requirements).every(req => req);
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

function validateChangePasswordForm() {
    let isValid = true;
    
    // Current password validation
    const currentPassword = currentPasswordInput.value;
    if (!currentPassword) {
        showError('currentPassword', 'Current password is required');
        isValid = false;
    } else {
        hideError('currentPassword');
    }
    
    // New password validation
    const newPassword = newPasswordInput.value;
    if (!newPassword) {
        showError('newPassword', 'New password is required');
        isValid = false;
    } else if (!updatePasswordRequirements(newPassword)) {
        showError('newPassword', 'Password does not meet requirements');
        isValid = false;
    } else {
        hideError('newPassword');
    }
    
    // Confirm password validation
    const confirmPassword = confirmPasswordInput.value;
    if (!confirmPassword) {
        showError('confirmPassword', 'Please confirm your new password');
        isValid = false;
    } else if (newPassword !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
    } else {
        hideError('confirmPassword');
    }
    
    return isValid;
}

// Password visibility toggles
toggleCurrentPassword.addEventListener('click', function() {
    const type = currentPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    currentPasswordInput.setAttribute('type', type);
});

toggleNewPassword.addEventListener('click', function() {
    const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    newPasswordInput.setAttribute('type', type);
});

toggleConfirmPassword.addEventListener('click', function() {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
});

// New password input event listener
newPasswordInput.addEventListener('input', function() {
    updatePasswordRequirements(this.value);
    
    // Check if passwords match when both fields have values
    if (confirmPasswordInput.value) {
        if (this.value === confirmPasswordInput.value) {
            passwordMatch.classList.remove('hidden');
            matchText.querySelector('svg').classList.remove('text-red-500');
            matchText.querySelector('svg').classList.add('text-green-500');
            matchText.classList.remove('text-red-500');
            matchText.classList.add('text-green-500');
            hideError('confirmPassword');
        } else {
            passwordMatch.classList.remove('hidden');
            matchText.querySelector('svg').classList.remove('text-green-500');
            matchText.querySelector('svg').classList.add('text-red-500');
            matchText.classList.remove('text-green-500');
            matchText.classList.add('text-red-500');
        }
    } else {
        passwordMatch.classList.add('hidden');
    }
});

// Confirm password input event listener
confirmPasswordInput.addEventListener('input', function() {
    if (newPasswordInput.value) {
        if (this.value === newPasswordInput.value) {
            passwordMatch.classList.remove('hidden');
            matchText.querySelector('svg').classList.remove('text-red-500');
            matchText.querySelector('svg').classList.add('text-green-500');
            matchText.classList.remove('text-red-500');
            matchText.classList.add('text-green-500');
            hideError('confirmPassword');
        } else {
            passwordMatch.classList.remove('hidden');
            matchText.querySelector('svg').classList.remove('text-green-500');
            matchText.querySelector('svg').classList.add('text-red-500');
            matchText.classList.remove('text-green-500');
            matchText.classList.add('text-red-500');
        }
    } else {
        passwordMatch.classList.add('hidden');
    }
});

// Form submission
changePasswordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateChangePasswordForm()) {
        // Collect form data
        const passwordData = {
            currentPassword: currentPasswordInput.value,
            newPassword: newPasswordInput.value,
            confirmPassword: confirmPasswordInput.value
        };
        
        // Here you would typically send the data to your backend
        console.log('Password change data:', passwordData);
        
        // Show success modal
        successModal.classList.remove('hidden');
    }
});

// Go to login button
goToLoginBtn.addEventListener('click', function() {
    // Redirect to login page
    window.location.href = 'login.html';
});

// Real-time validation
currentPasswordInput.addEventListener('blur', function() {
    if (!this.value) {
        showError('currentPassword', 'Current password is required');
    } else {
        hideError('currentPassword');
    }
});

newPasswordInput.addEventListener('blur', function() {
    if (!this.value) {
        showError('newPassword', 'New password is required');
    } else if (!updatePasswordRequirements(this.value)) {
        showError('newPassword', 'Password does not meet requirements');
    } else {
        hideError('newPassword');
    }
});

confirmPasswordInput.addEventListener('blur', function() {
    if (!this.value) {
        showError('confirmPassword', 'Please confirm your new password');
    } else if (newPasswordInput.value !== this.value) {
        showError('confirmPassword', 'Passwords do not match');
    } else {
        hideError('confirmPassword');
    }
});

