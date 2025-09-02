document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const setPasswordForm = document.getElementById('setPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const toggleNewPassword = document.getElementById('toggleNewPassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const setPasswordBtn = document.getElementById('setPasswordBtn');
    const newPasswordError = document.getElementById('newPassword-error');
    const confirmPasswordError = document.getElementById('confirmPassword-error');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const successModal = document.getElementById('successModal');
    const loginBtn = document.getElementById('loginBtn');
    
    // Password strength checker
    function checkPasswordStrength(password) {
        let strength = 0;
        
        // Length check
        if (password.length >= 8) {
            strength += 1;
        }
        
        // Contains numbers
        if (/\d/.test(password)) {
            strength += 1;
        }
        
        // Contains special characters
        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            strength += 1;
        }
        
        // Contains uppercase letters
        if (/[A-Z]/.test(password)) {
            strength += 1;
        }
        
        // Contains lowercase letters
        if (/[a-z]/.test(password)) {
            strength += 1;
        }
        
        return strength;
    }
    
    // Update password strength UI
    function updatePasswordStrength(password) {
        const strength = checkPasswordStrength(password);
        
        // Remove all strength classes
        strengthBar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
        
        if (password.length === 0) {
            strengthBar.style.width = '0';
            strengthText.textContent = '-';
            strengthText.className = 'text-xs font-medium text-gray-600';
            return;
        }
        
        if (strength <= 2) {
            strengthBar.classList.add('strength-weak');
            strengthText.textContent = 'Weak';
            strengthText.className = 'text-xs font-medium text-red-500';
        } else if (strength <= 3) {
            strengthBar.classList.add('strength-medium');
            strengthText.textContent = 'Medium';
            strengthText.className = 'text-xs font-medium text-yellow-500';
        } else {
            strengthBar.classList.add('strength-strong');
            strengthText.textContent = 'Strong';
            strengthText.className = 'text-xs font-medium text-green-500';
        }
    }
    
    // Toggle password visibility
    function togglePasswordVisibility(input, toggleButton) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Change icon based on the password visibility state
        if (type === 'password') {
            // Show eye icon (password is hidden)
            toggleButton.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>';
        } else {
            // Show eye-slash icon (password is visible)
            toggleButton.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>';
        }
    }
    
    // Validate form
    function validateForm() {
        let isValid = true;
        
        // Validate new password
        const newPassword = newPasswordInput.value;
        if (!newPassword) {
            newPasswordError.textContent = 'Password is required';
            newPasswordError.classList.remove('hidden');
            isValid = false;
        } else if (newPassword.length < 8) {
            newPasswordError.textContent = 'Password must be at least 8 characters';
            newPasswordError.classList.remove('hidden');
            isValid = false;
        } else {
            newPasswordError.classList.add('hidden');
        }
        
        // Validate confirm password
        const confirmPassword = confirmPasswordInput.value;
        if (!confirmPassword) {
            confirmPasswordError.textContent = 'Please confirm your password';
            confirmPasswordError.classList.remove('hidden');
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            confirmPasswordError.textContent = 'Passwords do not match';
            confirmPasswordError.classList.remove('hidden');
            isValid = false;
        } else {
            confirmPasswordError.classList.add('hidden');
        }
        
        return isValid;
    }
    
    // Show success modal
    function showSuccessModal() {
        successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Hide success modal
    function hideSuccessModal() {
        successModal.classList.add('hidden');
        document.body.style.overflow = ''; // Re-enable scrolling
    }
    
    // Event Listeners
    toggleNewPassword.addEventListener('click', function() {
        togglePasswordVisibility(newPasswordInput, toggleNewPassword);
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, toggleConfirmPassword);
    });
    
    newPasswordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
        
        // Hide error when user starts typing
        if (newPasswordError.classList.contains('hidden') === false) {
            newPasswordError.classList.add('hidden');
        }
    });
    
    confirmPasswordInput.addEventListener('input', function() {
        // Hide error when user starts typing
        if (confirmPasswordError.classList.contains('hidden') === false) {
            confirmPasswordError.classList.add('hidden');
        }
    });
    
    // Form submission
    setPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = {
                newPassword: newPasswordInput.value,
                confirmPassword: confirmPasswordInput.value
            };
            // Console log the form data
            console.log("Set Password Form Data:", formData);
            // Disable button to prevent multiple submissions
            setPasswordBtn.disabled = true;
            setPasswordBtn.textContent = 'Updating...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success modal
                showSuccessModal();
                
                // Reset button
                setPasswordBtn.disabled = false;
                setPasswordBtn.textContent = 'Set Password';
            }, 1500);
        }
    });
    
    // Login button in modal
    loginBtn.addEventListener('click', function() {
        hideSuccessModal();
        window.location.href = 'login.html';
    });
    
    // Initialize
    updatePasswordStrength('');
});