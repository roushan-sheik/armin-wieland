  // Create floating particles
        function createParticles() {
            for (let i = 0; i < 15; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particle.style.left = Math.random() * 100 + '%';
                    particle.style.animationDelay = Math.random() * 6 + 's';
                    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                    document.body.appendChild(particle);
                    
                    setTimeout(() => {
                        particle.remove();
                    }, 6000);
                }, i * 200);
            }
        }
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            initializeForm();
            createParticles();
            setInterval(createParticles, 8000);
        });
        
        function initializeForm() {
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    clearValidationMessage(input);
                    if (input.id === 'newPassword') {
                        checkPasswordStrength(input.value);
                        updatePasswordRequirements(input.value);
                    }
                    if (input.id === 'confirmNewPassword') {
                        validatePasswordMatch();
                    }
                });
            });
        }
        
        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            let isValid = true;
            let message = '';
            
            clearValidationMessage(field);
            
            if (field.hasAttribute('required') && !value) {
                message = `${getFieldLabel(field)} is required`;
                isValid = false;
            }
            else if (fieldName === 'currentPassword' && value) {
                if (value.length < 6) {
                    message = 'Current password must be at least 6 characters';
                    isValid = false;
                }
            }
            else if (fieldName === 'newPassword' && value) {
                if (value.length < 8) {
                    message = 'New password must be at least 8 characters';
                    isValid = false;
                } else if (!isPasswordStrong(value)) {
                    message = 'Password does not meet requirements';
                    isValid = false;
                }
            }
            else if (fieldName === 'confirmNewPassword' && value) {
                const newPassword = document.getElementById('newPassword').value;
                if (value !== newPassword) {
                    message = 'Passwords do not match';
                    isValid = false;
                }
            }
            
            if (!isValid) {
                showValidationMessage(field, message, 'error');
                field.classList.add('invalid');
                field.classList.remove('valid');
            } else if (value) {
                showValidationMessage(field, '✓ Valid', 'success');
                field.classList.add('valid');
                field.classList.remove('invalid');
            }
            
            return isValid;
        }
        
        function showValidationMessage(field, message, type) {
            const validationElement = field.parentElement.querySelector('.validation-message');
            if (validationElement) {
                validationElement.textContent = message;
                validationElement.className = `validation-message ${type}`;
            }
        }
        
        function clearValidationMessage(field) {
            const validationElement = field.parentElement.querySelector('.validation-message');
            if (validationElement) {
                validationElement.textContent = '';
                validationElement.className = 'validation-message';
            }
            field.classList.remove('valid', 'invalid');
        }
        
        function getFieldLabel(field) {
            const label = field.parentElement.querySelector('label');
            return label ? label.textContent.replace(' *', '') : field.name;
        }
        
        function togglePassword(fieldId) {
            const field = document.getElementById(fieldId);
            const toggle = field.parentElement.querySelector('.password-toggle i');
            
            if (field.type === 'password') {
                field.type = 'text';
                toggle.className = 'fas fa-eye-slash';
            } else {
                field.type = 'password';
                toggle.className = 'fas fa-eye';
            }
        }
        
        function checkPasswordStrength(password) {
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text span');
            
            if (!password) {
                strengthBar.className = 'strength-bar';
                strengthBar.style.width = '0';
                strengthText.textContent = 'Weak';
                return;
            }
            
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 25;
            
            // Uppercase check
            if (/[A-Z]/.test(password)) strength += 25;
            
            // Lowercase check
            if (/[a-z]/.test(password)) strength += 25;
            
            // Number check
            if (/[0-9]/.test(password)) strength += 25;
            
            // Update strength bar
            strengthBar.style.width = strength + '%';
            
            if (strength <= 25) {
                strengthBar.className = 'strength-bar weak';
                strengthText.textContent = 'Weak';
            } else if (strength <= 50) {
                strengthBar.className = 'strength-bar medium';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.className = 'strength-bar strong';
                strengthText.textContent = 'Strong';
            }
        }
        
        function updatePasswordRequirements(password) {
            const requirements = {
                length: password.length >= 8,
                uppercase: /[A-Z]/.test(password),
                lowercase: /[a-z]/.test(password),
                number: /[0-9]/.test(password)
            };
            
            Object.keys(requirements).forEach(req => {
                const element = document.querySelector(`[data-requirement="${req}"]`);
                const icon = element.querySelector('i');
                
                if (requirements[req]) {
                    element.classList.add('met');
                    icon.className = 'fas fa-check';
                } else {
                    element.classList.remove('met');
                    icon.className = 'fas fa-times';
                }
            });
        }
        
        function isPasswordStrong(password) {
            return password.length >= 8 && 
                   /[A-Z]/.test(password) && 
                   /[a-z]/.test(password) && 
                   /[0-9]/.test(password);
        }
        
        function validatePasswordMatch() {
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmNewPassword').value;
            const confirmField = document.getElementById('confirmNewPassword');
            
            if (confirmPassword && newPassword !== confirmPassword) {
                showValidationMessage(confirmField, 'Passwords do not match', 'error');
                confirmField.classList.add('invalid');
                confirmField.classList.remove('valid');
                return false;
            } else if (confirmPassword && newPassword === confirmPassword) {
                showValidationMessage(confirmField, '✓ Passwords match', 'success');
                confirmField.classList.add('valid');
                confirmField.classList.remove('invalid');
                return true;
            }
            
            return false;
        }
        
        // Form submission
        document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword');
            const newPassword = document.getElementById('newPassword');
            const confirmPassword = document.getElementById('confirmNewPassword');
            
            if (!validateField(currentPassword) || 
                !validateField(newPassword) || 
                !validateField(confirmPassword)) {
                return;
            }
            
            submitPasswordChange();
        });
        
        function submitPasswordChange() {
            const changePasswordBtn = document.getElementById('changePasswordBtn');
            const btnText = changePasswordBtn.querySelector('.btn-text');
            const btnSpinner = changePasswordBtn.querySelector('.btn-spinner');
            
            // Show loading state
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-flex';
            changePasswordBtn.disabled = true;
            
            // Collect form data (without logging actual passwords)
            const passwordChangeData = {
                currentPassword: '[PROTECTED]',
                newPassword: '[PROTECTED]',
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                passwordChangeAttempt: true
            };
            
            // Log password change data to console
            console.log('Password Change Form Data:', passwordChangeData);
            
            // Simulate API call
            setTimeout(() => {
                const isSuccess = Math.random() > 0.2; // 80% success rate
                
                btnText.style.display = 'inline-flex';
                btnSpinner.style.display = 'none';
                changePasswordBtn.disabled = false;
                
                if (isSuccess) {
                    showPasswordChangeSuccess();
                } else {
                    showValidationMessage(currentPassword, 'Current password is incorrect', 'error');
                    currentPassword.classList.add('invalid');
                }
            }, 1500);
        }
        
        function showPasswordChangeSuccess() {
            document.getElementById('successModal').classList.add('show');
        }
        
        function goToLogin() {
            window.location.href = 'login.html';
        }
        
        function closeModal() {
            document.getElementById('successModal').classList.remove('show');
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });