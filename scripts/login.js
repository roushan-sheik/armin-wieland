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
                input.addEventListener('input', () => clearValidationMessage(input));
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
            else if (fieldName === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    message = 'Please enter a valid email address';
                    isValid = false;
                }
            }
            else if (fieldName === 'password' && value) {
                if (value.length < 6) {
                    message = 'Password must be at least 6 characters';
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
            return label ? label.textContent : field.name;
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

        // Form submission
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            
            if (!validateField(email) || !validateField(password)) {
                return;
            }
            
            submitLogin();
        });

        function submitLogin() {
            const loginBtn = document.getElementById('loginBtn');
            const btnText = loginBtn.querySelector('.btn-text');
            const btnSpinner = loginBtn.querySelector('.btn-spinner');
            
            // Show loading state
            btnText.style.display = 'none';
            btnSpinner.style.display = 'inline-flex';
            loginBtn.disabled = true;
            
            // Collect form data
            const loginData = {
                email: document.getElementById('email').value,
                password: '[PROTECTED]', // Don't log actual password
                rememberMe: document.getElementById('rememberMe').checked,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                loginAttempt: true
            };
            
            // Log login data to console
            console.log('Login Form Data:', loginData);
            
            // Simulate API call
            setTimeout(() => {
                const isSuccess = Math.random() > 0.2; // 80% success rate
                
                btnText.style.display = 'inline-flex';
                btnSpinner.style.display = 'none';
                loginBtn.disabled = false;
                
                if (isSuccess) {
                    showLoginSuccess();
                } else {
                    showValidationMessage(document.getElementById('password'), 'Invalid email or password', 'error');
                    document.getElementById('password').classList.add('invalid');
                }
            }, 1500);
        }

        function showLoginSuccess() {
            document.getElementById('successModal').classList.add('show');
            
            // Auto redirect after 3 seconds
            setTimeout(() => {
                goToDashboard();
            }, 3000);
        }

        function goToDashboard() {
            // In a real app, this would redirect to the dashboard
            alert('Redirecting to dashboard...');
            window.location.href = '../index.html';
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