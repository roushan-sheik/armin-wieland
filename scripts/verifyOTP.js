  document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const otpForm = document.getElementById('otpForm');
            const otpInputs = document.querySelectorAll('.otp-input');
            const verifyBtn = document.getElementById('verifyBtn');
            const resendBtn = document.getElementById('resendBtn');
            const timerElement = document.getElementById('timer');
            const otpError = document.getElementById('otp-error');
            const successModal = document.getElementById('successModal');
            const proceedBtn = document.getElementById('proceedBtn');
            const resendSuccessModal = document.getElementById('resendSuccessModal');
            const closeResendModal = document.getElementById('closeResendModal');
            
            let countdown = 60;
            let timerInterval;
            
            // Initialize OTP inputs
            function initializeOtpInputs() {
                otpInputs.forEach((input, index) => {
                    // Handle input event - only allow single digit
                    input.addEventListener('input', function(e) {
                        const value = e.target.value;
                        
                        // Only allow numbers
                        if (!/^\d$/.test(value)) {
                            e.target.value = '';
                            return;
                        }
                        
                        // Move to next input if current is filled
                        if (value && index < otpInputs.length - 1) {
                            otpInputs[index + 1].focus();
                        }
                        
                        // Hide error when user starts typing
                        if (otpError.classList.contains('hidden') === false) {
                            otpError.classList.add('hidden');
                        }
                    });
                    
                    // Handle keydown events for special keys
                    input.addEventListener('keydown', function(e) {
                        // Move to previous input on backspace if current is empty
                        if (e.key === 'Backspace' && !e.target.value && index > 0) {
                            otpInputs[index - 1].focus();
                        }
                        
                        // Prevent non-numeric keys (except backspace, tab, arrow keys)
                        if (!/^\d$/.test(e.key) && 
                            !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) {
                            e.preventDefault();
                        }
                    });
                    
                    // Handle paste event
                    input.addEventListener('paste', function(e) {
                        e.preventDefault();
                        const pastedData = e.clipboardData.getData('text');
                        const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');
                        
                        // Clear all inputs first
                        otpInputs.forEach(inp => inp.value = '');
                        
                        // Fill the inputs with pasted digits
                        digits.forEach((digit, i) => {
                            if (i < otpInputs.length) {
                                otpInputs[i].value = digit;
                            }
                        });
                        
                        // Focus the next empty input or the last filled one
                        const nextIndex = Math.min(digits.length, otpInputs.length - 1);
                        otpInputs[nextIndex].focus();
                    });
                });
            }
            
            // Start countdown timer
            function startTimer() {
                resendBtn.disabled = true;
                countdown = 60;
                updateTimerDisplay();
                
                timerInterval = setInterval(() => {
                    countdown--;
                    updateTimerDisplay();
                    
                    if (countdown <= 0) {
                        clearInterval(timerInterval);
                        resendBtn.disabled = false;
                        timerElement.textContent = '0';
                    }
                }, 1000);
            }
            
            function updateTimerDisplay() {
                timerElement.textContent = countdown;
            }
            
            // Get OTP value
            function getOtpValue() {
                return Array.from(otpInputs).map(input => input.value).join('');
            }
            
            // Validate OTP
            function validateOtp() {
                const otp = getOtpValue();
                
                if (otp.length !== 6) {
                    otpError.textContent = 'Please enter the complete 6-digit code';
                    otpError.classList.remove('hidden');
                    return false;
                }
                
                otpError.classList.add('hidden');
                return true;
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
            
            // Show resend success modal
            function showResendSuccessModal() {
                resendSuccessModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
            
            // Hide resend success modal
            function hideResendSuccessModal() {
                resendSuccessModal.classList.add('hidden');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
            
            // Form submission
            otpForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                if (validateOtp()) {
                    const otp = getOtpValue();
                    console.log({otp});
                    
                    
                    // Disable button to prevent multiple submissions
                    verifyBtn.disabled = true;
                    verifyBtn.textContent = 'Verifying...';
                    
                    // Simulate API call
                    setTimeout(() => {
                        // For demo purposes, we'll accept any 6-digit code
                        // In a real application, you would verify the OTP with your backend
                        
                        // Show success modal
                        showSuccessModal();
                        
                        // Reset button
                        verifyBtn.disabled = false;
                        verifyBtn.textContent = 'Verify OTP';
                    }, 1500);
                }
            });
            
            // Resend OTP
            resendBtn.addEventListener('click', function() {
                // Disable button temporarily
                resendBtn.disabled = true;
                resendBtn.textContent = 'Sending...';
                
                // Simulate API call
                setTimeout(() => {
                    // Show resend success modal
                    showResendSuccessModal();
                    
                    startTimer();
                    resendBtn.textContent = 'Resend OTP';
                    
                    // Clear existing OTP inputs
                    otpInputs.forEach(input => input.value = '');
                    otpInputs[0].focus();
                }, 1500);
            });
            
            // Proceed button in success modal
            proceedBtn.addEventListener('click', function() {
                hideSuccessModal();
                window.location.href = 'setPasswordPage.html';
            });
            
            // Close button in resend modal
            closeResendModal.addEventListener('click', function() {
                hideResendSuccessModal();
            });
            
            // Initialize
            initializeOtpInputs();
            startTimer();
            
            // Focus first input
            otpInputs[0].focus();
        });