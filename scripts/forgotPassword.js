     document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const forgotPasswordForm = document.getElementById('forgotPasswordForm');
            const emailInput = document.getElementById('email');
            const resetBtn = document.getElementById('resetBtn');
            
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
            
            function validateForm() {
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
                
                return isValid;
            }
            
            // Form submission
            forgotPasswordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateForm()) {
                    // Collect form data
                    const email = emailInput.value.trim();
                    
                    // Disable button to prevent multiple submissions
                    resetBtn.disabled = true;
                    resetBtn.textContent = 'Sending...';
                    
                    // Here you would typically send the data to your backend for password reset
                    console.log('Password reset request for:', email);
                    
                    // Simulate API call
                    setTimeout(() => {
                        // Show success message
                        const successMessage = document.createElement('div');
                        successMessage.className = 'mt-4 p-3 bg-green-100 text-green-700 rounded-md text-sm';
                        successMessage.textContent = 'If your email exists in our system, you will receive a password reset link shortly.';
                        forgotPasswordForm.appendChild(successMessage);
                        
                        // Reset button
                        resetBtn.disabled = false;
                        resetBtn.textContent = 'Reset Password';
                        
                        // Optionally redirect to login page after delay
                        setTimeout(() => {
                            window.location.href = 'verifyOTP.html';
                        }, 1000);
                    }, 3000);
                }
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
        });
    