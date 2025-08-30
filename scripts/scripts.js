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

        // Initialize form
        document.addEventListener('DOMContentLoaded', function() {
            initializeForm();
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

        // Step navigation
        function nextStep() {
            if (validateCurrentStep()) {
                saveCurrentStepData();
                if (currentStep < totalSteps) {
                    currentStep++;
                    showStep(currentStep);
                    updateProgressBar();
                    if (currentStep === 3) {
                        populateReview();
                    }
                }
            }
        }

        function prevStep() {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
                updateProgressBar();
            }
        }

        function showStep(step) {
            document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
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
        }

        // Validation functions
        function validateCurrentStep() {
            const currentStepElement = document.getElementById(`step${currentStep}`);
            const requiredInputs = currentStepElement.querySelectorAll('[required]');
            let isValid = true;

            requiredInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            return isValid;
        }

        function validateField(field) {
            const value = field.value.trim();
            const fieldName = field.name;
            let isValid = true;
            let message = '';

            // Clear previous validation state
            clearValidationMessage(field);

            // Required field validation
            if (field.hasAttribute('required') && !value) {
                message = `${getFieldLabel(field)} is required`;
                isValid = false;
            }
            // Email validation
            else if (fieldName === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    message = 'Please enter a valid email address';
                    isValid = false;
                }
            }
            // Mobile number validation
            else if (fieldName === 'mobile' && value) {
                const mobileRegex = /.+/;

                if (!mobileRegex.test(value)) {
                    message = 'Please enter a valid Namibian mobile number';
                    isValid = false;
                }
            }
            // National ID validation
            else if (fieldName === 'nationalId' && value) {
                if (value.length !== 14 || !/^\d{14}$/.test(value)) {
                    message = 'National ID must be exactly 14 digits';
                    isValid = false;
                }
            }
            // Password validation
            else if (fieldName === 'password' && value) {
                if (!isPasswordStrong(value)) {
                    message = 'Password does not meet requirements';
                    isValid = false;
                }
            }
            // Confirm password validation
            else if (fieldName === 'confirmPassword' && value) {
                const password = document.getElementById('password').value;
                if (value !== password) {
                    message = 'Passwords do not match';
                    isValid = false;
                }
            }

            if (!isValid) {
                showValidationMessage(field, message, 'error');
            } else if (value) {
                showValidationMessage(field, '✓', 'success');
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
        }

        function getFieldLabel(field) {
            const label = field.parentElement.querySelector('label');
            return label ? label.textContent.replace(' *', '') : field.name;
        }

        // Password strength checker
        function checkPasswordStrength(password) {
            const strengthBar = document.querySelector('.strength-bar');
            const strengthText = document.querySelector('.strength-text span');
            const requirements = document.querySelectorAll('.requirement');

            let score = 0;
            let metRequirements = 0;

            // Check each requirement
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

            // Calculate strength
            score = (metRequirements / Object.keys(passwordRequirements).length) * 100;

            // Update strength meter
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
                showValidationMessage(document.getElementById('confirmPassword'), '✓', 'success');
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
            
            // Show password temporarily
            document.getElementById('password').type = 'text';
            document.querySelector('#password').parentElement.querySelector('.password-toggle i').className = 'fas fa-eye-slash';
            
            setTimeout(() => {
                document.getElementById('password').type = 'password';
                document.querySelector('#password').parentElement.querySelector('.password-toggle i').className = 'fas fa-eye';
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
            btnSpinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Simulate random success/failure for demo
                const isSuccess = Math.random() > 0.2; // 80% success rate
                
                if (isSuccess) {
                    showSuccess();
                } else {
                    showError('This email address is already registered. Please use a different email or log in to your existing account.');
                }
                
                // Reset button state
                btnText.style.display = 'inline-block';
                btnSpinner.style.display = 'none';
                submitBtn.disabled = false;
            }, 2000);
        }

        function showSuccess() {
            document.querySelector('.form-container').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
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

        // Utility functions
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function validateMobile(mobile) {
            const re = /^\+264\s?\d{2}\s?\d{3}\s?\d{4}$/;
            return re.test(mobile);
        }

        function validateNationalId(id) {
            return /^\d{14}$/.test(id);
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
        });