   // Form state management
        let currentStep = 1;
        const totalSteps = 3;
        const formData = {};

        // Password requirements
        const passwordRequirements = {
            length: /.{8,}/,
            uppercase: /[A-Z]/,
            lowercase: /[a-z]/,
            number: /\d/
        };

        // Create floating particles
        function createParticles() {
            for (let i = 0; i < 20; i++) {
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
                }, i * 300);
            }
        }

        // Initialize form
        document.addEventListener('DOMContentLoaded', function() {
            initializeForm();
            createParticles();
            setInterval(createParticles, 6000);
        });

        function initializeForm() {
            // Add event listeners for real-time validation
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => validateField(input));
                input.addEventListener('input', () => {
                    if (input.type === 'password' && input.id === 'password') {
                        checkPasswordStrength(input.value);
                    }
                    if (input.id === 'confirmPassword') {
                        validatePasswordMatch();
                    }
                    clearValidationMessage(input);
                });
            });

            // Mobile number formatting
            document.getElementById('mobile').addEventListener('input', formatMobileNumber);
            
            // National ID formatting
            document.getElementById('nationalId').addEventListener('input', formatNationalId);
        }

        // Step navigation with animations
        function nextStep() {
            if (validateCurrentStep()) {
                saveCurrentStepData();
                if (currentStep < totalSteps) {
                    const currentStepElement = document.getElementById(`step${currentStep}`);
                    currentStepElement.classList.add('sliding-out');
                    
                    setTimeout(() => {
                        currentStepElement.classList.remove('active', 'sliding-out');
                        currentStep++;
                        showStep(currentStep);
                        updateProgressBar();
                        if (currentStep === 3) {
                            populateReview();
                        }
                    }, 300);
                }
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                const currentStepElement = document.getElementById(`step${currentStep}`);
                currentStepElement.classList.add('sliding-out');
                
                setTimeout(() => {
                    currentStepElement.classList.remove('active', 'sliding-out');
                    currentStep--;
                    showStep(currentStep);
                    updateProgressBar();
                }, 300);
            }
        }

        function showStep(step) {
            document.getElementById(`step${step}`).classList.add('active');
        }

        function updateProgressBar() {
            document.querySelectorAll('.progress-step').forEach(step => {
                const stepNumber = parseInt(step.dataset.step);
                if (stepNumber <= currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Update progress bar fill
            const progressFill = document.querySelector('.progress-bar::after') || 
                                document.createElement('style');
            const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
            document.querySelector('.progress-bar').style.setProperty('--progress', percentage + '%');
            
            // Add dynamic progress bar CSS
            if (!document.querySelector('#progress-style')) {
                const style = document.createElement('style');
                style.id = 'progress-style';
                style.textContent = `.progress-bar::after { width: ${percentage}%; }`;
                document.head.appendChild(style);
            } else {
                document.querySelector('#progress-style').textContent = `.progress-bar::after { width: ${percentage}%; }`;
            }
        }

        // Enhanced validation with animations
        function validateCurrentStep() {
            const currentStepElement = document.getElementById(`step${currentStep}`);
            const requiredInputs = currentStepElement.querySelectorAll('[required]');
            let isValid = true;

            requiredInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                    // Add shake animation to invalid fields
                    input.classList.add('invalid');
                    setTimeout(() => input.classList.remove('invalid'), 500);
                }
            });

            return isValid;
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
            else if (fieldName === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    message = 'Please enter a valid email address';
                    isValid = false;
                }
            }
            else if (fieldName === 'mobile' && value) {
                const mobileRegex = /^\+264\s?\d{2}\s?\d{3}\s?\d{4}$/;
                if (!mobileRegex.test(value)) {
                    message = 'Please enter a valid Namibian mobile number';
                    isValid = false;
                }
            }
            else if (fieldName === 'nationalId' && value) {
                if (value.length !== 14 || !/^\d{14}$/.test(value)) {
                    message = 'National ID must be exactly 14 digits';
                    isValid = false;
                }
            }
            else if (fieldName === 'password' && value) {
                if (!isPasswordStrong(value)) {
                    message = 'Password does not meet requirements';
                    isValid = false;
                }
            }
            else if (fieldName === 'confirmPassword' && value) {
                const password = document.getElementById('password').value;
                if (value !== password) {
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

        // Enhanced password strength checker
        function checkPasswordStrength(password) {
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text span');
            const requirements = document.querySelectorAll('.requirement');

            let score = 0;
            let metRequirements = 0;

            Object.keys(passwordRequirements).forEach((req, index) => {
                const requirement = requirements[index];
                const icon = requirement.querySelector('i');
                
                if (passwordRequirements[req].test(password)) {
                    requirement.classList.add('met');
                    icon.className = 'fas fa-check';
                    metRequirements++;
                } else {
                    requirement.classList.remove('met');
                    icon.className = 'fas fa-times';
                }
            });

            score = (metRequirements / Object.keys(passwordRequirements).length) * 100;
            strengthBar.style.width = score + '%';
            
            if (score < 50) {
                strengthBar.className = 'strength-bar weak';
                strengthText.textContent = 'Weak';
            } else if (score < 75) {
                strengthBar.className = 'strength-bar medium';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.className = 'strength-bar strong';
                strengthText.textContent = 'Strong';
            }
        }

        function isPasswordStrong(password) {
            return Object.values(passwordRequirements).every(req => req.test(password));
        }

        function validatePasswordMatch() {
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (confirmPassword && password !== confirmPassword) {
                showValidationMessage(document.getElementById('confirmPassword'), 'Passwords do not match', 'error');
            } else if (confirmPassword && password === confirmPassword) {
                showValidationMessage(document.getElementById('confirmPassword'), '✓ Passwords match', 'success');
            }
        }

        // Password utilities
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

        function generateSecurePassword() {
            const chars = {
                lowercase: 'abcdefghijklmnopqrstuvwxyz',
                uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                numbers: '0123456789',
                symbols: '!@#$%^&*'
            };
            
            let password = '';
            
            // Ensure at least one character from each category
            password += getRandomChar(chars.lowercase);
            password += getRandomChar(chars.uppercase);
            password += getRandomChar(chars.numbers);
            password += getRandomChar(chars.symbols);
            
            // Fill remaining length
            const allChars = chars.lowercase + chars.uppercase + chars.numbers + chars.symbols;
            for (let i = 4; i < 12; i++) {
                password += getRandomChar(allChars);
            }
            
            // Shuffle the password
            password = password.split('').sort(() => 0.5 - Math.random()).join('');
            
            document.getElementById('password').value = password;
            checkPasswordStrength(password);
            
            // Show password temporarily with animation
            const passwordField = document.getElementById('password');
            const toggle = passwordField.parentElement.querySelector('.password-toggle i');
            
            passwordField.type = 'text';
            toggle.className = 'fas fa-eye-slash';
            passwordField.style.background = 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.2))';
            
            setTimeout(() => {
                passwordField.type = 'password';
                toggle.className = 'fas fa-eye';
                passwordField.style.background = '';
            }, 3000);
        }

        function getRandomChar(str) {
            return str.charAt(Math.floor(Math.random() * str.length));
        }

        // Input formatting
        function formatMobileNumber(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('264')) {
                value = '+264 ' + value.substring(3);
            } else if (value.startsWith('0')) {
                value = '+264 ' + value.substring(1);
            } else if (!value.startsWith('+264')) {
                value = '+264 ' + value;
            }
            
            // Format: +264 XX XXX XXXX
            value = value.replace(/(\+264)\s?(\d{2})(\d{3})(\d{4})/, '$1 $2 $3 $4');
            
            e.target.value = value;
        }

        function formatNationalId(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 14) {
                value = value.substring(0, 14);
            }
            e.target.value = value;
        }

        // Data management
        function saveCurrentStepData() {
            const currentStepElement = document.getElementById(`step${currentStep}`);
            const inputs = currentStepElement.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (input.type !== 'password') {
                    formData[input.name] = input.value;
                }
            });
        }

        function populateReview() {
            document.getElementById('reviewName').textContent = `${formData.firstName} ${formData.lastName}`;
            document.getElementById('reviewMobile').textContent = formData.mobile;
            document.getElementById('reviewEmail').textContent = formData.email;
            document.getElementById('reviewNationalId').textContent = formData.nationalId;
            
            const physicalAddress = `${formData.street}, ${formData.town}, ${formData.region}`;
            document.getElementById('reviewPhysicalAddress').textContent = physicalAddress;
            
            const postalAddress = formData.postalAddress || 'Same as physical address';
            document.getElementById('reviewPostalAddress').textContent = postalAddress;
        }

        // Form submission
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!document.getElementById('terms').checked) {
                showValidationMessage(document.getElementById('terms'), 'You must agree to the terms and conditions', 'error');
                return;
            }
            
            submitForm();
        });

        function submitForm() {
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnSpinner = submitBtn.querySelector('.btn-spinner');
            
            // Show loading state
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-flex';
            submitBtn.disabled = true;
            
            // Collect all form data
            saveCurrentStepData();
            formData.password = document.getElementById('password').value;
            formData.confirmPassword = document.getElementById('confirmPassword').value;
            formData.terms = document.getElementById('terms').checked;
            
            // Log form data to console
            console.log('Registration Form Data:', {
                ...formData,
                password: '[PROTECTED]', // Don't log actual password
                confirmPassword: '[PROTECTED]',
                timestamp: new Date().toISOString()
            });
            
            // Simulate API call
            setTimeout(() => {
                const isSuccess = Math.random() > 0.1; // 90% success rate
                
                btnText.style.display = 'inline-block';
                btnSpinner.style.display = 'none';
                submitBtn.disabled = false;
                
                if (isSuccess) {
                    showSuccess();
                } else {
                    showError('This email address is already registered. Please use a different email or log in to your existing account.');
                }
            }, 2000);
        }

        function showSuccess() {
            document.querySelector('.form-container').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Also show modal
            setTimeout(() => {
                document.getElementById('successModal').classList.add('show');
            }, 500);
        }

        function showError(message) {
            document.getElementById('errorText').textContent = message;
            document.querySelector('.form-container').style.display = 'none';
            document.getElementById('errorMessage').style.display = 'block';
        }

        function hideError() {
            document.getElementById('errorMessage').style.display = 'none';
            document.querySelector('.form-container').style.display = 'block';
        }

        function closeModal() {
            document.getElementById('successModal').classList.remove('show');
        }

        function goToLogin() {
            window.location.href = 'pages/login.html';
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (currentStep < totalSteps) {
                    nextStep();
                } else {
                    document.getElementById('registrationForm').dispatchEvent(new Event('submit'));
                }
            }
            
            if (e.key === 'Escape') {
                closeModal();
            }
        });